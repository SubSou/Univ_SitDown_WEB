import { Search } from "lucide-react";

type Props = {
  keyword: string;
  onKeywordChange: (value: string) => void;
};

export default function MemberToolbar({ keyword, onKeywordChange }: Props) {
  return (
    <div className="member-toolbar">
      <div className="member-search-box">
        <Search size={18} color="#8b95a1" />

        <input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="아이디, 이름, 이메일 검색"
        />
      </div>
    </div>
  );
}
