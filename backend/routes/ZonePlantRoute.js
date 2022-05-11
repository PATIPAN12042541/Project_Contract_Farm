import express from "express";
import { GetZonePlant, getDataPlant } from "../controllers/GetZonePlant.js";

const router = express.Router();

router.get("/", GetZonePlant);
router.get("/plant/:id", getDataPlant);


export default router;
