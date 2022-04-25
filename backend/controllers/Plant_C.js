import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  try {
    Plant.hasMany(PlantDetail);
    PlantDetail.belongsTo(Plant);

    const plant = await Plant.findAll({
      where: {
        id: id_plant,
      },
      include: {
        model: PlantDetail,
        attributes: ["id_plant"],
        required: true,
      },
    });
    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
