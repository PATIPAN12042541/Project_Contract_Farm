import db from "../config/Database.js";
import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";
import PlantDataDetail from "../models/PlantDataDetail_M.js";
import ImagePlantDetail from "../models/ImagePlantDetail_M.js";
import PlantMasterDetail from "../models/PlantMasterDetail_M.js";
import Fertilizer from "../models/FertilizerModel.js";
import PlantHarvestStatus_M from "../models/PlantHarvestStatus_M.js";
import Type_Plant_Master from "../models/TypePlantMasterModel.js";

export const getPlant = async (req, res) => {
  try {
    const plants = await db.query(
      "select plant.id as plant_id," +
        "plant.id_plant as id_plant," +
        "plant_master_detail.id as name_plant_id," +
        "plant.id_user," +
        "CONCAT(user.name,'  ',user.last_name)  as user_name ," +
        "plant_master_detail.plant_name as name_plant," +
        "plant_master_detail.type_plant, " +
        "plant_master_detail.plant_condition, " +
        "plant.start_date_plant as start_date_plant," +
        "plant.end_date_plant as end_date_plant," +
        "plant_master_detail.plant_img as plant_image," +
        "plant.status_plant," +
        "Status_plant.status_name," +
        "plant.status_circle," +
        "plant_detail.id as plant_detail_id," +
        "plant_detail.id_name_plant as plant_detail_id_name_plant " +
        "from plant " +
        "left join plant_detail on plant.id_plant = plant_detail.id " +
        "left join zone_plant  on plant_detail.id_zone = zone_plant.id " +
        "left join Status_plant on plant.status_plant = Status_plant.id " +
        "left join plant_master_detail on plant.name_plant = plant_master_detail.id " +
        "left join user on plant.id_user = user.id " +
        "where zone_plant.id = :zone_plant_id",
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

export const getStatusPlants = async (req, res) => {
  try {
    const statusPlant = await db.query("SELECT * FROM Status_plant", {
      type: db.QueryTypes.SELECT,
    });
    res.json(statusPlant);
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

export const getDataSelect = async (req, res) => {
  try {
    const getSelect = await db.query(
      "SELECT * FROM plant_master_detail " +
        "WHERE status_show = 1  " +
        "AND id = :id ",
      {
        replacements: { id: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(getSelect);
  } catch (eror) {
    res.json({ message: eror.message });
  }
};

export const postDetailPlant = async (req, res) => {
  const {
    id_name_plant,
    id_zone,
    id_user,
    autoid_check,
    name_plant,
    start_date_plant,
    end_date_plant,
    // image_url,
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
        id_user: id_user,
        name_plant: name_plant,
        start_date_plant: start_date_plant,
        end_date_plant: end_date_plant,
        // plant_image: "../dist/img/" + image_url,
        status_plant: 1,
        status_circle: 1,
      });
    } catch (error) {
      res.json({ message: error.message });
    }

    try {
      await PlantHarvestStatus_M.create({
        plant_id_data: IdPlant[0].id,
        plant_status: 1,
        harvest_status: 1,
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
      "SELECT plant_data_detail.id," +
        "    plant_data_detail.id_plant," +
        "    plant_data_detail.cc," +
        "    plant_data_detail.liter," +
        "    plant_data_detail.note," +
        "    plant_data_detail.date_start," +
        "    plant_data_detail.date_end," +
        "    plant_data_detail.	status_check," +
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

export const UpdateStatusPlant = async (req, res) => {
  try {
    await Plant.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Status Updated Saccess",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/***********  Plant Type Master Detail ************/

export const getPlantMasterType = async (req, res) => {
  try {
    const plantMaster = await db.query("SELECT * FROM type_plant_master", {
      type: db.QueryTypes.SELECT,
    });
    res.json(plantMaster);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getPlantMasterTypeUsed = async (req, res) => {
  try {
    const plantMaster = await db.query(
      "SELECT * FROM type_plant_master where status_ = '1' ",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(plantMaster);
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const postPlantMasterType = async (req, res) => {
  const { type_plant_name, status_ } = req.body;
  try {
    await Type_Plant_Master.create({
      type_plant_name: type_plant_name,
      status_: status_,
    });
    res.json({ msg: "Create Successful" });
  } catch (error) {
    res.json(error);
  }
};


export const updatePlantMasterType = async (req, res) => {
  try {
    await Type_Plant_Master.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Updated Saccess",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


/***********  Plant Master Detail ************/

export const getPlantMaster = async (req, res) => {
  try {
    const plantMaster = await db.query(
      "SELECT * FROM plant_master_detail where status_show = 1",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(plantMaster);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getPlantMasterSetup = async (req, res) => {
  try {
    const plantMaster = await db.query("SELECT * FROM plant_master_detail", {
      type: db.QueryTypes.SELECT,
    });
    res.json(plantMaster);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const postPlantMaster = async (req, res) => {
  const {
    plant_name,
    plant_name_eng,
    plant_img,
    status_show,
    type_plant,
    plant_condition,
  } = req.body;
  try {
    await PlantMasterDetail.create({
      plant_name: plant_name,
      plant_name_eng: plant_name_eng,
      plant_img: plant_img,
      status_show: status_show,
      type_plant: type_plant,
      plant_condition: plant_condition,
    });
    res.json({ msg: "Create Successful" });
  } catch (error) {
    res.json(error);
  }
};

export const DeletePlantMaster = async (req, res) => {
  try {
    await PlantMasterDetail.destroy({
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

export const UpdatePlantMaster = async (req, res) => {
  try {
    await PlantMasterDetail.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Status Updated Saccess",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/***************************************************************/

export const DeletePlantData = async (req, res) => {
  try {
    await PlantDataDetail.destroy({
      where: {
        id_plant: req.params.id,
      },
    });
    await Fertilizer.destroy({
      where: {
        id_plant: req.params.id,
      },
    });
    res.json({
      message: "Plant Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/********************** Comment Data ****************************/

export const getCommentData = async (req, res) => {
  try {
    const comment = await db.query("SELECT * FROM plant WHERE id = :id ", {
      replacements: { id: req.params.id },
      type: db.QueryTypes.SELECT,
    });
    res.json(comment);
  } catch (error) {
    res.json({ message: error.message });
  }
};

/********************** Comment Data Update ****************************/

export const getCommentDataUpdate = async (req, res) => {
  try {
    await Plant.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Updated Saccess",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/***************************************************************/

export const UpdatePlantStatus = async (req, res) => {
  try {
    await PlantHarvestStatus_M.update(req.body, {
      where: {
        plant_id_data: req.params.id,
      },
    });

    res.json({
      message: "Updated Saccess",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};