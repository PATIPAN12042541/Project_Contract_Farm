import express from "express";
import { getChemical } from "../controllers/GetChemical.js";

const router = express.Router();

router.get("/", getChemical);

export default router;
