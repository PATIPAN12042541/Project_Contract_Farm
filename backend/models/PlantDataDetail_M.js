import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const PlantDataDetail = db.define(
  "plant_data_detail",
  {
    id_plant: {
      type: DataTypes.INTEGER,
    },
    name_chemical: {
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
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default PlantDataDetail;
