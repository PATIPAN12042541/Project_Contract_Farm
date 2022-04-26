import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Plant = db.define(
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
    freezeTableName: true,
    timestamps: false,
  }
);

(async () => {
  await db.sync();
})();

export default Plant;
