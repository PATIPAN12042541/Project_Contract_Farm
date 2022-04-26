import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

export const Plant = db.define(
  "plant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
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
  }
);

(async () => {
  await db.sync();
})();

