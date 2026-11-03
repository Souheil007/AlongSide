import { randomUUID } from 'node:crypto';
import { prisma as defaultPrisma, type PrismaClient } from '@alongside/database';
import type { Role, SubscriptionTier } from '@alongside/shared';

export interface UserSubscriptionRecord {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  isActive: boolean;
  trialEndsAt: Date | null;
  currentPeriodEnd: Date | null;
}

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  subscription: UserSubscriptionRecord | null;
  childrenCount: number;
}

export interface CreateUserData {
  email: string;
  passwordHash: string;
  fullName: string;
  trialEndsAt?: Date;
  role?: Role;
}

export type CreateUserInput = CreateUserData;

export interface AuthRepository {
  findByEmail(email: string): Promise<UserRecord | null>;
  findById(id: string): Promise<UserRecord | null>;
  create(data: CreateUserData): Promise<UserRecord>;
  createUserWithTrial(data: CreateUserData): Promise<UserRecord>;
  countChildren(userId: string): Promise<number>;
}

export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findByEmail(email: string): Promise<UserRecord | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        subscription: true,
        _count: {
          select: { children: true },
        },
      },
    });

    if (!user) {
      return null;
    }

    return this.mapUser(user);
  }

  async findById(id: string): Promise<UserRecord | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        subscription: true,
        _count: {
          select: { children: true },
        },
      },
    });

    if (!user) {
      return null;
    }

    return this.mapUser(user);
  }

  async create(data: CreateUserData): Promise<UserRecord> {
    const trialEndsAt = data.trialEndsAt ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const user = await this.prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        passwordHash: data.passwordHash,
        fullName: data.fullName.trim(),
        role: data.role ?? 'PARENT',
        subscription: {
          create: {
            tier: 'TRIAL',
            isActive: true,
            trialEndsAt,
          },
        },
      },
      include: {
        subscription: true,
        _count: {
          select: { children: true },
        },
      },
    });

    return this.mapUser(user);
  }

  async createUserWithTrial(data: CreateUserData): Promise<UserRecord> {
    return this.create(data);
  }

  async countChildren(userId: string): Promise<number> {
    return this.prisma.child.count({
      where: { userId },
    });
  }

  private mapUser(user: {
    id: string;
    email: string;
    passwordHash: string;
    fullName: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    subscription: {
      id: string;
      userId: string;
      tier: string;
      isActive: boolean;
      trialEndsAt: Date | null;
      currentPeriodEnd: Date | null;
    } | null;
    _count?: { children: number };
  }): UserRecord {
    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      fullName: user.fullName,
      role: user.role as Role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      subscription: user.subscription
        ? {
            id: user.subscription.id,
            userId: user.subscription.userId,
            tier: user.subscription.tier as SubscriptionTier,
            isActive: user.subscription.isActive,
            trialEndsAt: user.subscription.trialEndsAt,
            currentPeriodEnd: user.subscription.currentPeriodEnd,
          }
        : null,
      childrenCount: user._count?.children ?? 0,
    };
  }
}

export class InMemoryAuthRepository implements AuthRepository {
  private users: Map<string, UserRecord> = new Map();
  private childrenCountMap: Map<string, number> = new Map();

  async findByEmail(email: string): Promise<UserRecord | null> {
    const normalized = email.toLowerCase().trim();
    for (const user of this.users.values()) {
      if (user.email.toLowerCase().trim() === normalized) {
        return {
          ...user,
          childrenCount: this.childrenCountMap.get(user.id) ?? user.childrenCount,
        };
      }
    }
    return null;
  }

  async findById(id: string): Promise<UserRecord | null> {
    const user = this.users.get(id);
    if (!user) {
      return null;
    }
    return {
      ...user,
      childrenCount: this.childrenCountMap.get(user.id) ?? user.childrenCount,
    };
  }

  async create(data: CreateUserData): Promise<UserRecord> {
    const id = randomUUID();
    const now = new Date();
    const trialEndsAt = data.trialEndsAt ?? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const record: UserRecord = {
      id,
      email: data.email.toLowerCase().trim(),
      passwordHash: data.passwordHash,
      fullName: data.fullName.trim(),
      role: data.role ?? 'PARENT',
      createdAt: now,
      updatedAt: now,
      subscription: {
        id: randomUUID(),
        userId: id,
        tier: 'TRIAL',
        isActive: true,
        trialEndsAt,
        currentPeriodEnd: null,
      },
      childrenCount: this.childrenCountMap.get(id) ?? 0,
    };

    this.users.set(id, record);
    return record;
  }

  async createUserWithTrial(data: CreateUserData): Promise<UserRecord> {
    return this.create(data);
  }

  async countChildren(userId: string): Promise<number> {
    return this.childrenCountMap.get(userId) ?? 0;
  }

  setChildrenCount(userId: string, count: number): void {
    this.childrenCountMap.set(userId, count);
    const user = this.users.get(userId);
    if (user) {
      user.childrenCount = count;
    }
  }

  clear(): void {
    this.users.clear();
    this.childrenCountMap.clear();
  }
}
