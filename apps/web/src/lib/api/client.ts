export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly statusCode: number;
  readonly code: string;
  readonly details: ApiErrorDetail[];

  constructor(
    message: string,
    status = 500,
    code = "UNKNOWN_ERROR",
    details: ApiErrorDetail[] = []
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.statusCode = status;
    this.code = code;
    this.details = details;
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers, ...customConfig } = options;

  let url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL.replace(/\/$/, "")}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const defaultHeaders: Record<string, string> = {
    Accept: "application/json",
  };

  if (customConfig.body !== undefined) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const config: RequestInit = {
    method: options.method || "GET",
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    credentials: "include", // Required for HttpOnly session cookie persistence
    ...customConfig,
  };

  let response: Response;
  try {
    response = await fetch(url, config);
  } catch (error) {
    throw new ApiClientError(
      error instanceof Error ? error.message : "Network error occurred",
      0,
      "NETWORK_ERROR"
    );
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  let data: any;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    // Handle Alongside Standard Error Envelope:
    // { success: false, error: { code, message, details } }
    if (data && typeof data === "object" && data.error) {
      const code = data.error.code || "REQUEST_FAILED";
      const message = data.error.message || "An unexpected error occurred.";
      const details = Array.isArray(data.error.details) ? data.error.details : [];
      throw new ApiClientError(message, response.status, code, details);
    }

    // Handle RFC 7807 Error Envelope:
    // { type, title, status, detail, errors }
    if (data && typeof data === "object" && (data.title || data.detail)) {
      const message = data.detail || data.title || "An error occurred";
      const code = data.type || "RFC7807_ERROR";
      const details = Array.isArray(data.errors)
        ? data.errors.map((err: any) => ({
            field: err.field || err.path,
            message: err.message || String(err),
          }))
        : [];
      throw new ApiClientError(message, response.status, code, details);
    }

    const message =
      typeof data === "string" && data.length > 0
        ? data
        : `Request failed with status ${response.status}`;
    throw new ApiClientError(message, response.status, "HTTP_ERROR");
  }

  // Unpack standard Alongside envelope { success: true, data: T }
  if (data && typeof data === "object" && data.success === true && "data" in data) {
    return data.data as T;
  }

  return data as T;
}
