import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  try {
    
    Plant.belongsTo(PlantDetail, {
      foreignKey: {
        name: "Plant_Detail",
        allowNull: false,
      },
      targetKey: "id_plant",
    });

    const query = [{ model: PlantDetail }];

    const plants = await Plant.findAll(query);

    res.json(plants);
  } catch (error) {
    res.json({ message: error.message });
  }
};
