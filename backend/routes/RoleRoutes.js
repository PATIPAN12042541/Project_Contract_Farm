import express from "express";
import {getRole} from "../controllers/RoleGroups.js";

const router = express.Router();
router.get('/register', getRole);

export default router;