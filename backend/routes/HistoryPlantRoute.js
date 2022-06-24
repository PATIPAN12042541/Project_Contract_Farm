import express from "express";
import {
  getHistoryPlant,
  getDataPlant,
} from "../controllers/GetHistoryPlant.js";

const router = express.Router();
router.post("/plant", getHistoryPlant);
router.get("/getDataPlant/:id", getDataPlant);

export default router;
