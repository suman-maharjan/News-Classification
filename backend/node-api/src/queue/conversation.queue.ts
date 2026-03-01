import Queue from "bull";
import {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USERNAME,
} from "../constants/envConstants";

const redisQueueConfig = {
  port: REDIS_PORT,
  host: REDIS_HOST,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
};

const conversationQueue = new Queue("ConversationQueue", {
  redis: redisQueueConfig,
});

export { conversationQueue };
