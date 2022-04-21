import express from "express";
import {getRole} from "../controllers/RoleGroups.js";

const router = express.Router();
router.get('/', getRole);

export default router;