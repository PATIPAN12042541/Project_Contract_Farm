import Plant from "../models/Plant_M.js";

export const getPlant = async (req, res) => {
  try {
    const plant = await Plant.findAll({ include: PlantDetail });
    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
