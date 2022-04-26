import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

export const getPlant = async (req, res) => {
  //const plant = await Plant.findAll({ include: PlantDetail });
  // const [results, metadata] = await Sequelize.query(
  //   "select * from plant left join plant_detail on plant.id_plant = plant_detail.id"
  // );
  // "select * from plant left join plant_detail on plant.id_plant = plant_detail.id",

  //const plant = await db.query("select * from plant");
  try {
    const plants = await db.query(
      "select * from plant left join plant_detail on plant.id_plant = plant_detail.id_plant"
    );

    console.log(JSON.plants(records[0], null, 2));
    res.json(plants);
  } catch (error) {
    res.json({ message: error.message });
  }
};
