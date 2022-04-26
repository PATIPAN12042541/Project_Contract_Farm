import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const Plant = db.define(
    "plant",
    {
      id_plant: {
        type: DataTypes.INTEGER,
        foreignKey: true,
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
      timestamps: false,
      freezeTableName: true,
    }
  ),
  PlantDetail = db.define(
    "plant_detail",
    {
      id_plant: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
      timestamps: false,
      freezeTableName: true,
    }
  );

Plant.belongsTo(PlantDetail, { foreignKey: "id_plant" });

(async () => {
  await db.sync();
})();

export default Plant;
