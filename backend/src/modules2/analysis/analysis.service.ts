import { AppDataSource } from "../../config/datasource";
import { ApiError } from "../../utils/ApiError";
import { userService } from "../user/user.service";
import { TextAnalysis } from "./analysis.entity";
import { TCreateAnalysisSchema, TFindByUserIdSchema } from "./analysis.schema";

class AnalysisService {
  private analysisRepo = AppDataSource.getRepository(TextAnalysis);
  async create(payload: TCreateAnalysisSchema) {
    const { userId, inputText, result } = payload;

    const newAnalysis = this.analysisRepo.create({
      inputText,
      result,
      user: { id: userId },
    });

    await this.analysisRepo.save(newAnalysis);
    return { success: true, data: newAnalysis };
  }

  async findByAccessToken(payload: TFindByUserIdSchema) {
    const { accessToken, page = 1, limit = 10 } = payload;

    const user = await userService.me({ accessToken });

    if (!user) {
      throw new ApiError(404, "Not Found");
    }

    const [analysis, total] = await this.analysisRepo.findAndCount({
      where: {
        user: {
          id: user.id,
        },
      },
      order: {
        id: "DESC",
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: analysis,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
export const analysisService = new AnalysisService();
