import express from "express";
import { GetZonePlant, getPlant } from "../controllers/GetZonePlant.js";

const router = express.Router();

router.get("/", GetZonePlant);
router.get("/plant", getPlant);


export default router;
