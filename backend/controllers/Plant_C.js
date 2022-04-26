import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  try {
    PlantDetail.hasOne(Plant);
    Plant.belongsTo(PlantDetail);

    const plant = await PlantDetail.findAll({ include: Plant });
    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
