import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  // Settings,
  NotebookPen,
  FileCheck,
  Menu,
  X,
  CloudUpload,
  BrainCircuit,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const DashboardSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Applications", href: "/dashboard/applications", icon: Briefcase },
    { name: "Interviews", href: "/dashboard/interviews", icon: Calendar },
    {
      name: "Add Application",
      href: "/dashboard/addApplication",
      icon: NotebookPen,
    },
    { name: "Add Resume", href: "/dashboard/addResume", icon: CloudUpload },
    { name: "My Resumes", href: "/dashboard/viewResume", icon: FileCheck },
    { name: "AI Assistant", href: "/job-desc-analyse", icon: BrainCircuit },
    // { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];
  return (
    <>
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="float-right flex items-center md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-500 hover:text-gray-600 cursor-pointer"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard/applications"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Applications
            </Link>
            <Link
              to="/dashboard/interviews"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Interviews
            </Link>
            <Link
              to="/dashboard/addApplication"
              className="block w-full text-left px-3 py-2 text-base font-medium  text-gray-700 hover:text-blue-700"
            >
              Add Application
            </Link>
            <Link
              to="/dashboard/addResume"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Add Resume
            </Link>
            <Link
              to="/dashboard/viewResume"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              My Resumes
            </Link>
            {/* <Link
              to="/dashboard/settings"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Settings
            </Link> */}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
