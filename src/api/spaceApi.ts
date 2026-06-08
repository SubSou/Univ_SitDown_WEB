import { apiClient } from "./client";

export type SpaceCategory =
  | "READING_ROOM"
  | "STUDY_ROOM"
  | "PC_ROOM"
  | "LECTURE_ROOM";

export type SpaceListCategory = "ALL" | SpaceCategory;

export type Congestion = "LOW" | "NORMAL" | "HIGH";

export type SpaceListItem = {
  id: string;
  name: string;
  floor: number;
  category: SpaceCategory;
  totalSeats: number;
  availableSeats: number;
  congestion: Congestion;
  openTime: string;
  closeTime: string;
  features: string[];
  thumbnailUrl: string | null;
};

export type SpaceListResponse = {
  content: SpaceListItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

// SPACE-01 공간 목록 조회
export function getSpaces(params?: {
  category?: SpaceListCategory;
  keyword?: string;
  page?: number;
  size?: number;
}) {
  const category = params?.category ?? "ALL";
  const keyword = params?.keyword ?? "";
  const page = params?.page ?? 0;
  const size = params?.size ?? 20;

  const query = new URLSearchParams();

  if (category !== "ALL") {
    query.set("category", category);
  }

  if (keyword.trim()) {
    query.set("keyword", keyword.trim());
  }

  query.set("page", String(page));
  query.set("size", String(size));

  return apiClient<SpaceListResponse>(`/spaces?${query.toString()}`);
}
