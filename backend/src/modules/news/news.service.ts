import axios, { AxiosInstance } from "axios";
import celeryClient from "../../config/celery";
import {
  CELERY_TASK_CLASSIFY,
  CELERY_TASK_CLASSIFY_NAIVE_BAYES,
  CELERY_TASK_PROBABILITY,
} from "../../constants/envConstants";
import { NewsClassifySchemaType } from "./newsSchema";

class NewsService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.FLASK_ENDPOINT + ":" + process.env.FLASK_PORT,
      timeout: parseInt(process.env.FLASK_TIMEOUT),
    });
  }
  async classify(payload: NewsClassifySchemaType) {
    try {
      const { news, type } = payload;
      let response;
      if (type && type === "Probability") {
        response = await this.axiosInstance.post("/classify-probability", {
          news,
        });
      } else {
        response = await this.axiosInstance.post("/classify", { news });
      }
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Request failed:", error.message || error);
      if (error.response) {
      } else if (error.request) {
        console.log("Request was sent but no response received");
      } else {
        console.log("Error setting up request:", error.message);
      }
    }
  }

  // async addToJobQueue(payload: NewsClassifySchemaType) {
  //   const { news, type } = payload;
  //   newsQueue.add({ news, type });
  // }

  async classifyUsingWorker(payload: NewsClassifySchemaType) {
    const { news, type } = payload;

    const taskMap: Record<string, any> = {
      SVM_Model: celeryClient.createTask(CELERY_TASK_CLASSIFY),
      SVM_Probability: celeryClient.createTask(CELERY_TASK_PROBABILITY),
      Naive_Bayes: celeryClient.createTask(CELERY_TASK_CLASSIFY_NAIVE_BAYES),
    };

    const task = taskMap[type];

    if (!task) {
      throw new Error(`Unsupported classification type: ${type}`);
    }
    const asyncResult = task.applyAsync({ args: [news], kwargs: {} });
    const result = await asyncResult.get();
    asyncResult.delete();
    const resposne = { ...result, algorithm: type };
    return resposne;
  }
}

export default new NewsService();
