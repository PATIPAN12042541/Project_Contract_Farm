import express from "express";
import {getMenusRoleMain} from "../controllers/Menus.js";

const router = express.Router();
router.get('/', getMenusRoleMain);

export default router;