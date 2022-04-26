import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Plant from "../models/Plant_M.js";

const { DataTypes } = Sequelize;
const PlantDetail = db.define(
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
    freezeTableName: true,
    timestamps: false,
  }
);

PlantDetail.belongsTo(Plant, { foreignKey: "id_plant" });

(async () => {
  await db.sync();
})();

export default PlantDetail;
