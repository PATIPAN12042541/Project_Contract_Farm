import express from "express";
import {getMenusRoleMain,
       getMenusRoleSubLV1
       } from "../controllers/Menus.js";

const router = express.Router();
router.get('/main/:role_id', getMenusRoleMain);
router.get('/sublv1/:role_id', getMenusRoleSubLV1);

export default router;