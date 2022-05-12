import express from "express";
import {createTypeChemical} from "../controllers/TypeChemicals.js"

const router = express.Router();

router.post("/addTypeChemical", createTypeChemical);

export default router;