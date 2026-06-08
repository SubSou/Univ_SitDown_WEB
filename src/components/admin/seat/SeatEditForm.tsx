import { Fragment } from "react";
import type { EditSeat, SeatItem } from "./types";

type SeatEditFormProps = {
  editSeat: EditSeat;
  seats: SeatItem[];
  isSubmitting: boolean;
  onChange: (seat: EditSeat) => void;
  onCancel: () => void;
  onSave: () => void;
};

function SeatEditForm({
  editSeat,
  seats,
  isSubmitting,
  onChange,
  onCancel,
  onSave,
}: SeatEditFormProps) {
  const updateSeat = <K extends keyof EditSeat>(key: K, value: EditSeat[K]) => {
    onChange({ ...editSeat, [key]: value });
  };

  const maxRow = Math.max(...seats.map((seat) => Number(seat.row)), 1);
  const maxCol = Math.max(...seats.map((seat) => Number(seat.col)), 1);

  return (
    <section className="seat-edit-page">
      <div className="seat-edit-card">
        <div className="seat-edit-left">
          <div className="form-row">
            <label>좌석 코드</label>
            <input value={editSeat.code} readOnly />
          </div>

          <div className="form-row">
            <label>공간</label>
            <input value={editSeat.space} readOnly />
          </div>

          <div className="form-row">
            <label>구역</label>
            <input value={editSeat.area} readOnly />
          </div>

          <div className="form-row">
            <label>행</label>
            <input value={editSeat.row} readOnly />
          </div>

          <div className="form-row">
            <label>열</label>
            <input value={editSeat.col} readOnly />
          </div>

          <div className="form-row">
            <label>좌석 유형</label>
            <input value={editSeat.type} readOnly />
          </div>

          <div className="form-row">
            <label>특징</label>
            <input value={editSeat.feature} readOnly />
          </div>

          <div className="form-row">
            <label>상태</label>
            <select
              value={editSeat.status}
              onChange={(e) =>
                updateSeat(
                  "status",
                  e.target.value as "사용 가능" | "사용 불가",
                )
              }
            >
              <option>사용 가능</option>
              <option>사용 불가</option>
            </select>
          </div>
        </div>

        <div className="seat-edit-right">
          <h3>좌석 선택</h3>

          <div
            className="edit-seat-map"
            style={{
              gridTemplateColumns: `32px repeat(${maxCol}, 42px)`,
            }}
          >
            <div />

            {Array.from({ length: maxCol }).map((_, index) => (
              <strong key={index}>{index + 1}</strong>
            ))}

            {Array.from({ length: maxRow }).map((_, rowIndex) => {
              const rowNumber = rowIndex + 1;
              const rowLabel = String.fromCharCode(64 + rowNumber);

              return (
                <Fragment key={rowNumber}>
                  <strong>{rowLabel}</strong>

                  {Array.from({ length: maxCol }).map((_, colIndex) => {
                    const colNumber = colIndex + 1;

                    const targetSeat = seats.find(
                      (seat) =>
                        Number(seat.row) === rowNumber &&
                        Number(seat.col) === colNumber,
                    );

                    if (!targetSeat) {
                      return <div key={`${rowNumber}-${colNumber}`} />;
                    }

                    const isSelected = editSeat.id === targetSeat.id;

                    return (
                      <button
                        key={targetSeat.id}
                        type="button"
                        className={`seat-box ${
                          isSelected
                            ? "selected"
                            : targetSeat.status === "사용 불가"
                              ? "disabled"
                              : "available"
                        }`}
                        onClick={() =>
                          onChange({
                            ...editSeat,
                            id: targetSeat.id,
                            code: targetSeat.code,
                            row: targetSeat.row,
                            col: String(targetSeat.col),
                            feature: targetSeat.feature,
                            status: targetSeat.status,
                          })
                        }
                      >
                        {targetSeat.code}
                      </button>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>

          <div className="seat-map-legend">
            <span>
              <i className="available" /> 사용 가능
            </span>
            <span>
              <i className="selected" /> 선택됨
            </span>
            <span>
              <i className="disabled" /> 사용 불가
            </span>
          </div>
        </div>

        <div className="seat-edit-footer">
          <button className="cancel-button" onClick={onCancel}>
            취소
          </button>
          <button
            className="save-button"
            onClick={onSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default SeatEditForm;
