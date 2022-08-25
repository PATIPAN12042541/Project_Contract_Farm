import express from "express";
import {
  getUsersByDev
} from "../controllers/GroupUserView";


const router = express.Router();

router.get("/",getUsersByDev);

export default router;