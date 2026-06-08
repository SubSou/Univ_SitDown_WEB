type SeatCompleteProps = {
  totalSeats: number;
  onConfirm: () => void;
};

function SeatComplete({ totalSeats, onConfirm }: SeatCompleteProps) {
  return (
    <section className="seat-create-page">
      <div className="seat-step-card complete-card">
        <div className="complete-icon">✓</div>
        <h3>좌석이 성공적으로 생성되었습니다.</h3>
        <p>생성된 좌석 수: {totalSeats}석</p>

        <button className="save-button complete-button" onClick={onConfirm}>
          확인
        </button>
      </div>
    </section>
  );
}

export default SeatComplete;
