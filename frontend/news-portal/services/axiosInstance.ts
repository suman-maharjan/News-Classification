import { BASE_URL } from "@/constants/envConstant";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let message = "Something went wrong";
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        const data = error.response.data as {
          message?: string;
          error?: string;
        };
        if (data.message) {
          message = data.message;
        } else if (data.error) {
          message = data.error;
        } else {
          switch (error.response.status) {
            case 500:
              message = "Internal server error";
              break;
            case 401:
              message = "Unauthorized";
              break;
            case 403:
              message = "Forbidden";
              break;
            case 404:
              message = "Not found";
              break;
            default:
              message = "Something went wrong";
              break;
          }
        }
      }
    } else if (error.request) {
      message = "No response received from server";
    } else {
      message = error.message;
    }

    return Promise.reject({ ...error, message });
  }
);
