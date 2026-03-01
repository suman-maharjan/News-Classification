import axios, { AxiosInstance } from "axios";
import celeryClient from "../../config/celery";
import {
  CELERY_TASK_CLASSIFY,
  CELERY_TASK_CLASSIFY_NAIVE_BAYES,
  CELERY_TASK_PROBABILITY,
} from "../../constants/envConstants";
import { NewsClassifySchemaType, NewsCreateSchemaType } from "./newsSchema";
import NewsModel from "./news.model";
import { ApiError } from "../../utils/ApiError";

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, any>;
  search?: string;
}

class NewsService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.FLASK_ENDPOINT + ":" + process.env.FLASK_PORT,
      timeout: parseInt(process.env.FLASK_TIMEOUT),
    });
  }

  async create(payload: NewsCreateSchemaType) {
    await NewsModel.create(payload);
  }

  async all(params: PaginationParams) {
    const {
      page = 1,
      limit = 20,
      sortBy = "publishedAt",
      sortOrder = "desc",
      filters = {},
      search,
    } = params;
    const validPage = Math.max(1, Number(page));
    const validLimit = Math.min(Number(limit), 100);
    const skip = (validPage - 1) * validLimit;

    const query = { ...filters };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    // const sortObject = {};

    const sortObject = {
      [sortBy]: sortOrder === "desc" ? -1 : 1,
      _id: -1,
    } as any;

    try {
      const [data, total] = await Promise.all([
        await NewsModel.find(query)
          .sort(sortObject)
          .skip(skip)
          .limit(validLimit)
          .select("-__v")
          .lean(),
        NewsModel.countDocuments(query),
      ]);
      const totalPages = Math.ceil(total / validLimit);
      return {
        success: true,
        data,
        pagination: {
          page: validPage,
          limit: validLimit,
          total,
          totalPages,
          hasNextPage: validPage < totalPages,
          hasPrevPage: validPage > 1,
          startIndex: skip + 1,
          endIndex: Math.min(skip + validLimit, total),
        },
      };
    } catch (error) {
      throw new ApiError(400, "Error Fetching news", error);
    }
  }

  async getById(id: string) {
    const result = await NewsModel.findOne({ _id: id });
    return result;
  }

  async editById(id: string, payload: NewsCreateSchemaType) {
    const news = await NewsModel.findOne({ _id: id });
    if (!news) {
      throw new ApiError(404, "News not Found");
    }
    const result = await NewsModel.findOneAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true }
    );
    return result;
  }

  async deleteById(id: string) {
    const result = await NewsModel.findOneAndDelete({ _id: id });
    return result;
  }

  // async classify(payload: NewsClassifySchemaType) {
  //   try {
  //     const { news, type } = payload;
  //     let response;
  //     if (type && type === "Probability") {
  //       response = await this.axiosInstance.post("/classify-probability", {
  //         news,
  //       });
  //     } else {
  //       response = await this.axiosInstance.post("/classify", { news });
  //     }
  //     const result = response.data;
  //     return result;
  //   } catch (error) {
  //     console.error("Request failed:", error.message || error);
  //     if (error.response) {
  //     } else if (error.request) {
  //       console.log("Request was sent but no response received");
  //     } else {
  //       console.log("Error setting up request:", error.message);
  //     }
  //   }
  // }

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
    const resposne = { ...result, algorithm: type, input: news };
    return resposne;
  }
}

export default new NewsService();
