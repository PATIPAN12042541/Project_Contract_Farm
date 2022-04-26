import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {

  /*Plant.hasOne(PlantDetail);
  PlantDetail.belongsTo(Plant, { foreignKey: "id_plant" });*/

  try {
    //const plant = await Plant.findAll({ subQuery: false,include: PlantDetail });

    const { QueryTypes } = require('sequelize');
    await sequelize.query(
      'SELECT * FROM plant',
      {
        replacements: ['active'],
        type: QueryTypes.SELECT
      }
    );

    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
