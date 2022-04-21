import express from "express";
import db from "./config/database.js";
import RoleRoutes from "./routes/RoleRoutes.js";
import cors from "cors";
 
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
 
app.listen(4000, () => console.log('Server running at port 4000'));