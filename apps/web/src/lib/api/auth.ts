import type {
  AuthProvidersDTO,
  LoginUserInput,
  RegisterUserInput,
  UserDTO,
} from "@alongside/shared";
import { apiClient, ApiClientError } from "./client";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getAuthProviders(): Promise<AuthProvidersDTO> {
  return apiClient<AuthProvidersDTO>("/api/v1/auth/providers", {
    method: "GET",
  });
}

export async function enterDemoSession(): Promise<UserDTO> {
  const res = await apiClient<{ user: UserDTO }>("/api/v1/auth/demo", {
    method: "POST",
  });
  return res.user;
}

export function getGoogleAuthUrl(): string {
  return `${API_BASE_URL.replace(/\/$/, "")}/api/v1/auth/google`;
}

export async function registerParent(data: RegisterUserInput): Promise<UserDTO> {
  const res = await apiClient<{ user: UserDTO }>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.user;
}

export async function loginParent(data: LoginUserInput): Promise<UserDTO> {
  const res = await apiClient<{ user: UserDTO }>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.user;
}

export async function logoutParent(): Promise<void> {
  await apiClient<{ message: string }>("/api/v1/auth/logout", {
    method: "POST",
  });
}

export async function getCurrentParent(): Promise<UserDTO | null> {
  try {
    const res = await apiClient<{ user: UserDTO }>("/api/v1/auth/me", {
      method: "GET",
    });
    return res.user;
  } catch (error) {
    if (
      error instanceof ApiClientError &&
      (error.status === 401 || error.statusCode === 401 || error.code === "UNAUTHORIZED")
    ) {
      return null;
    }
    throw error;
  }
}

export const authApi = {
  getProviders: getAuthProviders,
  enterDemo: enterDemoSession,
  getGoogleAuthUrl,
  register: async (input: RegisterUserInput) => {
    const user = await registerParent(input);
    return { user };
  },
  login: async (input: LoginUserInput) => {
    const user = await loginParent(input);
    return { user };
  },
  logout: async () => {
    await logoutParent();
    return { message: "Logged out successfully" };
  },
  getMe: async () => {
    const user = await getCurrentParent();
    if (!user) {
      throw new ApiClientError("Unauthorized", 401, "UNAUTHORIZED");
    }
    return { user };
  },
};
