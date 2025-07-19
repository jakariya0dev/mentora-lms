import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const useAxiosSecure = () => {
  const { user, userLogout } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error.status;
      if (status === 403) {
        navigate("/unauthorized");
      } else if (status === 401) {
        userLogout()
          .then(() => {
            navigate("/login");
          })
          .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

// import axios from "axios";
// import { useNavigate } from "react-router";
// import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
// });

// export default function useAxiosSecure() {
//   const { user, userLogout } = useAuth();
//   const navigate = useNavigate();

//   // Add a request interceptor
//   axios.interceptors.request.use(
//     function (config) {
//       config.headers.authorization = `Bearer ${user?.accessToken}`;
//       return config;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );

//   // Add a response interceptor
//   axios.interceptors.response.use(
//     function (response) {
//       return response;
//     },
//     function (error) {
//       if (error.response.status === 403) {
//         navigate("/login");
//       } else if (error.response.status === 401) {
//         userLogout()
//           .then(() => navigate("/login"))
//           .catch((err) => console.log(err));
//       }
//       return Promise.reject(error);
//     }
//   );
//   return axiosSecure;
// }
