import express from "express";
import {getRole,
        getRoleRegister,
        deleteTypeUser} from "../controllers/RoleGroups.js";

const router = express.Router();
router.get('/', getRole);
router.get('/roleRegister', getRoleRegister);
router.delete('/deleteTypeUser/:id', deleteTypeUser);

export default router;