import { useMutation } from "@tanstack/react-query";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import MenuIcon from "../../assets/icons/menu.svg";
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


  const links = (
    <>
      <li>
        <NavLink to="/courses" className="font-semibold">
          All Courses
        </NavLink>
      </li>
      <li></li>
      <li>
        <NavLink to="/become-teacher">Become teacher</NavLink>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-lg">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <img src={MenuIcon} alt="" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/">
            <span className="text-xl font-bold">Mentora</span>
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
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <p>{user?.displayName}</p>
          </li>
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link onClick={() => logoutMutation.mutate()}>Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
