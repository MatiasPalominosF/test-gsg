import { Router } from "express";
import {
  getHistorical,
  getHistoricalById,
} from "../controllers/historical.controller";

const router = Router();

router.get("/api/historical", getHistorical);
router.get("/api/historical/:id", getHistoricalById);

export default router;
