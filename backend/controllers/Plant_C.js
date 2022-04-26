import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  try {
    
    Plant.hasMany(PlantDetail, { as: "plant_detail" });
    PlantDetail.belongsTo(Plant, {
      foreignKey: "id_plant",
      as: "id_plant",
    });

    const plant = await Plant.findAll({ include: ["plant_detail"] });
    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
