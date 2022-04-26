import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  PlantDetail.hasMany(Plant);
  PlantDetail.belongsTo(Plant);

  Plant.hasMany(Plant, {
    foreignKey: 'id_plant'
  });
  PlantDetail.belongsTo(PlantDetail);

  try {
<<<<<<< HEAD
    const plant = await Plant.findAll({
      subQuery: false,
      include: PlantDetail,
    });
=======
    //const plant = await Plant.findAll({ subQuery: false,include: PlantDetail });

    const plant = await Plant.findAll();

>>>>>>> c979ac27214ea4763586162513aa1eda7c601c2c
    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
