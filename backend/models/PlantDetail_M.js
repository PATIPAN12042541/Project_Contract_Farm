import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const PlantDetail = db.define(
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
    timestamps: true,
    classMethods: {
      associate: function (models) {
        PlantDetail.hasMany(models.Plant, {
          as: "plant_detail",
          foreignKey: "	id_plant",
        });
      },
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
