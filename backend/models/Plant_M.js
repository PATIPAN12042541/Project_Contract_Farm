import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import PlantDetail from "../models/PlantDetail_M.js";

const { DataTypes } = Sequelize;
const Plant = db.define("plant", {});


(async () => {
  await db.sync();
})();

export default Plant;
