import type {
  LoginUserInput,
  RegisterUserInput,
  Role,
  UserDTO,
} from '@alongside/shared';
import type { AuthRepository, UserRecord } from './auth.repository.js';
import { hashPassword, verifyPassword } from './auth.security.js';

class AuthError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

class EmailAlreadyExistsError extends AuthError {
  constructor(message = 'An account with this email address already exists.') {
    super(message, 409, 'EMAIL_ALREADY_EXISTS');
  }
}

class InvalidCredentialsError extends AuthError {
  constructor(message = 'Invalid email or password.') {
    super(message, 401, 'INVALID_CREDENTIALS');
  }
}

class UnauthorizedError extends AuthError {
  constructor(message = 'Authentication required to access this resource.') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export interface AuthTokenPayload {
  id: string;
  userId: string;
  email: string;
  role: Role;
}

export interface JwtSigner {
  sign(payload: AuthTokenPayload): Promise<string> | string;
}

export interface AuthResult {
  user: UserDTO;
  tokenPayload: AuthTokenPayload;
  token?: string;
}

function toUserDTO(user: UserRecord): UserDTO {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    subscription: user.subscription
      ? {
          tier: user.subscription.tier,
          isActive: user.subscription.isActive,
          trialEndsAt: user.subscription.trialEndsAt
            ? user.subscription.trialEndsAt.toISOString()
            : null,
          currentPeriodEnd: user.subscription.currentPeriodEnd
            ? user.subscription.currentPeriodEnd.toISOString()
            : null,
        }
      : null,
    childrenCount: user.childrenCount,
  };
}

export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtSigner?: JwtSigner
  ) {}

  async register(input: RegisterUserInput): Promise<AuthResult> {
    const normalizedEmail = input.email.toLowerCase().trim();

    const existing = await this.repository.findByEmail(normalizedEmail);
    if (existing) {
      throw new EmailAlreadyExistsError();
    }

    const passwordHash = await hashPassword(input.password);
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const user = await this.repository.create({
      email: normalizedEmail,
      passwordHash,
      fullName: input.fullName.trim(),
      trialEndsAt,
    });

    const tokenPayload: AuthTokenPayload = {
      id: user.id,
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtSigner ? await this.jwtSigner.sign(tokenPayload) : undefined;

    return {
      user: toUserDTO(user),
      tokenPayload,
      token,
    };
  }

  async login(input: LoginUserInput): Promise<AuthResult> {
    const normalizedEmail = input.email.toLowerCase().trim();

    const user = await this.repository.findByEmail(normalizedEmail);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValid = await verifyPassword(user.passwordHash, input.password);
    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const tokenPayload: AuthTokenPayload = {
      id: user.id,
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtSigner ? await this.jwtSigner.sign(tokenPayload) : undefined;

    return {
      user: toUserDTO(user),
      tokenPayload,
      token,
    };
  }

  async getProfile(userId: string): Promise<UserDTO> {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('Parent account not found.');
    }

    return toUserDTO(user);
  }
}
