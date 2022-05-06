import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const ImagePlantDetail = db.define(
  "image_plant_detail",
  {
    id_plant: {
      type: DataTypes.INTEGER,
    },
    path_image: {
      type: DataTypes.STRING,
    },
    last_update: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default ImagePlantDetail;
