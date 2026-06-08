import type { CreateSeatForm } from "./types";

type SeatCreateFormProps = {
  form: CreateSeatForm;
  isSubmitting: boolean;
  onChange: (form: CreateSeatForm) => void;
  onCancel: () => void;
  onNext: () => void;
};

function SeatCreateForm({
  form,
  isSubmitting,
  onChange,
  onCancel,
  onNext,
}: SeatCreateFormProps) {
  const updateForm = <K extends keyof CreateSeatForm>(
    key: K,
    value: CreateSeatForm[K],
  ) => {
    onChange({ ...form, [key]: value });
  };

  return (
    <section className="seat-create-page">
      <div className="seat-step-card">
        <h3>좌석 정보 입력</h3>

        <label>공간 입력</label>
        <input
          type="text"
          value={form.space}
          onChange={(e) => updateForm("space", e.target.value)}
          placeholder="공간 명을 입력하세요"
        />

        <label>구역</label>
        <input
          type="text"
          value={form.area}
          onChange={(e) => updateForm("area", e.target.value)}
        />

        <label>좌석 타입</label>
        <input
          type="text"
          value={form.type}
          onChange={(e) => updateForm("type", e.target.value)}
        />

        <label>행</label>
        <input
          type="number"
          min={1}
          value={form.rows}
          onChange={(e) => updateForm("rows", Number(e.target.value))}
        />

        <label>열</label>
        <input
          type="number"
          min={1}
          value={form.cols}
          onChange={(e) => updateForm("cols", Number(e.target.value))}
        />

        <label>특징</label>
        <input
          type="text"
          value={form.feature}
          onChange={(e) => updateForm("feature", e.target.value)}
          placeholder="예: 콘센트, 조용함"
        />

        <div className="seat-form-buttons">
          <button type="button" onClick={onCancel} disabled={isSubmitting}>
            취소
          </button>

          <button type="button" onClick={onNext} disabled={isSubmitting}>
            {isSubmitting ? "생성 중..." : "다음"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default SeatCreateForm;
