import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";
import { Sequelize } from "sequelize";
import db from "../config/Database.js";


export const getPlant = async (req, res) => {

  /*PlantDetail.hasMany(Plant);
  PlantDetail.belongsTo(Plant);*/

  //PlantDetail.hasMany(Plant);
  //Plant.belongsTo(PlantDetail);

  try {
    /*const plant = await PlantDetail.findAll({
      subQuery: false,
      include: PlantDetail,
    });*/

    //const plant = await Plant.findAll({ include: PlantDetail });
<<<<<<< HEAD

    const plant = await Plant.sequelize.query('select * from plant left join plant_detail on plant.id_plant = plant_detail.id');

    //const plant = await db.query('select * from plant left join plant_detail on plant.id_plant = plant_detail.id');
=======
    const plant = await Plant.sequelize.query(
      "select * from plant " +
        "left join plant_detail on plant.id_plant = plant_detail.id"
    );
>>>>>>> 7121e2b7821aea8affd486df306d1b6ca4a55d68

    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
