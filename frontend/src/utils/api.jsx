import axios from "axios";

import { BASE_URL } from "../constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access-token"
)
  ? `Bearer ${localStorage.getItem("access-token")}`
  : null;

export default instance;
