import { Outlet, NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  LogOut,Moon, Sun
} from "lucide-react";

import useAuthStore from "../store/authStore";

import useThemeStore from '../store/themeStore';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const darkMode = useThemeStore(
    (state) => state.darkMode
  );
  const toggleTheme = useThemeStore(
    (state) => state.toggleTheme
  );

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if(!confirmed) return;

    logout();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors flex">

      {/* SIDEBAR */}

      <aside className="hidden md:flex w-72 bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors border-r shadow-sm flex-col justify-between">

        <div>

          {/* LOGO */}

          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold text-blue-600">
              GigFlow
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-sm  mt-1">
              Smart Leads Dashboard
            </p>
          </div>

          {/* NAVIGATION */}

          <nav className="p-4 space-y-2">

            <NavLink
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 dark:text-gray-300 font-medium transition cursor-pointer"
            >
              <LayoutDashboard size={20} />

              Dashboard
            </NavLink>

            {/* <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 font-medium transition cursor-pointer"
            >
              <Users size={20} />

              Leads
            </button> */}
          </nav>
        </div>

        {/* USER SECTION */}

        <div className="p-4 border-t">

          <div className="flex justify-between items-center mb-5">
            <div className="mb-2">
              <p className="dark:text-gray-200 font-semibold">
                {user?.name}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {user?.role}
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 mb-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:scale-105 transition cursor-pointer"
            >
              {
                darkMode ? ( <Sun size={20} /> ) : (<Moon size={20} />)
              }
            </button>
          
          </div>          


          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition cursor-pointer"
          >
            <LogOut size={18} />

            Logout
          </button>

        </div>
      </aside>

      {/* MAIN */}

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="md:hidden mb-6">
            <h1 className="text-2xl font-bold text-blue-600">
                GigFlow
            </h1>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;