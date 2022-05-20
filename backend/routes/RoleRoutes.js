import express from "express";
import {getRole,
        getRoleRegister} from "../controllers/RoleGroups.js";

const router = express.Router();
router.get('/', getRole);
router.get('/roleRegister', getRoleRegister);

export default router;