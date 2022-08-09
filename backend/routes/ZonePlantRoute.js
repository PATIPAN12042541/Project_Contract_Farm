import express from "express";
import {
  GetZonePlant,
  GetZonePlantUser,
  getDataPlant,
  postZone,
  DeleteZone,
  UpdateZone,
  getPlantDetail,
} from "../controllers/GetZonePlant.js";

const router = express.Router();

router.get("/", GetZonePlant);
router.get("/user/:id", GetZonePlantUser);
router.get("/plant/:id", getDataPlant);
router.get("/plant_detail/:id", getPlantDetail);
router.post("/postZone", postZone);
router.delete("/DeleteZone/:id", DeleteZone);
router.patch("/UpdateZone/:id", UpdateZone);

export default router;
