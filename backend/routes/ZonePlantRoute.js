import express from "express";
import {
  GetZonePlant,
  getDataPlant,
  postZone,
  DeleteZone,
} from "../controllers/GetZonePlant.js";

const router = express.Router();

router.get("/", GetZonePlant);
router.get("/plant/:id", getDataPlant);
router.post("/postZone", postZone);
router.delete("/DeleteZone/:id", DeleteZone);


export default router;
