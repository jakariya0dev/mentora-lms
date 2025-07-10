import { NavLink, Outlet } from "react-router";

export default function TeacherDash() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard/add-course"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-yellow-200"
            }
          >
            Add Course
          </NavLink>

          <NavLink
            to="/dashboard/courses"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-yellow-200"
            }
          >
            My Course
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-yellow-200"
            }
          >
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
