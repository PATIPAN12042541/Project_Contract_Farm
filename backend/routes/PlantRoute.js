import express from "express";
import {
  getPlant,
  postDetailPlant,
  DeletePlant,
} from "../controllers/GetPlant.js";

const router = express.Router();

router.get("/", getPlant);
router.post("/DetailPlant", postDetailPlant);
router.post("/DeletePlant", DeletePlant);
export default router;
