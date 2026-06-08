export type LoginUser = {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN" | string;
};

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function getLoginUser(): LoginUser | null {
  const userText = localStorage.getItem("loginUser");

  if (!userText) return null;

  try {
    return JSON.parse(userText) as LoginUser;
  } catch {
    return null;
  }
}

export function isLogin() {
  return Boolean(getAccessToken());
}

export function saveAuth(data: {
  accessToken: string;
  refreshToken: string;
  user: LoginUser;
}) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("loginUser", JSON.stringify(data.user));
}

export function clearAuth() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("loginUser");
  localStorage.removeItem("isLogin");
}
