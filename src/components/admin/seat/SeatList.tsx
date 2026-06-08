import type { SeatItem } from "./types";

type SeatListProps = {
  seats: SeatItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onAdd: () => void;
  onEdit: (seat: SeatItem) => void;
};

function SeatList({
  seats,
  currentPage,
  totalPages,
  onPageChange,
  onAdd,
  onEdit,
}: SeatListProps) {
  return (
    <section className="content-box seat-page-box">
      <div className="seat-header">
        <h3>좌석 관리</h3>
        <button className="add-seat-button" onClick={onAdd}>
          + 좌석 추가
        </button>
      </div>

      <div className="seat-table-scroll">
        <table className="admin-table seat-table">
          <thead>
            <tr>
              <th>좌석 코드</th>
              <th>구역</th>
              <th>유형</th>
              <th>특징</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>

          <tbody>
            {seats.map((seat) => (
              <tr key={seat.code}>
                <td>{seat.code}</td>
                <td>{seat.area}</td>
                <td>{seat.type}</td>
                <td>{seat.feature}</td>
                <td>
                  <span className="status-badge">{seat.status}</span>
                </td>
                <td>
                  <div className="seat-action">
                    <button
                      className="seat-edit-button"
                      onClick={() => onEdit(seat)}
                    >
                      수정
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="seat-pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={currentPage === index ? "active" : ""}
            onClick={() => onPageChange(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SeatList;
