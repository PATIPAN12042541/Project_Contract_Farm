import db from "../config/Database.js";
import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";
import PlantDataDetail from "../models/PlantDataDetail_M.js";
import ImagePlantDetail from "../models/ImagePlantDetail_M.js";

export const getPlant = async (req, res) => {
  try {
    const plants = await db.query(
      "select plant.id as plant_id," +
        "  plant.id_plant as id_plant," +
        "  plant.name_plant as name_plant," +
        "  plant.start_date_plant as start_date_plant," +
        "  plant.end_date_plant as end_date_plant," +
        "  plant.plant_image as plant_image," +
        "  plant_detail.id as plant_detail_id," +
        "  plant_detail.id_name_plant as plant_detail_id_name_plant " +
        "from plant " +
        "left join plant_detail on plant.id_plant = plant_detail.id " +
        "left join zone_plant  on plant_detail.id_zone = zone_plant.id " +
        "where zone_plant.id = :zone_plant_id ",
      {
        replacements: { zone_plant_id: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(plants);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getManagePlantEdit = async (req, res) => {
  try {
    const getPlantDetailEdit = await db.query(
      "select  plant_data_detail.id_plant," +
        "        plant_data_detail.id," +
        "        plant_data_detail.name_chemical," +
        "        plant_data_detail.quantity_chemical," +
        "        plant_data_detail.unit," +
        "        plant_data_detail.note," +
        "        image_plant_detail.path_image " +
        "FROM plant_data_detail " +
        "LEFT JOIN image_plant_detail " +
        "ON plant_data_detail.id = image_plant_detail.id_plant " +
        "WHERE plant_data_detail.id_plant = :id_plant ",
      {
        replacements: { id_plant: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(getPlantDetailEdit);
  } catch (eror) {
    res.json({ message: eror.message });
  }
};

export const postDetailPlant = async (req, res) => {
  const {
    id_name_plant,
    id_zone,
    autoid_check,
    name_plant,
    start_date_plant,
    end_date_plant,
    image_url,
  } = req.body;

  try {
    await PlantDetail.create({
      id_name_plant: id_name_plant,
      id_zone: id_zone,
      autoid_check: autoid_check,
      unit: "",
      note: "",
      last_update: Date().toLocaleString(),
    });

    const IdPlant = await db.query(
      "select id,id_name_plant from plant_detail where autoid_check = :autoid_check ",
      {
        replacements: { autoid_check: autoid_check },
        type: db.QueryTypes.SELECT,
      }
    );

    try {
      await Plant.create({
        id_plant: IdPlant[0].id,
        name_plant: name_plant,
        start_date_plant: start_date_plant,
        end_date_plant: end_date_plant,
        plant_image: "../dist/img/" + image_url,
      });
    } catch (error) {
      res.json({ message: error.message });
    }

    res.json({ msg: "Registration Successful" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const DeletePlant = async (req, res) => {
  try {
    await PlantDetail.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Plant Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getPlantUser = async (req, res) => {
  try {
    const plantUser = await db.query("SELECT * FROM user where role_id = 3", {
      type: db.QueryTypes.SELECT,
    });
    res.json(plantUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};




export const getDataImagePlant = async (req, res) => {
  try {
    const imageplants = await db.query(
      "SELECT plant_data_detail.id," +
        "    plant_data_detail.id_plant," +
        "    plant_data_detail.cc," +
        "    plant_data_detail.liter," +
        "    plant_data_detail.note," +
        "    plant_data_detail.date_start," +
        "    plant_data_detail.date_end," +
        "    name_chemical.id as id_name_chemical," +
        "    name_chemical.name_chemical ," +
        "    name_chemical.name_chemical_eng," +
        "    name_chemical.eu_mrl," +
        "    name_chemical.path_img," +
        "    residual_period_chemical.id as id_res_period," +
        "    residual_period_chemical.time," +
        "    residual_period_chemical.unit " +
        "FROM plant_data_detail  " +
        "LEFT JOIN name_chemical ON plant_data_detail.id_name_chemical = name_chemical.id " +
        "LEFT JOIN residual_period_chemical ON plant_data_detail.id_residual_period = residual_period_chemical.id " +
        "WHERE plant_data_detail.id_plant =  :id_plant",
      {
        replacements: { id_plant: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(imageplants);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updatePlant = async (req, res) => {
  try {
    await Plant.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Plant Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const postManagePlant = async (req, res) => {
  const { auto_id, name_chemical, quantity_chemical, unit, note, path_image } =
    req.body;
  try {
    await PlantDataDetail.create({
      id_plant: req.params.id,
      name_chemical: name_chemical,
      quantity_chemical: quantity_chemical,
      unit: unit,
      note: note,
      auto_id: auto_id,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    res.json({ message: error.message });
  }

  const auto = await db.query(
    "select id from plant_data_detail where auto_id = :auto_id ",
    {
      replacements: { auto_id: auto_id },
      type: db.QueryTypes.SELECT,
    }
  );

  try {
    await ImagePlantDetail.create({
      id_plant: auto[0].id,
      path_image: "../dist/img/" + path_image,
      last_update: Date().toLocaleString(),
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const DeleteManagePlant = async (req, res) => {
  try {
    await PlantDataDetail.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Plant Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const UpdateManagePlant = async (req, res) => {
  try {
    await PlantDataDetail.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Detail Updated Saccess",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
