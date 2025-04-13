import * as Celery from "celery-ts";
import { CELERY_BACKEND, CELERY_BROKER_URL } from "../constants/envConstants";

const celeryClient = Celery.createClient({
  brokerUrl: CELERY_BROKER_URL,
  resultBackend: CELERY_BACKEND,
});

export default celeryClient;
