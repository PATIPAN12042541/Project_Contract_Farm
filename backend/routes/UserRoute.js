import express from "express";
import {
  Register,
  Login,
  getUsers,
  Logout,
  getUsersByRole,
  getCheckId,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/check_users", verifyToken, getUsers);
router.get("/token", refreshToken);
router.get("/getUsersByRole", getUsersByRole);
router.get("/check_same_id/:id", getCheckId);
router.post('/register', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;