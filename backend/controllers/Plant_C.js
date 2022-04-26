import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  PlantDetail.hasMany(Plant);
  PlantDetail.belongsTo(Plant);

  try {
    const plant = await Plant.findAll({
      subQuery: false,
      include: PlantDetail,
    });
    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
