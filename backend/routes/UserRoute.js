import express from "express";
import {Register,Login,getUsers,Logout,getUsersByRole} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";


const router = express.Router();

router.get('/check_users', verifyToken, getUsers);
router.get('/token', refreshToken);
router.get('/getUsersByRole', getUsersByRole);
router.post('/register', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;