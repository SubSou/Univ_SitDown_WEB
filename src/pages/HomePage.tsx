import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardContent from "../components/admin/DashboardContent";
import "../styles/HomePage.css";
import "../styles/Dashboard.css";
import "../styles/MemberPage.css";
import "../styles/SeatPage.css";
import "../styles/NoticePage.css";
import "../styles/Modal.css";

export type MenuType =
  | "dashboard"
  | "member"
  | "seat"
  | "notice"
  | "setting"
  | "logout";

function HomePage() {
  const [selectedMenu, setSelectedMenu] = useState<MenuType>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="admin-page">
      <Sidebar
        selectedMenu={selectedMenu}
        onChangeMenu={setSelectedMenu}
        isOpen={isSidebarOpen}
      />

      <main className="admin-main">
        <Header
          selectedMenu={selectedMenu}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <DashboardContent selectedMenu={selectedMenu} />
      </main>
    </div>
  );
}

export default HomePage;
