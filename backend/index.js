import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
import RoleRoutes from "./routes/RoleRoutes.js";
import UserRoute from "./routes/UserRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
 
try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
 
app.use(cors());
app.use(express.json());
app.use('/role_group', RoleRoutes);
app.use('/user', UserRoute);
 
app.listen(4000, () => console.log('Server running at port 4000'));