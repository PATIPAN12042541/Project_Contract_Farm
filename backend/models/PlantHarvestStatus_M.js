import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const PlantHarvestStatus_M = db.define(
  "plant_harvest_status",
  {
    id_plant: {
      type: DataTypes.INTEGER,
    },
    plant_status: {
      type: DataTypes.INTEGER,
    },
    harvest_status: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default PlantHarvestStatus_M;
