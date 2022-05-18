import express from "express";
import { getChemical, 
         getSelect ,
         createChemical} from "../controllers/GetChemical.js";

const router = express.Router();

router.get("/", getChemical);
router.get("/Select/:id", getSelect);
router.post("/createChemical", createChemical);

export default router;
