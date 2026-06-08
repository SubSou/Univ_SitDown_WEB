import { useEffect, useState } from "react";
import {
  createAdminSeatGrid,
  createAdminSpace,
  updateAdminSeatStatus,
} from "../../api/adminApi";
import { getSpaces } from "../../api/spaceApi";
import { getSpaceSeats } from "../../api/seatApi";

import SeatComplete from "./seat/SeatComplete";
import SeatCreateForm from "./seat/SeatCreateForm";
import SeatEditForm from "./seat/SeatEditForm";
import SeatList from "./seat/SeatList";
import SeatPreview from "./seat/SeatPreview";
import type {
  CreateSeatForm,
  EditSeat,
  SeatItem,
  SeatStep,
} from "./seat/types";

const DEFAULT_CREATE_FORM: CreateSeatForm = {
  space: "",
  area: "A 구역",
  type: "일반 좌석",
  rows: 5,
  cols: 10,
  feature: "",
};

const DEFAULT_EDIT_SEAT: EditSeat = {
  id: "",
  code: "",
  spaceId: "",
  space: "",
  area: "",
  row: "",
  col: "",
  type: "일반 좌석",
  feature: "",
  status: "사용 가능",
};

function SeatManagement() {
  const [step, setStep] = useState<SeatStep>("list");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createdSpaceId, setCreatedSpaceId] = useState("");

  const [seatListData, setSeatListData] = useState<SeatItem[]>([]);
  const [editSeatList, setEditSeatList] = useState<SeatItem[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [createForm, setCreateForm] =
    useState<CreateSeatForm>(DEFAULT_CREATE_FORM);

  const [editSeat, setEditSeat] = useState<EditSeat>(DEFAULT_EDIT_SEAT);

  const totalSeats = createForm.rows * createForm.cols;

  useEffect(() => {
    if (step !== "list") return;

    let ignore = false;

    const fetchSpaces = async () => {
      try {
        const response = await getSpaces({
          page: currentPage,
          size: 20,
        });

        if (ignore) return;

        setTotalPages(response.totalPages);

        setSeatListData(
          response.content.map(
            (space, index): SeatItem => ({
              id: space.id,
              code: space.id,
              spaceId: space.id,
              area: `${space.name} ${space.floor}층`,
              row: "-",
              col: currentPage * 20 + index + 1,
              type: "일반 좌석",
              feature: space.features?.join(", ") ?? "",
              status: space.availableSeats > 0 ? "사용 가능" : "사용 불가",
            }),
          ),
        );
      } catch (error) {
        console.error("공간 목록 조회 에러:", error);
        alert("공간 목록 조회 실패");
      }
    };

    fetchSpaces();

    return () => {
      ignore = true;
    };
  }, [currentPage, step]);

  const resetCreateForm = () => {
    setCreateForm(DEFAULT_CREATE_FORM);
    setCreatedSpaceId("");
  };

  const resetEditForm = () => {
    setEditSeat(DEFAULT_EDIT_SEAT);
    setEditSeatList([]);
  };

  const handleAddClick = () => {
    resetCreateForm();
    setStep("form");
  };

  const handleNext = async () => {
    if (!createForm.space.trim()) {
      alert("공간명을 입력해주세요.");
      return;
    }

    if (!createForm.area.trim()) {
      alert("구역을 입력해주세요.");
      return;
    }

    if (createForm.rows <= 0 || createForm.cols <= 0) {
      alert("행과 열은 1 이상이어야 합니다.");
      return;
    }

    try {
      setIsSubmitting(true);

      const createdSpace = await createAdminSpace({
        name: createForm.space.trim(),
        floor: 1,
        category: "READING_ROOM",
        openTime: "09:00",
        closeTime: "22:00",
        maxReservationHours: 4,
        features: createForm.feature.trim()
          ? createForm.feature.split(",").map((item) => item.trim())
          : [],
      });

      const spaceId = createdSpace.id;

      if (!spaceId) {
        alert("공간 생성은 되었지만 spaceId를 찾을 수 없습니다.");
        return;
      }

      setCreatedSpaceId(spaceId);
      setStep("preview");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "공간 생성에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateSeats = async () => {
    if (!createdSpaceId) {
      alert("생성된 공간 ID가 없습니다. 다시 시도해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      await createAdminSeatGrid(createdSpaceId, {
        rows: createForm.rows,
        columns: createForm.cols,
        labelPrefix: createForm.area.slice(0, 1),
        overwrite: false,
      });

      setStep("complete");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "좌석 생성에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = async (spaceItem: SeatItem) => {
    try {
      setIsSubmitting(true);

      const seatGrid = await getSpaceSeats(spaceItem.spaceId);

      const seats = seatGrid.seats.map(
        (seat): SeatItem => ({
          id: seat.id,
          code: seat.label,
          spaceId: spaceItem.spaceId,
          area: spaceItem.area,
          row: String(seat.row),
          col: seat.column,
          type: "일반 좌석",
          feature: seat.features?.join(", ") ?? "",
          status: seat.status === "UNAVAILABLE" ? "사용 불가" : "사용 가능",
        }),
      );

      if (seats.length === 0) {
        alert("해당 공간에 좌석이 없습니다.");
        return;
      }

      const firstSeat = seats[0];

      setEditSeatList(seats);

      setEditSeat({
        id: firstSeat.id,
        code: firstSeat.code,
        spaceId: firstSeat.spaceId,
        space: firstSeat.area,
        area: firstSeat.area,
        row: firstSeat.row,
        col: String(firstSeat.col),
        type: firstSeat.type,
        feature: firstSeat.feature,
        status: firstSeat.status,
      });

      setStep("edit");
    } catch (error) {
      console.error("좌석 조회 에러:", error);
      alert("좌석 조회 실패");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSeat = async () => {
    if (!editSeat.id) {
      alert("수정할 좌석 ID가 없습니다.");
      return;
    }

    try {
      setIsSubmitting(true);

      await updateAdminSeatStatus(editSeat.id, {
        isEnabled: editSeat.status !== "사용 불가",
      });

      alert("좌석 정보가 저장되었습니다.");
      resetEditForm();
      setStep("list");
    } catch (error) {
      console.log(error);
      alert(
        error instanceof Error ? error.message : "좌석 수정에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "form") {
    return (
      <SeatCreateForm
        form={createForm}
        isSubmitting={isSubmitting}
        onChange={setCreateForm}
        onCancel={() => setStep("list")}
        onNext={handleNext}
      />
    );
  }

  if (step === "preview") {
    return (
      <SeatPreview
        rows={createForm.rows}
        cols={createForm.cols}
        isSubmitting={isSubmitting}
        onPrev={() => setStep("form")}
        onCreate={handleCreateSeats}
      />
    );
  }

  if (step === "complete") {
    return (
      <SeatComplete
        totalSeats={totalSeats}
        onConfirm={() => {
          resetCreateForm();
          setStep("list");
        }}
      />
    );
  }

  if (step === "edit") {
    return (
      <SeatEditForm
        editSeat={editSeat}
        seats={editSeatList}
        isSubmitting={isSubmitting}
        onChange={setEditSeat}
        onCancel={() => {
          resetEditForm();
          setStep("list");
        }}
        onSave={handleUpdateSeat}
      />
    );
  }

  return (
    <SeatList
      seats={seatListData}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      onAdd={handleAddClick}
      onEdit={handleEditClick}
    />
  );
}

export default SeatManagement;
