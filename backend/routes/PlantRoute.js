import express from "express";
import {
  getPlant,
  postDetailPlant,
  DeletePlant,
  getDataImagePlant,
} from "../controllers/GetPlant.js";

const router = express.Router();

router.get("/", getPlant);
router.post("/DetailPlant", postDetailPlant);
router.delete("/DeletePlant/:id", DeletePlant);
router.delete("/Data_detail/:id", getDataImagePlant);

export default router;
