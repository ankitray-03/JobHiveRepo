import {
  Bell,
  User,
  LogOut,
  Briefcase,
  CloudUpload,
  LayoutDashboard,
  Brush,
  BrainCircuit,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../../store/user/UserSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.post("/api/auth/logout");

      if (res.data.success) {
        // succeess logout
        dispatch(signOutUserSuccess());
        return;
      }
      dispatch(signOutUserFailure());
      navigate("/");
    } catch (err) {
      dispatch(signOutUserFailure(err.message));
    }
  };
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">
              <Briefcase className="float-left mr-2" />
              <Link to="/">JobHive</Link>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-700 hover:text-gray-900font-semibold"
              data-tooltip-id="Dashboard-tooltip"
              data-tooltip-content="Dashboard"
            >
              <Tooltip id="Dashboard-tooltip" place="top" />
              <Link to="/dashboard">
                <LayoutDashboard />
              </Link>
            </button>

            <button
              className="text-gray-700 hover:text-gray-900 cursor-pointer"
              data-tooltip-id="Upload-tooltip"
              data-tooltip-content="Upload"
            >
              <Tooltip id="Upload-tooltip" place="top" />
              <Link to="/dashboard/addResume">
                <CloudUpload className="h-6 w-6" />
              </Link>
            </button>

            <button
              className="text-gray-700 hover:text-gray-900"
              data-tooltip-id="Logout-tooltip"
              data-tooltip-content="Logout"
            >
              <Tooltip id="Logout-tooltip" place="top" />
              <LogOut
                className="h-6 w-6 cursor-pointer"
                onClick={handleSignout}
              />
            </button>
            <Link to="/job-desc-analyse">
              <button
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                data-tooltip-id="JD-analyzer-tooltip"
                data-tooltip-content="AI Assistant"
              >
                <Tooltip id="JD-analyzer-tooltip" place="top" />

                <BrainCircuit className="h-6 w-6" />
              </button>
            </Link>
            <Link to="/profile">
              <button
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                data-tooltip-id="Profile-tooltip"
                data-tooltip-content="Profile"
              >
                <Tooltip id="Profile-tooltip" place="top" />
                <User className="h-6 w-6" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
