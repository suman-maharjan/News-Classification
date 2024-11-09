import {
  IforgotPasswordUser,
  ILoginUser,
  IRegisterUser,
  IVerifyUser,
} from "../types/authTypes";
import { URLS } from "@/constants";
import instance from "../api";

export const loginUserApi = async (loginPayload: ILoginUser) => {
  const response = await instance.post(`${URLS.AUTH}/login`, loginPayload);
  return response.data;
};

export const registerUserApi = async (registerPayload: IRegisterUser) => {
  const response = await instance.post(
    `${URLS.AUTH}/register`,
    registerPayload
  );
  return response.data;
};

export const verifyUserApi = async (verifyPayload: IVerifyUser) => {
  const response = await instance.post(`${URLS.AUTH}/verify`, {
    email: verifyPayload.email,
    token: verifyPayload.token,
  });
  return response.data;
};

export const regenerateEmail = async (email: string) => {
  const response = await instance.post(`${URLS.AUTH}/regenerate`, {
    email,
  });
  return response.data;
};

export const verifyableEmailApi = async (email: string) => {
  const response = await instance.post(`${URLS.AUTH}/verifyable-email`, {
    email,
  });
  return response.data;
};

export const findEmailApi = async (email: string) => {
  const response = await instance.post(
    `${URLS.AUTH}/forgot-password-generator`,
    {
      email,
    }
  );
  return response.data;
};

export const forgotPasswordApi = async (data: IforgotPasswordUser) => {
  const response = await instance.post(`${URLS.AUTH}/forgot-password`, data);
  return response;
};
