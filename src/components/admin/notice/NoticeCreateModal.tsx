import type { NoticeCategory } from "../../../api/adminApi";
import type { NoticeForm } from "../NoticeManagement";

type Props = {
  notice: NoticeForm;
  onChange: (notice: NoticeForm) => void;
  onClose: () => void;
  onSave: () => void;
};

function NoticeCreateModal({ notice, onChange, onClose, onSave }: Props) {
  return (
    <div className="modal-backdrop">
      <div className="edit-modal">
        <div className="modal-header">
          <h3>공지사항 등록</h3>
          <button onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <label>제목</label>
          <input
            value={notice.title}
            placeholder="공지사항 제목을 입력하세요"
            onChange={(e) =>
              onChange({
                ...notice,
                title: e.target.value,
              })
            }
          />

          <label>내용</label>
          <textarea
            value={notice.content}
            placeholder="공지사항 내용을 입력하세요"
            onChange={(e) =>
              onChange({
                ...notice,
                content: e.target.value,
              })
            }
          />

          <label>분류</label>
          <select
            className="modal-select"
            value={notice.category}
            onChange={(e) =>
              onChange({
                ...notice,
                category: e.target.value as NoticeCategory,
              })
            }
          >
            <option value="INFO">안내</option>
            <option value="MAINTENANCE">점검</option>
            <option value="EVENT">이벤트</option>
          </select>
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>

          <button className="save-button" onClick={onSave}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoticeCreateModal;
