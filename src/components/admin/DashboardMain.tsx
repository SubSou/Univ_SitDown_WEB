import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard } from "../../api/adminApi";

type DashboardData = {
  spaceCount: number;
  activeReservationCount: number;
};

function DashboardMain() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<DashboardData>({
    spaceCount: 0,
    activeReservationCount: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const dashboardResult = await getAdminDashboard();
        setDashboard(dashboardResult);
      } catch (error) {
        localStorage.removeItem("accessToken");
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate]);

  if (loading) {
    return <section className="dashboard-content">로딩 중...</section>;
  }

  return (
    <section className="dashboard-content">
      <div className="stats-grid">
        <div className="stat-card">
          <p>전체 공간 수</p>
          <h2>{dashboard.spaceCount}</h2>
        </div>

        <div className="stat-card">
          <p>활성 예약 수</p>
          <h2>{dashboard.activeReservationCount}</h2>
        </div>
      </div>
    </section>
  );
}

export default DashboardMain;
