import { URLS } from "@/constants";
import instance from "../api";
import { ClassifyNewsI } from "../types/messageTypes";

export const classifyNewsApi = async (payload: ClassifyNewsI) => {
  const response = await instance.post(`${URLS.NEWS}/classify`, payload);
  return response.data;
};
