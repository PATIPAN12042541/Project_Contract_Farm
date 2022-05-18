import express from "express";
import {
  getChemical,
  getSelect,
  createChemical,
  getChemicalByID,
  updateChemical,
  getExpired,
  deleteChemical,
} from "../controllers/GetChemical.js";

const router = express.Router();

router.get("/", getChemical);
router.get("/Select/:id", getSelect);
router.get("/getExpired", getExpired);
router.post("/createChemical", createChemical);
router.get("/getChemicalID/:id",getChemicalByID);
router.patch("/updateChemical/:id",updateChemical);
router.delete("/deleteChemical/:id",deleteChemical);

export default router;
