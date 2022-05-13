import express from "express";
import {
  GetZonePlant,
  getDataPlant,
  postZone,
  DeleteZone,
  UpdateZone,
} from "../controllers/GetZonePlant.js";

const router = express.Router();

router.get("/", GetZonePlant);
router.get("/plant/:id", getDataPlant);
router.post("/postZone", postZone);
router.delete("/DeleteZone/:id", DeleteZone);
router.patch("/UpdateZone/:id", UpdateZone);

export default router;
