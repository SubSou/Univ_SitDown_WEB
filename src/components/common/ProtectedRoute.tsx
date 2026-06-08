import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "../../utils/auth";

function ProtectedRoute() {
  if (!isLogin()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
