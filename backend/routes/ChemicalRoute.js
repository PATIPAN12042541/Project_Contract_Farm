import express from "express";
import { getChemical, 
         getSelect ,
         createChemical,
         getChemicalByID} from "../controllers/GetChemical.js";

const router = express.Router();

router.get("/", getChemical);
router.get("/Select/:id", getSelect);
router.post("/createChemical", createChemical);
router.get("/getChemicalID/:id",getChemicalByID)

export default router;
