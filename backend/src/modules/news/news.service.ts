import axios, { AxiosInstance } from "axios";
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
  }
}

export default new NewsService();
