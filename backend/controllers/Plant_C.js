import PlantDetail from "../models/PlantDetail_M.js";
import Plant from "../models/Plant_M.js";

export const getPlant = async (req, res) => {
  try {
    PlantDetail.hasMany(Plant);
    Plant.belongsTo(PlantDetail);

    const PlantDetail = await PlantDetail.findAll({ include: Plant });
    res.json(PlantDetail);
  } catch (error) {
    res.json({ message: error.message });
  }
};
