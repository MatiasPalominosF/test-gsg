import { Router } from "express";
import { getSymbolById, getSymbols } from "../controllers/symbols.controller";

const router = Router();

router.get("/api/symbols", getSymbols);
router.get("/api/symbols/:id", getSymbolById);

export default router;
