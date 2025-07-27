import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { analysisController } from "./analysis.controller";

const router = Router();

router.get("/", asyncHandler(analysisController.getAnalysis));

export const analysisRouter = router;
