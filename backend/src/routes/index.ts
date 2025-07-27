import express from "express";
import { apiRouter } from "./routes.api";
import { apiRouterV2 } from "./routesv2.api";

const router = express.Router();

router.use("/api/v1", apiRouter);
router.use("/api/v2", apiRouterV2);

export const indexRouter = router;
