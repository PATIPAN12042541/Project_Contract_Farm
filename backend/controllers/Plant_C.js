import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  try {
    Plant.hasMany(PlantDetail.id_plant);
    PlantDetail.belongsTo(Plant);

    const plant = await Plant.findAll({ include: PlantDetail });
    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
