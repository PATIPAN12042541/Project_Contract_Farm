import express from "express";
import {
    getViewUsersByDev
  } from "../controllers/GroupUserView.js";

const router = express.Router();

router.get("/", getViewUsersByDev);

export default router;