import db from "../config/Database.js";
import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";
import PlantDataDetail from "../models/PlantDataDetail_M.js";

export const getPlant = async (req, res) => {
  try {
    const plants = await db.query(
      //"select * from plant left join plant_detail on plant.id_plant = plant_detail.id",
      "select plant.id as plant_id," +
        "       plant.id_plant as id_plant," +
        "       plant.name_plant as name_plant," +
        "       plant.start_date_plant as start_date_plant," +
        "       plant.end_date_plant as end_date_plant," +
        "       plant.plant_image as plant_image," +
        "       plant_detail.id as plant_detail_id," +
        "       plant_detail.id_name_plant as plant_detail_id_name_plant " +
        "       from plant left join plant_detail on plant.id_plant = plant_detail.id",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(plants);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const postDetailPlant = async (req, res) => {
  const {
    id_name_plant,
    name_plant,
    start_date_plant,
    end_date_plant,
    image_url,
  } = req.body;

  try {
    await PlantDetail.create({
      id_name_plant: id_name_plant,
      quantity_chemical: 0,
      unit: "",
      note: "",
      last_update: Date().toLocaleString(),
    });

    const IdPlant = await db.query(
      "select id,id_name_plant from plant_detail where id_name_plant = :id_name_plant ",
      {
        replacements: { id_name_plant: id_name_plant },
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

export const getDataImagePlant = async (req, res) => {
  try {
    const imageplants = await db.query(
      "  SELECT plant_detail.id," +
        "         plant_detail.id_name_plant," +
        "         plant.name_plant," +
        "         plant.start_date_plant," +
        "         plant.end_date_plant," +
        "         plant.plant_image," +
        "         plant_data_detail.id AS 'id_data_detail'," +
        "         plant_data_detail.name_chemical," +
        "         plant_data_detail.quantity_chemical," +
        "         plant_data_detail.unit," +
        "         plant_data_detail.note," +
        "         image_plant_detail.path_image " +
        "FROM plant_data_detail " +
        "LEFT JOIN image_plant_detail ON image_plant_detail.id_plant = plant_data_detail.id " +
        "LEFT JOIN plant_detail ON plant_detail.id = plant_data_detail.id_plant " +
        "LEFT JOIN plant ON plant.id_plant = plant_detail.id " +
        "WHERE plant_detail.id =  :id_plant",
      {
        replacements: { id_plant: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(imageplants);
  } catch (error) {
    res.json({ message: error.message + id_plant });
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
    const { data } = req.body;

    try {
      await PlantDataDetail.create({
        id_plant: req.params.id,
        name_chemical: name_chemical,
        quantity_chemical: quantity_chemical,
        unit: unit,
        note: note,
      });
      res.json({ msg: "Registration Successful" });
    } catch (error) {
      res.json({
        message: error.messag + " id " + req.params.id + " data " + data,
      });
    }
};