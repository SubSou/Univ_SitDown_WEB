import { apiClient } from "./client";

export type SeatGridResponse = {
  spaceId: string;
  rows: number;
  columns: number;
  seats: {
    id: string;
    label: string;
    row: number;
    column: number;
    status: string;
    features: string[];
  }[];
};

export function getSpaceSeats(spaceId: string) {
  return apiClient<SeatGridResponse>(`/spaces/${spaceId}/seats`, {
    method: "GET",
  });
}
