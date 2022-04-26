import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  Plant.hasMany(PlantDetail);
  PlantDetail.belongsTo(Plant);

  try {
    const plant = await Plant.findAll({ include: PlantDetail });
    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
