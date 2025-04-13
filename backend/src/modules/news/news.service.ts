import axios, { AxiosInstance } from "axios";
import celeryClient from "../../config/celery";
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
    const classifyTask = celeryClient.createTask("proj.tasks.classify");
    const probabilityTask = celeryClient.createTask("proj.tasks.probability");

    let result;

    if (type && type === "Probability") {
      const asyncResult = probabilityTask.applyAsync({
        args: [news],
        kwargs: {},
      });
      result = await asyncResult.get();
      asyncResult.delete();
    } else {
      const asyncResult = classifyTask.applyAsync({ args: [news], kwargs: {} });
      result = await asyncResult.get();
      asyncResult.delete();
    }
    return result;
  }
}

export default new NewsService();
