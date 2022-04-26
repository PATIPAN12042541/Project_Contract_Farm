import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  /*PlantDetail.hasMany(Plant);
  PlantDetail.belongsTo(Plant);*/

  PlantDetail.hasMany(Plant);
  //Plant.belongsTo(PlantDetail);

  try {
    /*const plant = await PlantDetail.findAll({
      subQuery: false,
      include: PlantDetail,
    });*/

    //const plant = await Plant.findAll({ include: PlantDetail });
    const QueryTypes = require('sequelize');

    const plant = await sequelize.query("select * from plant", { type: QueryTypes.SELECT });

    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
