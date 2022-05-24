import express from "express";
import {
  getChemical,
  getChemicalMaster,
  getSelect,
  createChemical,
  getChemicalByID,
  updateChemical,
  getExpired,
  deleteChemical,
  ManageChemical,
  DeleteChemical,
  UpdateChangeStatus,
} from "../controllers/GetChemical.js";

const router = express.Router();

router.get("/", getChemical);
router.get("/master", getChemicalMaster);
router.get("/Select/:id", getSelect);
router.get("/getExpired", getExpired);
router.post("/ManageChemical/:id", ManageChemical);
router.delete("/DeleteChemical/:id", DeleteChemical);
router.post("/createChemical", createChemical);
router.get("/getChemicalID/:id", getChemicalByID);
router.patch("/updateChemical/:id", updateChemical);
router.delete("/deleteChemical/:id", deleteChemical);
router.patch("/updateChangeStatus/:id", UpdateChangeStatus);

export default router;
