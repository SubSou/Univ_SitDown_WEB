import type { NoticeListCategory } from "../../../api/noticeApi";

type Props = {
  keyword: string;
  category: NoticeListCategory;
  onKeywordChange: (value: string) => void;
  onCategoryChange: (value: NoticeListCategory) => void;
  onCreateClick: () => void;
};

function NoticeToolbar({
  keyword,
  category,
  onKeywordChange,
  onCategoryChange,
  onCreateClick,
}: Props) {
  return (
    <>
      <div className="notice-header">
        <h3>공지사항</h3>

        <button className="add-notice-button" onClick={onCreateClick}>
          + 공지사항 추가
        </button>
      </div>

      <div className="notice-search-area">
        <div className="notice-search-box">
          <span>🔍</span>

          <input
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="제목 검색"
          />
        </div>

        <select
          className="notice-category-select"
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value as NoticeListCategory)
          }
        >
          <option value="ALL">전체</option>
          <option value="INFO">안내</option>
          <option value="MAINTENANCE">점검</option>
          <option value="EVENT">이벤트</option>
        </select>
      </div>
    </>
  );
}

export default NoticeToolbar;
