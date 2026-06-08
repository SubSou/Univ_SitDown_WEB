export type SeatStep = "list" | "form" | "preview" | "complete" | "edit";

export type SeatItem = {
  id: string;
  code: string;
  spaceId: string;
  area: string;
  row: string;
  col: number;
  type: string;
  feature: string;
  status: "사용 가능" | "사용 불가";
};

export type EditSeat = {
  id: string;
  code: string;
  spaceId: string;
  space: string;
  area: string;
  row: string;
  col: string;
  type: string;
  feature: string;
  status: "사용 가능" | "사용 불가";
};

export type CreateSeatForm = {
  space: string;
  area: string;
  type: string;
  rows: number;
  cols: number;
  feature: string;
};
