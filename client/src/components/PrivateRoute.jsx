import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import DashboardSidebar from "./Dashboard/DashboardSidebar";
import VerifyOTPPage from "../pages/VerifyOTPPage";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? (
    <>
      {currentUser.isVerified ? (
        <div className="flex">
          <DashboardSidebar />
          <div>
            <Outlet />
          </div>
        </div>
      ) : (
        <VerifyOTPPage />
      )}
    </>
  ) : (
    <Navigate to="/sign-in" />
  );
}
