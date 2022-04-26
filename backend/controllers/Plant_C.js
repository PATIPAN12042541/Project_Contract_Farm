import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  /*PlantDetail.hasMany(Plant);
  PlantDetail.belongsTo(Plant);*/

  /*PlantDetail.hasMany(Plant);
  Plant.belongsTo(PlantDetail);*/

  try {
    /*const plant = await PlantDetail.findAll({
      subQuery: false,
      include: PlantDetail,
    });*/

    //const plant = await Plant.findAll({ include: PlantDetail });
    const plant = await PlantDetail.findAll({
                                      include: Plant
                                    }); 

    res.json(plant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
