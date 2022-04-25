import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const Plant = db.define(
    "plant",
    {
      id_plant: {
        type: DataTypes.INTEGER,
      },
      name_plant: {
        type: DataTypes.STRING,
      },
      start_date_plant: {
        type: DataTypes.DATE,
      },
      end_date_plant: {
        type: DataTypes.DATE,
      },
      plant_image: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  ),
  PlantDetail = db.define(
    "plant_detail",
    {
      id_plant: {
        type: DataTypes.INTEGER,
      },
      id_name_plant: {
        type: DataTypes.STRING,
      },
      quantity_chemical: {
        type: DataTypes.INTEGER,
      },
      unit: {
        type: DataTypes.STRING,
      },
      note: {
        type: DataTypes.STRING,
      },
      last_update: {
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
    }
  );

PlantDetail.belongsTo(Plant);
Plant.hasMany(PlantDetail)(async () => {
  await db.sync();
})();
export default Plant;
