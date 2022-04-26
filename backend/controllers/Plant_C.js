import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  try {
    //PlantDetail.belongsToMany(Plant, { foreignKey: "id_plant" });
    Plant.hasMany(PlantDetail);
    PlantDetail.belongsTo(Plant);

    const plant = await Plant.findAll({ include: { model: PlantDetail } });
    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
