import express from "express";
import {Register,Login,getUsers,Logout} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";


const router = express.Router();

router.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); 
});

router.get('/check_users', verifyToken, getUsers);
router.get('/token', refreshToken);
router.post('/register', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;