import cors from "cors";
import { FRONTEND_URL } from "../constants/envConstants";

const allowedOrigins = FRONTEND_URL;

export const corsConfig = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  credentials: true,
};

const corsMiddleware = () => {
  return cors(corsConfig);
};

export default corsMiddleware;
