import { Request, Response } from "express";
import { sendApiResponse } from "../../utils/ApiResponse";
import { validateZod } from "../../utils/validationHandler";
import { accessTokenSchema } from "../base/base.schema";
import { analysisService } from "./analysis.service";

class AnalysisController {
  async getAnalysis(req: Request, res: Response) {
    const validationResult = validateZod(accessTokenSchema, req.headers);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    validationResult.page = page;
    validationResult.limit = limit;
    const result = await analysisService.findByAccessToken(validationResult);

    return sendApiResponse(res, 200, result, "success");
  }
}
export const analysisController = new AnalysisController();
