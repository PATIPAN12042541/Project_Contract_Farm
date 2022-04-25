import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  try {
    const plant = await Plant.findAll({
      where: {},
      include: [
        {
          model: PlantDetail,
          where: {},
        },
      ],
    });
    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
