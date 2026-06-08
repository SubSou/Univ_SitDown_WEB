import type { MenuType } from "../pages/HomePage";

type HeaderProps = {
  selectedMenu: MenuType;
  onToggleSidebar: () => void;
};

const titleMap: Record<MenuType, string> = {
  dashboard: "대시보드",
  member: "회원 관리",
  seat: "좌석 관리",
  notice: "공지사항",
  setting: "설정",
  logout: "로그아웃",
};

function Header({ selectedMenu, onToggleSidebar }: HeaderProps) {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="hamburger" onClick={onToggleSidebar}>
          ☰
        </button>
        <h2>{titleMap[selectedMenu]}</h2>
      </div>

      <div className="header-right">
        <span>🔔</span>
        <div className="admin-profile">👤</div>
        <strong>관리자</strong>
      </div>
    </header>
  );
}

export default Header;
