import { apiClient } from "./client";

export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

export type SpaceCategory =
  | "READING_ROOM"
  | "STUDY_ROOM"
  | "PC_ROOM"
  | "LECTURE_ROOM";

export type NoticeCategory = "INFO" | "MAINTENANCE" | "EVENT";

export type AdminDashboardResponse = {
  spaceCount: number;
  activeReservationCount: number;
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  affiliation: string;
  profileImageUrl: string | null;
  role: string;
  createdAt: string;
};

export type CreateSpaceRequest = {
  name: string;
  floor: number;
  category: SpaceCategory;
  openTime: string;
  closeTime: string;
  maxReservationHours: number;
  features?: string[];
  thumbnailUrl?: string;
};

export type AdminSpace = {
  id: string;
  name: string;
  floor: number;
  category: SpaceCategory;
  totalSeats: number;
  availableSeats: number;
  rows: number;
  columns: number;
  congestion: string;
  openTime: string;
  closeTime: string;
  maxReservationHours: number;
  features: string[];
  images: string[];
  isFavorite: boolean;
};

export type CreateSeatGridRequest = {
  rows: number;
  columns: number;
  labelPrefix?: string;
  overwrite?: boolean;
};

export type CreateSeatGridResponse = {
  spaceId: string;
  createdCount: number;
  rows: number;
  columns: number;
};

export type UpdateSeatStatusRequest = {
  isEnabled: boolean;
};

export type CreateNoticeRequest = {
  title: string;
  content: string;
  category: NoticeCategory;
  publishedAt?: string;
  expiresAt?: string;
};

export type UpdateNoticeRequest = Partial<CreateNoticeRequest>;

export type AdminNotice = {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  publishedAt: string;
};

export type UpdateUserRequest = {
  name?: string;
  phone?: string;
  affiliation?: string;
};

// ADMIN-01 공간 생성
export function createAdminSpace(data: CreateSpaceRequest) {
  return apiClient<AdminSpace>("/admin/spaces", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ADMIN-02 좌석 행/열 일괄 생성
export function createAdminSeatGrid(
  spaceId: string,
  data: CreateSeatGridRequest,
) {
  return apiClient<CreateSeatGridResponse>(
    `/admin/spaces/${spaceId}/seats/grid`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

// ADMIN-03 좌석 상태 변경
export function updateAdminSeatStatus(
  seatId: string,
  data: UpdateSeatStatusRequest,
) {
  return apiClient<null>(`/admin/seats/${seatId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// ADMIN-04 회원 목록 조회
export function getAdminUsers(page = 0, size = 20) {
  return apiClient<PageResponse<AdminUser>>(
    `/admin/users?page=${page}&size=${size}`,
  );
}

// ADMIN-05 회원 상세 조회
export function getAdminUserDetail(userId: string) {
  return apiClient<AdminUser>(`/admin/users/${userId}`);
}

// ADMIN-06 회원 정보 수정
export function updateAdminUser(userId: string, data: UpdateUserRequest) {
  return apiClient<AdminUser>(`/admin/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// ADMIN-07 회원 삭제
export function deleteAdminUser(userId: string) {
  return apiClient<void>(`/admin/users/${userId}`, {
    method: "DELETE",
  });
}

// ADMIN-08 관리자 대시보드 지표 조회
export function getAdminDashboard() {
  return apiClient<AdminDashboardResponse>("/admin/dashboard");
}

// ADMIN-09 공지사항 등록
export function createAdminNotice(data: CreateNoticeRequest) {
  return apiClient<AdminNotice>("/admin/notices", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ADMIN-10 공지사항 수정
export function updateAdminNotice(noticeId: string, data: UpdateNoticeRequest) {
  return apiClient<AdminNotice>(`/admin/notices/${noticeId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// ADMIN-11 공지사항 삭제
export function deleteAdminNotice(noticeId: string) {
  return apiClient<void>(`/admin/notices/${noticeId}`, {
    method: "DELETE",
  });
}
