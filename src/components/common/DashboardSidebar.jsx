import { FaBookOpen } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { IoDocumentsSharp } from "react-icons/io5";
import { LuBookUser } from "react-icons/lu";
import { MdAddToPhotos } from "react-icons/md";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function DashboardSidebar() {
  const { user } = useAuth();

  const linkStyle = ({ isActive }) =>
    isActive ? "text-yellow-300" : "hover:text-yellow-200";

  return (
    <div className="w-3/12 bg-gray-800 text-white p-10 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        {user?.role === "admin" && (
          <NavLink to="/dashboard/teachers" className={linkStyle}>
            <LinkTile title="All Teachers">
              <PiChalkboardTeacherBold />
            </LinkTile>
          </NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink to="/dashboard/users" className={linkStyle}>
            <LinkTile title="All Users">
              <LuBookUser />
            </LinkTile>
          </NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink to="/dashboard/courses" className={linkStyle}>
            <LinkTile title="All Courses">
              <FaBookOpen />
            </LinkTile>
          </NavLink>
        )}

        {user?.role === "student" && (
          <NavLink to="/dashboard/courses" className={linkStyle}>
            <LinkTile title="Enrolled Courses">
              <IoDocumentsSharp />
            </LinkTile>
          </NavLink>
        )}

        {user?.role === "teacher" && (
          <NavLink to="/dashboard/courses" className={linkStyle}>
            <LinkTile title="My Courses">
              <IoDocumentsSharp />
            </LinkTile>
          </NavLink>
        )}

        {user?.role === "teacher" && (
          <NavLink to="/dashboard/courses/add" className={linkStyle}>
            <LinkTile title="Add Course">
              <MdAddToPhotos />
            </LinkTile>
          </NavLink>
        )}

        <NavLink to="/dashboard/profile" className={linkStyle}>
          <LinkTile title="My Profile">
            <IoIosPerson />
          </LinkTile>
        </NavLink>
      </nav>
    </div>
  );
}

const LinkTile = ({ title, children }) => {
  return (
    <span className="flex items-center gap-2 text-lg">
      {children}
      {title}
    </span>
  );
};
