import express from "express";
import {
  getChemical,
  getChemicalMaster,
  getSelect,
  createChemical,
  getChemicalByID,
  updateChemical,
  getExpired,
  deleteChemical2,
  ManageChemical,
  DeleteChemical,
  UpdateChangeStatus,
  getChemicalMaster2,
  getFertilizer,
  getFertilizerSelect,
  getFertilizerUnit,
  postFertilizer,
  getFertilizerData,
  deleteFertilizer,
  updateFertilizerData,
  FertilizerDataDetail,
  updateFertilizerStauts,
  PostFertilizerUnit,
  DeleteFertilizerUnit,
} from "../controllers/GetChemical.js";

const router = express.Router();

router.get("/", getChemical);
router.get("/Fertilizer", getFertilizer);
router.get("/Fertilizer2/:id", getFertilizerSelect);
router.get("/FertilizerUnit", getFertilizerUnit);
router.post("/PostFertilizer/:id", postFertilizer);
router.delete("/DeleteFertilizer/:id", deleteFertilizer);
router.get("/FertilizerData/:id", getFertilizerData);
router.patch("/update/FertilizerData/:id", updateFertilizerData);
router.get("/master", getChemicalMaster);
router.get("/master2", getChemicalMaster2);
router.get("/Select/:id", getSelect);
router.get("/getExpired", getExpired);
router.post("/ManageChemical/:id", ManageChemical);
router.delete("/DeleteChemical/:id", DeleteChemical);
router.post("/createChemical", createChemical);
router.get("/getChemicalID/:id", getChemicalByID);
router.patch("/updateChemical/:id", updateChemical);
router.delete("/deleteChemical2/:id", deleteChemical2);
router.patch("/updateChangeStatus/:id", UpdateChangeStatus);
router.get("/FertilizerData/Detail/:id", FertilizerDataDetail);
router.patch("/updateChangeStatus/Fertilizer/:id", updateFertilizerStauts);
router.post("/PostFertilizerUnit", PostFertilizerUnit);
router.delete("/DeleteFertilizerUnit/:id", DeleteFertilizerUnit);


export default router;
