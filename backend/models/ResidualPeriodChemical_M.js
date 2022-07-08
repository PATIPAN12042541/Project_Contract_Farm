import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const PlantDetail = db.define(
  "residual_period_chemical",
  {
    time: {
      type: DataTypes.INTEGER,
    },
    unit: {
      type: DataTypes.STRING,
    },
    status: {
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

export default PlantDetail;
