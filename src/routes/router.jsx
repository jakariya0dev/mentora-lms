import { createBrowserRouter } from "react-router";
import App from "../App";
import MyCourses from "../components/dashboard/MyCourses";
import PendingTeachers from "../components/dashboard/PendingTeachers";
import UserProfile from "../components/dashboard/UserProfile";
import BeTeacher from "../pages/BeTeacher";
import DashBoard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
        children: [
          {
            index: true,
            path: "my-courses",
            element: <MyCourses />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
          {
            path: "pending-teachers",
            element: <PendingTeachers />,
          },
        ],
      },
      {
        path: "/become-teacher",
        element: <BeTeacher />,
      },
    ],
  },
]);

export default router;
