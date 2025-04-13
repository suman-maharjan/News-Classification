import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL!;
const FRONTEND_URL = process.env.FRONTEND_URL!;

const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = Number(process.env.REDIS_PORT);
const CELERY_BROKER_URL = process.env.CELERY_BROKER_URL;
const CELERY_BACKEND = process.env.CELERY_BACKEND;

export {
  PORT,
  DB_URL,
  FRONTEND_URL,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_HOST,
  REDIS_PORT,
  CELERY_BROKER_URL,
  CELERY_BACKEND,
};
