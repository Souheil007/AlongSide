import {
  calculateLifespanTier,
  DevelopmentalTier,
  Gender,
  RoadType,
  type AuthProvidersDTO,
  type LoginUserInput,
  type RegisterUserInput,
  type Role,
  type UserDTO,
} from '@alongside/shared';
import type { ChildrenRepository } from '../children/children.repository.js';
import type { AuthRepository, UserRecord } from './auth.repository.js';
import {
  createPasswordlessPlaceholderHash,
  hashPassword,
  verifyPassword,
} from './auth.security.js';
import type { GoogleUserProfile } from './google.oauth.js';

const DEMO_PARENT_EMAIL = 'demo@alongside.app';
const DEMO_PARENT_NAME = 'Alex Rivera';

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

class GoogleEmailUnverifiedError extends AuthError {
  constructor(message = 'Your Google account email must be verified to continue.') {
    super(message, 401, 'GOOGLE_EMAIL_UNVERIFIED');
  }
}

export interface AuthTokenPayload {
  id: string;
  userId: string;
  email: string;
  role: Role;
  isDemo?: boolean;
}

export interface JwtSigner {
  sign(payload: AuthTokenPayload, options?: { expiresIn?: string }): Promise<string> | string;
}

export interface AuthResult {
  user: UserDTO;
  tokenPayload: AuthTokenPayload;
  token?: string;
  isNewUser?: boolean;
}

export interface AuthServiceDeps {
  childrenRepository?: ChildrenRepository;
}

function toUserDTO(user: UserRecord, options?: { isDemo?: boolean; childrenCount?: number }): UserDTO {
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
    childrenCount: options?.childrenCount ?? user.childrenCount,
    ...(options?.isDemo !== undefined ? { isDemo: options.isDemo } : {}),
  };
}

function deriveNameFromEmail(email: string): string {
  const prefix = email.split('@')[0] || 'Parent';
  const cleaned = prefix.replace(/[._-]+/g, ' ').trim();
  if (!cleaned) return 'Parent';
  return cleaned
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
    .slice(0, 80);
}

export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtSigner?: JwtSigner,
    private readonly deps: AuthServiceDeps = {}
  ) {}

  getProviders(googleConfigured: boolean): AuthProvidersDTO {
    return {
      google: googleConfigured,
      demo: true,
      emailPassword: true,
    };
  }

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
      isDemo: false,
    };

    const token = this.jwtSigner ? await this.jwtSigner.sign(tokenPayload) : undefined;

    return {
      user: toUserDTO(user, { isDemo: false }),
      tokenPayload,
      token,
      isNewUser: true,
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
      isDemo: false,
    };

    const token = this.jwtSigner ? await this.jwtSigner.sign(tokenPayload) : undefined;

    return {
      user: toUserDTO(user, { isDemo: false }),
      tokenPayload,
      token,
    };
  }

  async authenticateWithGoogleProfile(profile: GoogleUserProfile): Promise<AuthResult> {
    if (!profile.emailVerified) {
      throw new GoogleEmailUnverifiedError();
    }

    const normalizedEmail = profile.email.toLowerCase().trim();
    let user = await this.repository.findByEmail(normalizedEmail);
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = await this.repository.create({
        email: normalizedEmail,
        passwordHash: createPasswordlessPlaceholderHash(),
        fullName: profile.fullName?.trim() || deriveNameFromEmail(normalizedEmail),
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }

    const tokenPayload: AuthTokenPayload = {
      id: user.id,
      userId: user.id,
      email: user.email,
      role: user.role,
      isDemo: false,
    };

    const token = this.jwtSigner ? await this.jwtSigner.sign(tokenPayload) : undefined;

    return {
      user: toUserDTO(user, { isDemo: false }),
      tokenPayload,
      token,
      isNewUser,
    };
  }

  async enterDemoSession(): Promise<AuthResult> {
    let user = await this.repository.findByEmail(DEMO_PARENT_EMAIL);

    if (!user) {
      try {
        user = await this.repository.create({
          email: DEMO_PARENT_EMAIL,
          passwordHash: createPasswordlessPlaceholderHash(),
          fullName: DEMO_PARENT_NAME,
          trialEndsAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
      } catch (err) {
        const retry = await this.repository.findByEmail(DEMO_PARENT_EMAIL);
        if (!retry) {
          throw err;
        }
        user = retry;
      }
    }

    let childrenCount = user.childrenCount;
    const childrenRepo = this.deps.childrenRepository;
    if (childrenRepo) {
      let existingChildren = await childrenRepo.findByUserId(user.id);
      if (existingChildren.length === 0) {
        const now = new Date();
        const birthMonth = now.getMonth() + 1;
        const mayaBirthYear = now.getFullYear() - 11;
        const leoBirthYear = now.getFullYear() - 3;

        await childrenRepo.create(user.id, {
          name: 'Maya',
          gender: Gender.FEMALE,
          birthYear: mayaBirthYear,
          birthMonth,
          roadType: RoadType.ACTIVE_DEVICE,
          developmentalTier: DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
          schoolGrade: '6th Grade',
        });

        await childrenRepo.create(user.id, {
          name: 'Leo',
          gender: Gender.MALE,
          birthYear: leoBirthYear,
          birthMonth,
          roadType: RoadType.PRE_DEVICE,
          developmentalTier: calculateLifespanTier(leoBirthYear, birthMonth, now),
          schoolGrade: 'Preschool',
        });

        existingChildren = await childrenRepo.findByUserId(user.id);
      }
      childrenCount = existingChildren.length;
    }

    const tokenPayload: AuthTokenPayload = {
      id: user.id,
      userId: user.id,
      email: user.email,
      role: user.role,
      isDemo: true,
    };

    const token = this.jwtSigner
      ? await this.jwtSigner.sign(tokenPayload, { expiresIn: '24h' })
      : undefined;

    return {
      user: toUserDTO(user, { isDemo: true, childrenCount }),
      tokenPayload,
      token,
    };
  }

  async getProfile(userId: string, isDemo = false): Promise<UserDTO> {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('Parent account not found.');
    }

    return toUserDTO(user, { isDemo });
  }
}
