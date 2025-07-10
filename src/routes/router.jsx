import { createBrowserRouter } from "react-router";
import App from "../App";
import AllCourses from "../components/dashboard/AllCourses";
import AllUsers from "../components/dashboard/AllUsers";
import PendingTeachers from "../components/dashboard/PendingTeachers";
import UserProfile from "../components/dashboard/UserProfile";
import AddCourse from "../pages/AddCourse";
import BeTeacher from "../pages/BeTeacher";
import Courses from "../pages/Courses";
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
            path: "courses",
            element: <Courses />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
          {
            path: "pending-teachers",
            element: <PendingTeachers />,
          },
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-courses",
            element: <AllCourses />,
          },
          {
            path: "add-course",
            element: <AddCourse />,
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
