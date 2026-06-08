import type { MenuType } from "../pages/HomePage";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../utils/auth";

type SidebarProps = {
  selectedMenu: MenuType;
  onChangeMenu: (menu: MenuType) => void;
  isOpen: boolean;
};

const menuList: { id: MenuType; label: string; icon: string }[] = [
  { id: "dashboard", label: "대시보드", icon: "📊" },
  { id: "member", label: "회원 관리", icon: "👤" },
  { id: "seat", label: "좌석 관리", icon: "🏫" },
  { id: "notice", label: "공지사항", icon: "📢" },
  { id: "setting", label: "설정", icon: "⚙️" },
  { id: "logout", label: "로그아웃", icon: "↩️" },
];

function Sidebar({ selectedMenu, onChangeMenu, isOpen }: SidebarProps) {
  const navigate = useNavigate();

  const handleMenuClick = (menu: MenuType) => {
    if (menu === "logout") {
      const isLogout = window.confirm("로그아웃 하시겠습니까?");

      if (!isLogout) {
        return;
      }

      clearAuth();
      navigate("/", { replace: true });
      return;
    }

    onChangeMenu(menu);
  };

  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">🏛️</div>
        <div className="logo-text">
          <strong>UNIV SITDOWN</strong>
          <p>관리자</p>
        </div>
      </div>

      <nav className="menu-list">
        {menuList.map((menu) => (
          <button
            key={menu.id}
            className={`menu-item ${selectedMenu === menu.id ? "active" : ""}`}
            onClick={() => handleMenuClick(menu.id)}
          >
            <span>{menu.icon}</span>
            <span className="menu-text">{menu.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
