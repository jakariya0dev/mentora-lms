import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const useAxiosSecure = () => {
  const { user, userLogout } = useAuth();
  const navigate = useNavigate();

  const requestInterceptorId = useRef(null);
  const responseInterceptorId = useRef(null);

  useEffect(() => {
    // Add request interceptor
    requestInterceptorId.current = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor
    responseInterceptorId.current = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;

        if (status === 403) {
          navigate("/unauthorized");
        } else if (status === 401) {
          userLogout()
            .then(() => {
              // ✅ Eject interceptors when logout
              if (requestInterceptorId.current !== null) {
                axiosSecure.interceptors.request.eject(
                  requestInterceptorId.current
                );
              }
              if (responseInterceptorId.current !== null) {
                axiosSecure.interceptors.response.eject(
                  responseInterceptorId.current
                );
              }
              navigate("/login");
            })
            .catch(() => {});
        }

        return Promise.reject(error);
      }
    );

    // cleanup if component unmounts
    return () => {
      if (requestInterceptorId.current !== null) {
        axiosSecure.interceptors.request.eject(requestInterceptorId.current);
      }
      if (responseInterceptorId.current !== null) {
        axiosSecure.interceptors.response.eject(responseInterceptorId.current);
      }
    };
  }, [user, userLogout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;

