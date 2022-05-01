import express from "express";
import {getMenusRoleMain,
       getMenusRoleSubLV1
       } from "../controllers/Menus.js";

const router = express.Router();
router.get('/main/:id', getMenusRoleMain);
router.get('/sublv1/:id', getMenusRoleSubLV1);

export default router;