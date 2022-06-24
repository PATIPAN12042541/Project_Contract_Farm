import express from "express";
import {
  PostHistoryPlant,
  getDataPlant,
} from "../controllers/GetHistoryPlant.js";

const router = express.Router();
router.post("/plant", PostHistoryPlant);
router.get("/getDataPlant/:id", getDataPlant);

export default router;
