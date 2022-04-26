import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

export const getPlant = async (req, res) => {
  //const plant = await Plant.findAll({ include: PlantDetail });
  // const [results, metadata] = await Sequelize.query(
  //   "select * from plant left join plant_detail on plant.id_plant = plant_detail.id"
  // );
  // "select * from plant left join plant_detail on plant.id_plant = plant_detail.id",

  //const plant = await db.query("select * from plant");
  try {
    const data = {};
    data.PlantDetail.hasMany(data.Plant, {
      foreignKey: "id_plants",
    });

    data.Plant.belongsTo(data.PlantDetail, { foreignKey: "id_plant" });

    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};
