import { jwtDecode } from "jwt-decode";
import { getToken } from "./sessions";
import moment from "moment";

export const isLoggedin = () => {
  const token = getToken("access_token");
  if (!token || token === "undefined") return false;

  const { exp } = jwtDecode(token);

  const now = moment(new Date().valueOf());
  const expDate = moment.unix(exp);
  if (now > expDate) return false;
  return true;
};

export const ValidationEnum = {
  LOGIN: "Login",
  REGISTER: "Register",
};
export const validateRegister = ({
  name,
  email,
  password,
  type = ValidationEnum.LOGIN,
}) => {
  if (type == ValidationEnum.REGISTER) {
    if (!name) {
      throw new Error("Name is required");
    }
    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }

    if (!isNaN(name.charAt(0))) {
      throw new Error("Name must start with a letter");
    }

    if (password.length < 6) {
      throw new Error("Password must be atleast 6 characters");
    }
  }
  if (!email || !password) {
    throw new Error("Name, Email and password is required");
  }
  if (!isValidEmail(email) || !isNaN(email.charAt(0))) {
    throw new Error("Invalid Email Format");
  }
};
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for basic email format validation
  return emailRegex.test(email);
};
