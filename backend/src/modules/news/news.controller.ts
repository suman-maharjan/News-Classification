import axios, { AxiosInstance } from "axios";
import { NewsClassifySchemaType } from "./newsSchema";
import { Response } from "express";

class NewsController {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.FLASK_ENDPOINT + ":" + process.env.FLASK_PORT,
      timeout: parseInt(process.env.FLASK_TIMEOUT),
    });
  }

  async classify(payload: NewsClassifySchemaType, res: Response) {
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
    res.status(200).json({ data: result, message: "success" });
  }
}
export const newsController = new NewsController();
