import express from "express";
import { getPlant, postPlant } from "../controllers/GetPlant.js";

const router = express.Router();

router.get("/", getPlant);
router.post("/Plant", postPlant);

export default router;
