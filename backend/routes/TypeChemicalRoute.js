import express from "express";
import {TypeChemicals} from "../controllers/TypeChemicals.js"

const router = express.Router();

router.post("/addTypeChemical", TypeChemicals);

export default router;