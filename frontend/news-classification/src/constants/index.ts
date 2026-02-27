export const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

const API_VERSION = "/api/v1";

export const URLS = {
  AUTH: API_VERSION + "/auth",
  NEWS: API_VERSION + "/news",
  CONVERSATION: API_VERSION + "/conversation",
};
