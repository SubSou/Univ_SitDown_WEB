import { Fragment } from "react";

type SeatPreviewProps = {
  rows: number;
  cols: number;
  isSubmitting: boolean;
  onPrev: () => void;
  onCreate: () => void;
};

function SeatPreview({
  rows,
  cols,
  isSubmitting,
  onPrev,
  onCreate,
}: SeatPreviewProps) {
  return (
    <section className="seat-create-page">
      <div className="seat-step-card preview-card">
        <h3>좌석 미리보기</h3>

        <div
          className="seat-preview-grid"
          style={{ gridTemplateColumns: `24px repeat(${cols}, 28px)` }}
        >
          <div className="seat-col-header" />

          {Array.from({ length: cols }).map((_, index) => (
            <div className="seat-col-header" key={index}>
              {index + 1}
            </div>
          ))}

          {Array.from({ length: rows }).map((_, rowIndex) => (
            <Fragment key={rowIndex}>
              <div className="seat-row-header">
                {String.fromCharCode(65 + rowIndex)}
              </div>

              {Array.from({ length: cols }).map((_, colIndex) => (
                <div
                  className="seat-preview-item"
                  key={`${rowIndex}-${colIndex}`}
                />
              ))}
            </Fragment>
          ))}
        </div>

        <div className="seat-legend">
          <span className="legend-box" />
          사용 가능
        </div>

        <div className="seat-step-footer">
          <button
            type="button"
            className="cancel-button"
            onClick={onPrev}
            disabled={isSubmitting}
          >
            이전
          </button>

          <button
            type="button"
            className="save-button"
            onClick={onCreate}
            disabled={isSubmitting}
          >
            {isSubmitting ? "생성 중..." : "생성하기"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default SeatPreview;
