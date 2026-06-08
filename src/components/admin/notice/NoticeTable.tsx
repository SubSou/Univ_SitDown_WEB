import type { NoticeCategory } from "../../../api/adminApi";
import type { NoticeListItem } from "../../../api/noticeApi";

type Props = {
  notices: NoticeListItem[];
  onEdit: (noticeId: string) => void;
  onDelete: (noticeId: string) => void;
};

function NoticeTable({ notices, onEdit, onDelete }: Props) {
  const getCategoryLabel = (category: NoticeCategory) => {
    switch (category) {
      case "INFO":
        return "안내";
      case "MAINTENANCE":
        return "점검";
      case "EVENT":
        return "이벤트";
      default:
        return category;
    }
  };

  return (
    <div className="notice-table-wrap">
      <table className="admin-table notice-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>분류</th>
            <th>등록일</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td>
                {notice.title}
                {notice.isNew && (
                  <span style={{ marginLeft: 6, color: "red" }}>NEW</span>
                )}
              </td>

              <td>
                <span className="notice-type-badge">
                  {getCategoryLabel(notice.category)}
                </span>
              </td>

              <td>{notice.publishedAt}</td>

              <td>
                <div className="notice-action">
                  <button
                    className="notice-edit-button"
                    onClick={() => onEdit(notice.id)}
                  >
                    수정
                  </button>

                  <button
                    className="notice-delete-button"
                    onClick={() => onDelete(notice.id)}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {notices.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                등록된 공지사항이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default NoticeTable;
