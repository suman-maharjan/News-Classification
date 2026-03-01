import express from "express";
import { apiRouter } from "./routes.api";

const router = express.Router();

router.use("/api/v1", apiRouter);

export const indexRouter = router;
