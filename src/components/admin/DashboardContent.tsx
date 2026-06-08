import type { MenuType } from "../../pages/HomePage";
import DashboardMain from "./DashboardMain";
import MemberManagement from "./MemberManagement";
import SeatManagement from "./SeatManagement";
import NoticeManagement from "./NoticeManagement";
import SettingManagement from "./SettingManagement";

type Props = {
  selectedMenu: MenuType;
};

function DashboardContent({ selectedMenu }: Props) {
  if (selectedMenu === "member") return <MemberManagement />;
  if (selectedMenu === "seat") return <SeatManagement />;
  if (selectedMenu === "notice") return <NoticeManagement />;
  if (selectedMenu === "setting") return <SettingManagement />;

  return <DashboardMain />;
}

export default DashboardContent;
