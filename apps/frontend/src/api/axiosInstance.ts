import axios from "axios";

import type { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error: AxiosError) => Promise.reject(error.response?.data)
);

export default axiosInstance;
