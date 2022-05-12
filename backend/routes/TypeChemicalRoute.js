import express from "express";
import {createTypeChemical,getAllTypeChemical} from "../controllers/TypeChemicals.js"

const router = express.Router();

router.post("/addTypeChemical", createTypeChemical);
router.get("/getTypeChemical", getAllTypeChemical);

export default router;