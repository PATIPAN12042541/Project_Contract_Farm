import express from "express";
import { getChemical, getSelect } from "../controllers/GetChemical.js";

const router = express.Router();

router.get("/", getChemical);
router.get("/Select/:id", getSelect);

export default router;
