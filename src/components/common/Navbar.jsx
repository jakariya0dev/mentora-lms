import { useMutation } from "@tanstack/react-query";
import { MdArrowRight } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { user, isUserLoading, userLogout } = useAuth();

  const logoutMutation = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      toast.success("Logged out successfully!");
    },
    onError: (error) => {
      toast.error("Logout failed!");
      console.error(error);
    },
  });

  const linkStyle = ({ isActive }) =>
    isActive ? "text-primary font-semibold" : "font-semibold";

  const links = (
    <>
      <li>
        <NavLink to="/" className={linkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/courses" className={linkStyle}>
          All Courses
        </NavLink>
      </li>

      <li>
        <NavLink to="/become-teacher" className={linkStyle}>
          Teach on Mentora
        </NavLink>
      </li>

      {/* Dashboard links only visible on mobile */}

      <hr className="md:hidden my-2 border-gray-400" />

      {user?.role === "admin" && (
        <li className="md:hidden">
          <NavLink to="/dashboard/teachers" className={linkStyle}>
            All Teachers
          </NavLink>
        </li>
      )}

      {user?.role === "admin" && (
        <li className="md:hidden">
          <NavLink to="/dashboard/users" className={linkStyle}>
            All Users
          </NavLink>
        </li>
      )}

      {user?.role === "admin" && (
        <li className="md:hidden">
          <NavLink to="/dashboard/courses" className={linkStyle}>
            All Courses
          </NavLink>
        </li>
      )}

      {user?.role === "student" && (
        <li className="md:hidden">
          <NavLink to="/dashboard/courses" className={linkStyle}>
            Enrolled Courses
          </NavLink>
        </li>
      )}

      {user?.role === "teacher" && (
        <li className="md:hidden">
          <NavLink to="/dashboard/courses" className={linkStyle}>
            My Courses
          </NavLink>
        </li>
      )}

      {user?.role === "teacher" && (
        <li className="md:hidden">
          <NavLink to="/dashboard/courses/add" className={linkStyle}>
            Add Course
          </NavLink>
        </li>
      )}

      {user && (
        <li className="md:hidden">
          <NavLink to="/dashboard/profile" className={linkStyle}>
            My Profile
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-lg">
      <div className="navbar  mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-2xl"
            >
              <TiThMenu />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/">
            <span className="text-2xl font-bold">Mentora</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <UserData
            user={user}
            isUserLoading={isUserLoading}
            logoutMutation={logoutMutation}
          />
        </div>
      </div>
    </nav>
  );
}

const UserData = ({ user, isUserLoading, logoutMutation }) => {
  if (isUserLoading)
    return <span className="loading loading-spinner loading-lg"></span>;

  if (!user)
    return (
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
    );

  return (
    <>
      <div className="dropdown">
        <div tabIndex={1} role="button" className="">
          <img
            src={user.photoURL}
            alt=""
            className="w-10 h-10 rounded-full mr-4 ring-2 hover:ring-3 hover:ring-amber-500 transition-all duration-300"
          />
        </div>

        <ul
          tabIndex={1}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow right-0"
        >
          <li>
            <p className="font-semibold text-center">{user?.displayName}</p>
          </li>
          <li>
            <Link to="/dashboard/profile">
              <MdArrowRight />
              Profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <MdArrowRight />
              Dashboard
            </Link>
          </li>
          <li>
            <Link onClick={() => logoutMutation.mutate()}>
              <MdArrowRight />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
