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
  TimeChemical,
  updateStatusTime,
  insertTimeChemical,
  deleteTimeChemical,
  CreateReportDefect,
  UpdateReportDefect,
  ReportDefect,
  ReportDefectData,
} from "../controllers/GetChemical.js";

const router = express.Router();

/*--------- Get Data ----------*/
router.get("/", getChemical);
router.get("/Fertilizer", getFertilizer);
router.get("/Fertilizer2/:id", getFertilizerSelect);
router.get("/FertilizerUnit", getFertilizerUnit);
router.get("/getReportDefect/:id", ReportDefect);
router.get("/ReportDefectData", ReportDefectData);
router.get("/FertilizerData/:id", getFertilizerData);
router.get("/master", getChemicalMaster);
router.get("/master2", getChemicalMaster2);
router.get("/Select/:id", getSelect);
router.get("/getExpired", getExpired);
router.get("/getChemicalID/:id", getChemicalByID);
router.get("/FertilizerData/Detail/:id", FertilizerDataDetail);
router.get("/TimeChemical", TimeChemical);

/*--------- Post Data ----------*/
router.post("/PostFertilizer/:id", postFertilizer);
router.post("/ManageChemical/:id", ManageChemical);
router.post("/createChemical", createChemical);
router.post("/PostFertilizerUnit", PostFertilizerUnit);
router.post("/TimeChemical/insertTimeChemical", insertTimeChemical);
router.post("/CreateReportDefect/:id", CreateReportDefect);

/*--------- Update Data ----------*/
router.patch("/update/FertilizerData/:id", updateFertilizerData);
router.patch("/updateChemical/:id", updateChemical);
router.patch("/updateChangeStatus/:id", UpdateChangeStatus);
router.patch("/updateChangeStatus/Fertilizer/:id", updateFertilizerStauts);
router.patch("/TimeChemical/updateStatus/:id", updateStatusTime);
router.patch("/UpdateReportDefect/:id", UpdateReportDefect);

/*--------- Delete Data ----------*/
router.delete("/DeleteFertilizer/:id", deleteFertilizer);
router.delete("/DeleteChemical/:id", DeleteChemical);
router.delete("/deleteChemical2/:id", deleteChemical2);
router.delete("/DeleteFertilizerUnit/:id", DeleteFertilizerUnit);
router.delete("/TimeChemical/deleteTimeChemical/:id", deleteTimeChemical);

export default router;
