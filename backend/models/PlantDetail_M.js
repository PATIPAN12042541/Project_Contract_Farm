import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const PlantDetail = db.define(
  "plant_detail",
  {
    id_plant: {
      type: DataTypes.INTEGER,
      defaultValue: Sequelize.UUIDV1,
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
  }
);

(async () => {
  await db.sync();
})();

export default PlantDetail;
