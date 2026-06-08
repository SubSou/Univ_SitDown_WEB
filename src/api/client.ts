const BASE_URL = "http://sitdown.bond/api";

type ApiErrorBody = {
  code?: string;
  message?: string;
  timestamp?: string;
  traceId?: string;
  path?: string;
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  const text = await response.text();

  if (!response.ok) {
    let errorMessage = `API 요청 실패 (${response.status})`;

    if (text) {
      try {
        const errorBody = JSON.parse(text) as ApiErrorBody;

        if (errorBody.message) {
          errorMessage = errorBody.message;
        }
      } catch {
        // JSON 파싱 실패 무시
      }
    }

    throw new Error(errorMessage);
  }

  // No Content
  if (response.status === 204) {
    return null as T;
  }

  // 응답 body가 비어있는 경우
  if (!text.trim()) {
    return null as T;
  }

  return JSON.parse(text) as T;
}
