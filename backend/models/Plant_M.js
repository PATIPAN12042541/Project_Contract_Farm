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
    timestamps: true,
    classMethods: {
      associate: function (models) {
        Plant.belongsTo(models.PlantDetail, { foreignKey: "	id_plant" });
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
export default Plant;
