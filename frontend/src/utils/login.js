import { jwtDecode } from "jwt-decode";
import { getToken } from "./sessions";
import moment from "moment";

export const isLoggedin = () => {
  const token = getToken("access_token");
  if (!token) return false;
  const { exp } = jwtDecode(token);
  const now = moment(new Date().valueOf());
  const expDate = moment.unix(exp);
  if (now > expDate) return false;
  return true;
};
