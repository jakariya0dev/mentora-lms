import { createBrowserRouter } from "react-router";
import App from "../App";
import ManageTeachers from "../pages/admin/ManageTeachers";
import ManageUsers from "../pages/admin/ManageUsers";
import BeTeacher from "../pages/BeTeacher";
import CourseDash from "../pages/common/CourseDash";
import DashBoard from "../pages/common/Dashboard";
import Profile from "../pages/common/Profile";
import Courses from "../pages/Courses";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CourseDetails from "../pages/student/CourseDetails";
import StripeWrapper from "../pages/student/StripeWrapper";
import AddCourse from "../pages/teacher/AddCourse";
import CourseSummery from "../pages/teacher/CourseSummery";
import PrivateRoute from "./PrivateRoute";

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
        path: "/become-teacher",
        element: <PrivateRoute> <BeTeacher /> </PrivateRoute>,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <CourseDetails />,
      },
      {
        path: "/payment/:id",
        element: <StripeWrapper />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "courses",
            element: <CourseDash />,
          },
          {
            path: "courses/add",
            element: <AddCourse />,
          },
          {
            path: "courses/:courseId",
            element: <CourseSummery />,
          },

          {
            path: "teachers",
            element: <ManageTeachers />,
          },
          {
            path: "users",
            element: <ManageUsers />,
          },
        ],
      },
    ],
  },
]);

export default router;
