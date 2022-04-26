import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {

  /*Plant.hasOne(PlantDetail);
  PlantDetail.belongsTo(Plant, { foreignKey: "id_plant" });*/

  PlantDetail.hasMany(Plant, {
    foreignKey: 'id_plant'
  });
  Plant.belongsTo(PlantDetail);

  try {
    //const plant = await Plant.findAll({ subQuery: false,include: PlantDetail });

    const plant = await Plant.findAll({include: PlantDetail });

    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
