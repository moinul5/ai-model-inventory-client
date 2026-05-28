import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { useContext, useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosSecure = () => {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${user?.accessToken}`;
        return config;
      },
    );

    // const responseInterceptor = axiosInstance.interceptors.response.use(
    //   (res) => {
    //     return res;
    //   },
    //   (err) => {
    //     const status = err.status;
    //     if (status === 401 || status === 403) signOut();
    //   },
    // );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      // axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOut]);

  return axiosInstance;
};


export default useAxiosSecure;
