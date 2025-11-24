export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const API_VERSION = "/api/v1";

export const URLS = {
  AUTH: API_VERSION + "/auth",
  NEWS: API_VERSION + "/news",
  CONVERSATION: API_VERSION + "/conversation",
  subscriber: API_VERSION + "/subscriber",
  COMMENT: API_VERSION + "/comment",
};
