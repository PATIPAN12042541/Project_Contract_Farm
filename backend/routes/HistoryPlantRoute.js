import express from "express";
import {
  PostHistoryPlant,
  getDataPlant,
  getDataChemical,
  getDataFertilizer,
  getHarvestDetail,
} from "../controllers/GetHistoryPlant.js";

const router = express.Router();

/*--------- Get Data ----------*/
router.get("/getDataPlant/:id", getDataPlant);
router.get("/getDataChemical/:id", getDataChemical);
router.get("/getDataFertilizer/:id", getDataFertilizer);
router.get("/getHarvestDetail", getDataFertilizer);
/*--------- Post Data ----------*/
router.post("/plant", PostHistoryPlant);

export default router;
