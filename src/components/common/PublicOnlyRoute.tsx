import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "../../utils/auth";

function PublicOnlyRoute() {
  if (isLogin()) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;
