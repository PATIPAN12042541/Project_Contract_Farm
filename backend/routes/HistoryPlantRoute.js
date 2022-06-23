import express from "express";
import { getHistoryPlant } from "../controllers/GetHistoryPlant.js";

const router = express.Router();
router.post("/plant", getHistoryPlant);

export default router;
