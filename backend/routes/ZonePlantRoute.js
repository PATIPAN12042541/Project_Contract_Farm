import express from "express";
import { GetZonePlant } from "../controllers/GetZonePlant.js";

const router = express.Router();

router.get("/", GetZonePlant);

export default router;
