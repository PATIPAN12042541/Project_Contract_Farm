import express from "express";
import {
  PostHistoryPlant,
  getDataPlant,
  getDataChemical,
} from "../controllers/GetHistoryPlant.js";

const router = express.Router();
router.post("/plant", PostHistoryPlant);
router.get("/getDataPlant/:id", getDataPlant);
router.get("/getDataChemical/:id", getDataChemical);

export default router;
