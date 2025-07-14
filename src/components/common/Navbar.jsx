import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import MenuIcon from "../../assets/icons/menu.svg";
import { AuthContext } from "../../providers/AuthProvider";

export default function Navbar() {
  const { user, userLogout } = useContext(AuthContext);

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
          <a className="text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
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
                    <p>{user.displayName}</p>
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
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
