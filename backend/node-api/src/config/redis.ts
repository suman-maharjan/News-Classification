import { createClient } from "redis";
import {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USERNAME,
} from "../constants/envConstants";

const redisConfig = {
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
};

const redisClient = createClient(redisConfig);

export const initRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connected");
  } catch (err) {
    console.log("Failed to connect redis");
  }
};

export default redisClient;
