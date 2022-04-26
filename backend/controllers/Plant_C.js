import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";
import Sequelize from "sequelize";
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
    const [results, metadata] = await Sequelize.query(
      "SELECT * FROM Invoices JOIN Users ON Invoices.userId = Users.id"
    );

    // const { QueryTypes } = require("sequelize");
    // const plant = await Sequelize.query(
    //   "select * from plant left join plant_detail on plant.id_plant = plant_detail.id",
    //   {
    //     type: QueryTypes.SELECT,
    //   }
    // );

    //const plant = await db.query('select * from plant left join plant_detail on plant.id_plant = plant_detail.id');
    // const plant = await db.query("select * from plant");

    // const plant = await db.query(
    //   "SELECT plant.id, " +
    //     "plant.id_plant," +
    //     "plant.name_plant," +
    //     "plant.start_date_plant," +
    //     "plant.end_date_plant," +
    //     "plant.plant_image," +
    //     "plant_detail.id  ," +
    //     "plant_detail.id_name_plant ," +
    //     "plant_detail.quantity_chemical," +
    //     "plant_detail.unit ," +
    //     "plant_detail.note," +
    //     "plant_detail.last_update " +
    //     "FROM plant " +
    //     "LEFT JOIN plant_detail " +
    //     "on plant.id_plant = plant_detail.id"
    // );

    res.json(results);
  } catch (error) {
    res.json({ message: error.message });
  }
};
