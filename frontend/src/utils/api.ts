import axios from "axios";

import { BASE_URL } from "../constants";

// Create an axios instance
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
// // Request interceptor to set Authorization header dynamically
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Optional: Response interceptor if needed for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
