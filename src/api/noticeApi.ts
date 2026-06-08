import { apiClient } from "./client";
import type { NoticeCategory } from "./adminApi";

export type NoticeListCategory = "ALL" | NoticeCategory;

export type NoticeListItem = {
  id: string;
  title: string;
  category: NoticeCategory;
  publishedAt: string;
  isNew: boolean;
};

export type NoticeDetail = {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  publishedAt: string;
};

export type NoticeListResponse = {
  content: NoticeListItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

export function getNotices(
  category: NoticeListCategory = "ALL",
  page = 0,
  size = 20,
) {
  return apiClient<NoticeListResponse>(
    `/notices?category=${category}&page=${page}&size=${size}`,
  );
}

export function getNoticeDetail(noticeId: string) {
  return apiClient<NoticeDetail>(`/notices/${noticeId}`);
}
