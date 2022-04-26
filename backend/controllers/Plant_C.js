import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";
import { sequelize } from "sequelize";
import db from "../config/Database.js";

export const getPlant = async (req, res) => {
  try {
    /*const plant = await PlantDetail.findAll({
      subQuery: false,
      include: PlantDetail,
    });*/

    //const plant = await Plant.findAll({ include: PlantDetail });
    // const [results, metadata] = await Sequelize.query(
    //   "select * from plant left join plant_detail on plant.id_plant = plant_detail.id"
    // );
    // "select * from plant left join plant_detail on plant.id_plant = plant_detail.id",

    const plant = await db.query("select * from plant");

    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
