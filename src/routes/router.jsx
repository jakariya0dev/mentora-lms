import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";
import ManageTeachers from "../pages/admin/ManageTeachers";
import ManageUsers from "../pages/admin/ManageUsers";
import BeTeacher from "../pages/BeTeacher";
import CourseDash from "../pages/common/CourseDash";
import DashBoard from "../pages/common/Dashboard";
import Profile from "../pages/common/Profile";
import Courses from "../pages/Courses";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";
import CourseAssignments from "../pages/student/CourseAssignments";
import CourseDetails from "../pages/student/CourseDetails";
import StripeWrapper from "../pages/student/StripeWrapper";
import AddCourse from "../pages/teacher/AddCourse";
import CourseSummery from "../pages/teacher/CourseSummery";
import Unauthorized from "../pages/Unauthorized";
import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/courses",
        element: <Courses />,
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
        element: (
          <PrivateRoute>
            <BeTeacher />
          </PrivateRoute>
        ),
      },
      {
        path: "/courses/:id",
        element: (
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <StripeWrapper />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "profile",
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },
          {
            path: "courses",
            element: (
              <PrivateRoute>
                <CourseDash />
              </PrivateRoute>
            ),
          },
          {
            path: "assignments/:courseId",
            element: (
              <RoleBasedRoute allowedRoles={["student"]}>
                <CourseAssignments />
              </RoleBasedRoute>
            ),
          },
          {
            path: "courses/add",
            element: (
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <AddCourse />
              </RoleBasedRoute>
            ),
          },
          {
            path: "courses/:courseId",
            element: (
              <RoleBasedRoute allowedRoles={["teacher", "admin"]}>
                <CourseSummery />
              </RoleBasedRoute>
            ),
          },

          {
            path: "teachers",
            element: (
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageTeachers />
              </RoleBasedRoute>
            ),
          },
          {
            path: "users",
            element: (
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageUsers />
              </RoleBasedRoute>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
]);

export default router;
