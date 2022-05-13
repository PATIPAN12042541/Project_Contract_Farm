import express from "express";
import {
  GetZonePlant,
  getDataPlant,
  postZone,
} from "../controllers/GetZonePlant.js";

const router = express.Router();

router.get("/", GetZonePlant);
router.get("/plant/:id", getDataPlant);
router.post("/postZone", postZone);


export default router;
