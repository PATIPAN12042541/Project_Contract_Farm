/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { BsFillTrashFill } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";
import { AiOutlineFundView } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import "../../../node_modules/@hawk-ui/file-upload/dist/index.min.css";
import FileUpload from "@hawk-ui/file-upload";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import form from "react-bootstrap/Form";
import moment from "moment";

const Edit_data = (props) => {
  /******************** Modal Status *************/
  const [show_status, setShow_status] = useState(false);
  const Close_status = () => setShow_status(false);
  const Show_status = () => setShow_status(true);
  /***********************************************/

  /************** Modal Status *******************/
  const [showEdit, setshowEdit] = useState(false);
  const Close_Edit = () => setshowEdit(false);
  const Show_Edit = () => setshowEdit(true);
  /**********************************************/

  /************** Modal Status *******************/
  const [showComment, setShowComment] = useState(false);

  const Close_Comment = () => setShowComment(false);
  const Show_Comment = () => setShowComment(true);

  /**********************************************/

  /************** Edit Data ********************/
  // const [editName, setEditName] = useState([]);
  // const [editStDate, setEditStDate] = useState([]);
  // const [editEdDate, setEditEdDate] = useState([]);
  // const [editPathImg, setEditPathImg] = useState([]);
  /*********************************************/

  /************** Comment Data ********************/
  const [CommentData, setCommentData] = useState([]);
  const [CommentUpdate, setCommentUpdate] = useState([]);
  const [CommentId, setCommentId] = useState([]);
  /*********************************************/

  const [plantdata, setPlantData] = useState([]);
  const [plantUser, setPlantUser] = useState([]);
  const [idplant, setIdPlant] = useState();
  const [nameplant, setNamePlant] = useState();
  const [startdate, setStartDate] = useState();
  const [enddate, setEndDate] = useState();
  const [userid, setUserId] = useState();
  /***** set edit data *****/

  const [edit_plant_id, setPlantId] = useState();
  const [edit_name_plant, setEditNamePlant] = useState();
  const [edit_start_date_plant, setEditStartDatePlant] = useState();
  const [edit_end_date_plant, setEditEndDatePlant] = useState();
  const [edit_path_img, setEditPathImg] = useState();
  //const [edit_plant_image, setEditPlantImage] = useState();
  /*************************/

  const [image, setImage] = useState({ preview: "", data: "" });
  const [image_name, setImageName] = useState();

  const [editimage, setEditImage] = useState({ preview: "", data: "" });
  const [edit_image_name, setEditImageName] = useState();

  // const [plantimage, setPlantImage] = useState();

  /****** status Plant ******/
  const [getIDStatus, setGetIDStatus] = useState([]);
  const [CicleStatus, setCicleStatus] = useState([]);
  const [StatusPlant, setStatusPlant] = useState([]);
  const [getStatus, setGetStatus] = useState([]);
  const [getIdplant, setGetIdplant] = useState([]);
  /*************************/
  const [plantMaster, setPlantMaster] = useState([]);
  const [getSelect, setGetSelect] = useState([
    {
      id: "",
      plant_name: "",
      plant_name_eng: "",
      plant_img: "",
      status_show: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);

  const [getSelect2, setGetSelect2] = useState([
    {
      id: "",
      plant_name: "",
      plant_name_eng: "",
      plant_img: "",
      status_show: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);

  const getCommnent = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/Comment/${id}`
    );
    setCommentData(response.data);
    Show_Comment();
  };

  const UpdateCommnent = async () => {
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}/getplant/Comment/update/${CommentId}`,
          {
            comment: CommentUpdate == "" ? "-" : CommentUpdate,
          }
        )
        .then(function (response) {
          Close_Comment();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Save OK !",
          });
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: error.response.data.msg,
            text: "Save Error!",
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.msg,
        text: "Save Error!",
      });
    }
  };

  // const editUploadImg = async () => {
  //   let formData = new FormData();
  //   formData.append("file", editimage.data);

  //   await axios
  //     .post(`${process.env.REACT_APP_API_URL}/public/dist/img/`, formData)
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.error(err));
  // };

  const getPlant = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/${props.id}`
    );
    setPlantData(response.data);
    //console.log(response.data);
  };

  const getStatusPlant = async () => {
    const statusplants = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/Status/StatusPlant`
    );
    setStatusPlant(statusplants.data);
  };

  const getPlantUser = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/getUsersByRole`
    );
    setPlantUser(response.data);
  };

  const getPlantMasterDetail = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/plant/getMasterPlant`
    );
    setPlantMaster(response.data);
    //console.log(response.data);
  };

  const deletePlants = async (id) => {
    Swal.fire({
      title: "Are you sure delete?",
      text: "You want delete data !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.REACT_APP_API_URL}/getplant/DeletePlant/${id}`
          );
          getPlant();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: error.response.data.msg,
            text: "error.response.data.msg !",
          });
        }
      }
    });
  };

  const postStatusPlant = async (id, status, circle) => {
    Swal.fire({
      title: "Confirm Update Status?",
      text: "Yes or No",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        History_plant(id, status);

        await axios
          .patch(
            `${process.env.REACT_APP_API_URL}/getplant/UpdateStatusPlant/${id}`,
            {
              status_plant: status,
              status_circle: circle,
            }
          )
          .then(function (response) {
            Close_status();
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Save OK !",
            });
            getPlant();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: error.response.data.msg,
              text: "Save Error!",
            });
          });
      }
    });
  };

  const lastStatus = async (id_delete, Idplant, datastatus, circle) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/getplant/plant/DeleteData/${id_delete}`
      );
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/getplant/update/PlantStatusUpdate/${id_delete}`,
        {
          plant_status: 1,
          harvest_status: 1,
        }
      );
      getPlant();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.msg,
        text: "error.response.data.msg !",
      });
    }

    postStatusPlant(Idplant, datastatus, circle);
  };

  const postPlant = async (e) => {
    if (idplant == "" || startdate == "" || enddate == "") {
      Swal.fire({
        icon: "error",
        title: "????????????????????????????????????????????????????????????????????????",
        text: "Save Error!",
      });
    } else {
      e.preventDefault();
      const autoid = uuidv4();
      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/getplant/DetailPlant`, {
            id_name_plant: idplant,
            id_zone: props.id,
            id_user: userid,
            autoid_check: autoid,
            name_plant: getSelect[0].id,
            start_date_plant: startdate,
            end_date_plant: enddate,
            //image_url: image_name,
          })
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Save OK !",
            });
            getPlant();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: error.response.data.msg,
              text: "Save Error!",
            });
          });

        //uploadImg();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error.response.data.msg,
          text: "Save Error!",
        });
      }
    }
  };

  const updatePlant = async (id) => {
    try {
      await axios
        .patch(`${process.env.REACT_APP_API_URL}/getplant/UpdatePlant/${id}`, {
          name_plant: edit_name_plant,
          start_date_plant: edit_start_date_plant,
          end_date_plant: edit_end_date_plant,
        })
        .then(function (response) {
          // Swal.fire({
          //   icon: "success",
          //   title: "Success",
          //   text: "Save OK !",
          // });
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "????????????????????????????????????",
          });

          getPlant();
          Close_Edit();
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: error.response.data.msg,
            text: "Save Error!",
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.msg,
        text: "Save Error!",
      });
    }
  };

  // status 1
  const getDataPlant = async (id) => {
    const getData = await axios.get(
      `${process.env.REACT_APP_API_URL}/History/getDataPlant/${id}`
    );

    try {
      axios
        .post(`${process.env.REACT_APP_API_URL}/History/plant`, {
          zone_id: getData.data[0].zone_id,
          zone_name: getData.data[0].zone_name,
          zone_image: getData.data[0].image_zone,
          plant_id: getData.data[0].plant_id,
          plant_id_name: getData.data[0].plant_id_name,
          plant_name: getData.data[0].name_plant,
          user_id: getData.data[0].id_user,
          plant_date_start: getData.data[0].start_date_plant,
          plant_date_end: getData.data[0].end_date_plant,
          chemical_id: "",
          residual_period_id: "",
          chemical_cc: "",
          chemical_liter: "",
          chemical_note: "",
          chemical_date_start: moment(new Date()).format("YYYY-MM-DD"),
          chemical_date_end: moment(new Date()).format("YYYY-MM-DD"),
          plant_status: getData.data[0].status_plant,
          plant_circle: getData.data[0].status_circle,
        })
        .then(function (response) {})
        .catch(function (error) {});
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Save Error!",
      });
    }
  };

  // const addStatusPlant = async (id) => {
  //   console.log(id);
  //   try {
  //     axios
  //       .post(
  //         `${process.env.REACT_APP_API_URL}/getplant/status/UpdatePlantStatus`,
  //         {
  //           plant_id_data: id,
  //           plant_status: 1,
  //           harvest_status: 1,
  //         }
  //       )
  //       .then(function (response) {})
  //       .catch(function (error) {});
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire({
  //       icon: "error",
  //       text: "Save Error!",
  //     });
  //   }
  // };

  // status 2
  const getDataPlant2 = async (id) => {
    const fertilizer = await axios.get(
      `${process.env.REACT_APP_API_URL}/History/getDataFertilizer/${id}`
    );

    // console.log(fertilizer);
    const detail_array = [];
    try {
      for (let i = 0; i < fertilizer.data.length; i++) {
        detail_array.push(
          await axios.post(`${process.env.REACT_APP_API_URL}/History/plant`, {
            zone_id: fertilizer.data[i].zone_id,
            zone_name: fertilizer.data[i].zone_name,
            zone_image: fertilizer.data[i].image_zone,
            plant_id: fertilizer.data[i].plant_id,
            plant_id_name: fertilizer.data[i].plant_id_name,
            plant_name: fertilizer.data[i].name_plant,
            user_id: fertilizer.data[i].id_user,
            plant_date_start: fertilizer.data[i].start_date_plant,
            plant_date_end: fertilizer.data[i].end_date_plant,
            chemical_id: fertilizer.data[i].id_name_chemical,
            residual_period_id: "",
            chemical_cc: "",
            chemical_liter: "",
            chemical_note: fertilizer.data[i].note,
            chemical_date_start: fertilizer.data[i].date_start,
            chemical_date_end: fertilizer.data[i].date_end,
            plant_status: fertilizer.data[i].status_plant,
            plant_circle: fertilizer.data[i].status_circle,
          })
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: error,
      });
    }
  };

  const getDataPlant3 = async (id) => {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/History/getDataChemical/${id}`
    );
    //console.log(result.data);
    const detail_array = [];
    try {
      for (let i = 0; i < result.data.length; i++) {
        detail_array.push(
          await axios.post(`${process.env.REACT_APP_API_URL}/History/plant`, {
            zone_id: result.data[i].zone_id,
            zone_name: result.data[i].zone_name,
            zone_image: result.data[i].image_zone,
            plant_id: result.data[i].plant_id,
            plant_id_name: result.data[i].plant_id_name,
            plant_name: result.data[i].name_plant,
            user_id: result.data[i].id_user,
            plant_date_start: result.data[i].start_date_plant,
            plant_date_end: result.data[i].end_date_plant,
            chemical_id: result.data[i].id_name_chemical,
            residual_period_id: result.data[i].id_residual_period,
            chemical_cc: result.data[i].cc,
            chemical_liter: result.data[i].liter,
            chemical_note: result.data[i].note,
            chemical_date_start: result.data[i].date_start,
            chemical_date_end: result.data[i].date_end,
            plant_status: result.data[i].status_plant,
            plant_circle: result.data[i].status_circle,
          })
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: error,
      });
    }
  };

  const History_plant = (id, status) => {
    console.log("id : " + id + " status : " + status);
    let status2 = status - 1;
    if (status2 == "1") {
      getDataPlant(id); // get & post history data
    } else if (status2 == "2") {
      getDataPlant2(id); // get & post ????????????
    } else if (status2 == "3") {
      getDataPlant3(id); // get & post ?????????????????????
    } else if (status2 == "0") {
      getDataPlant(id);
    }
  };

  const getDataSelect = async (id) => {
    if (id !== "------???????????????????????????????????????????????????------") {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/getplant/getDataSelect/${id}`
      );
      setGetSelect(result.data);
    } else {
      setGetSelect([
        {
          id: "",
          plant_name: "",
          plant_name_eng: "",
          plant_img: "",
          status_show: "",
          createdAt: "",
          updatedAt: "",
        },
      ]);
    }
  };

  const getDataSelect2 = async (id) => {
    if (id !== "------???????????????????????????????????????????????????------") {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/getplant/getDataSelect/${id}`
      );
      setGetSelect2(result.data);
      console.log(result.data);
    } else {
      setGetSelect2([
        {
          id: "",
          plant_name: "",
          plant_name_eng: "",
          plant_img: "",
          status_show: "",
          createdAt: "",
          updatedAt: "",
        },
      ]);
    }
  };

  useEffect(() => {
    getPlant();
    getPlantUser();
    getStatusPlant();
    getPlantMasterDetail();
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-12"></div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}
                >
                  <h3 className="card-title">????????????????????????????????????????????????????????????????????????</h3>
                </div>
                <div className="card-body">
                  <div className="col-12">
                    <div className="card card-primary">
                      <div
                        className="card-header"
                        style={{
                          backgroundColor: "#8CC152",
                          color: "#FFFFFF",
                        }}
                      >
                        <h3 className="card-title">?????????????????????????????????????????????????????????????????????</h3>
                      </div>
                      <form onSubmit={postPlant}>
                        {getSelect.map((dataImg, index) => {
                          return (
                            <div className="card-body" key={index}>
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-1">
                                    <center>
                                      <label>????????????</label>
                                    </center>
                                    <input
                                      type="number"
                                      className="form-control form-control-border"
                                      id="exampleInputBorder"
                                      defaultValue={idplant}
                                      placeholder="????????????"
                                      onChange={(e) =>
                                        setIdPlant(e.target.value)
                                      }
                                    ></input>
                                  </div>
                                  <div className="col-3">
                                    <center>
                                      <label>????????????????????????????????????????????????</label>
                                    </center>
                                    <select
                                      className="custom-select form-control-border"
                                      onChange={(e) =>
                                        getDataSelect(e.target.value)
                                      }
                                    >
                                      <option>
                                        ------???????????????????????????????????????????????????------
                                      </option>
                                      {plantMaster.map((data, index) => {
                                        return (
                                          <option key={index} value={data.id}>
                                            {data.plant_name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                  <div className="col-2">
                                    <center>
                                      <label>????????????????????????????????????????????????</label>
                                    </center>
                                    <select
                                      className="custom-select form-control-border"
                                      onChange={(e) =>
                                        setUserId(e.target.value)
                                      }
                                    >
                                      <option>------????????????????????????????????????------</option>
                                      {plantUser.map((user, index) => {
                                        return (
                                          <option key={index} value={user.id}>
                                            {user.name + " " + user.last_name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                  <div className="col-2">
                                    <center>
                                      <label>??????????????????????????????????????????</label>
                                    </center>
                                    <input
                                      type="date"
                                      className="form-control form-control-border"
                                      id="exampleInputBorder"
                                      placeholder="??????????????????????????????????????????"
                                      defaultValue={startdate}
                                      max={enddate}
                                      onChange={(e) =>
                                        setStartDate(e.target.value)
                                      }
                                    ></input>
                                  </div>
                                  <div className="col-2">
                                    <center>
                                      <label>???????????????????????????????????????</label>
                                    </center>
                                    <input
                                      type="date"
                                      className="form-control form-control-border"
                                      id="exampleInputBorder"
                                      placeholder="???????????????????????????????????????"
                                      defaultValue={enddate}
                                      min={startdate}
                                      onChange={(e) =>
                                        setEndDate(e.target.value)
                                      }
                                    ></input>
                                  </div>

                                  <div className="col-2">
                                    <Zoom>
                                      <img
                                        src={
                                          dataImg.plant_img
                                            ? dataImg.plant_img
                                            : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                                        }
                                        className="img-fluid mb-2"
                                        width="100"
                                        height="100"
                                      />
                                    </Zoom>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="card-footer text-right">
                          <button
                            type="submit"
                            className="btn"
                            style={{
                              backgroundColor: "#8CC152",
                              color: "#FFFFFF",
                            }}
                          >
                            ??????????????????
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <table className="table table-bordered table-hover">
                    <thead
                      style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}
                    >
                      <tr>
                        <th>#</th>
                        <th>
                          <center>????????????????????????????????????????????????</center>
                        </th>
                        <th>
                          <center>??????????????????????????????????????????</center>
                        </th>
                        <th>
                          <center>???????????????????????????????????????</center>
                        </th>
                        <th>
                          <center>??????????????????</center>
                        </th>
                        <th>
                          <center>???????????????</center>
                        </th>
                        <th>
                          <center>???????????????/???????????????/????????????????????????</center>
                        </th>
                      </tr>
                    </thead>
                    {plantdata.map((data, index) => (
                      <tbody key={index}>
                        <tr
                          data-widget="expandable-table"
                          aria-expanded="false"
                        >
                          <td
                            onClick={() => {
                              Show_Edit();
                              setPlantId(data.plant_id);
                              setEditNamePlant(data.name_plant_id);
                              setEditStartDatePlant(data.start_date_plant);
                              setEditEndDatePlant(data.end_date_plant);
                              setEditPathImg(data.plant_image);
                            }}
                          >
                            {data.plant_detail_id_name_plant}
                          </td>
                          <td
                            onClick={() => {
                              Show_Edit();
                              setPlantId(data.plant_id);
                              setEditNamePlant(data.name_plant_id);
                              setEditStartDatePlant(data.start_date_plant);
                              setEditEndDatePlant(data.end_date_plant);
                              setEditPathImg(data.plant_image);
                            }}
                          >
                            ????????????{data.name_plant}
                          </td>
                          <td
                            onClick={() => {
                              Show_Edit();
                              setPlantId(data.plant_id);
                              setEditNamePlant(data.name_plant_id);
                              setEditStartDatePlant(data.start_date_plant);
                              setEditEndDatePlant(data.end_date_plant);
                              setEditPathImg(data.plant_image);
                            }}
                          >
                            {data.start_date_plant}
                          </td>
                          <td
                            onClick={() => {
                              Show_Edit();
                              setPlantId(data.plant_id);
                              setEditNamePlant(data.name_plant_id);
                              setEditStartDatePlant(data.start_date_plant);
                              setEditEndDatePlant(data.end_date_plant);
                              setEditPathImg(data.plant_image);
                            }}
                          >
                            {data.end_date_plant}
                          </td>
                          <td>
                            <center>
                              <Zoom>
                                <img
                                  src={data.plant_image}
                                  className="img-fluid mb-2"
                                  alt="white sample"
                                  width="100"
                                  height="100"
                                />
                              </Zoom>
                            </center>
                          </td>
                          <td
                            onClick={() => {
                              Show_Edit();
                              setPlantId(data.plant_id);
                              setEditNamePlant(data.name_plant_id);
                              setEditStartDatePlant(data.start_date_plant);
                              setEditEndDatePlant(data.end_date_plant);
                              setEditPathImg(data.plant_image);
                            }}
                          >
                            <center>{data.status_name}</center>
                          </td>
                          <td>
                            {data.status_plant == "2" ? (
                              <center>
                                <Link
                                  to={{
                                    pathname: `/Manage_fertilizer/${data.id_plant}`,
                                    state: {
                                      id: data.id_plant,
                                    },
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    style={{ color: "#FFFFFF" }}
                                  >
                                    <BsPlusLg />
                                  </button>
                                </Link>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    deletePlants(data.id_plant);
                                  }}
                                >
                                  <BsFillTrashFill />
                                </button>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-warning"
                                  style={{ color: "#fff" }}
                                  onClick={() => {
                                    Show_status();
                                    setCicleStatus(data.status_circle);
                                    setGetIdplant(data.plant_id);
                                    setGetIDStatus(data.status_plant);
                                  }}
                                >
                                  <AiOutlineFundView />
                                </button>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    getCommnent(data.plant_id);
                                  }}
                                >
                                  <BsFillChatSquareDotsFill />
                                </button>
                              </center>
                            ) : data.status_plant == "3" ? (
                              <center>
                                <Link
                                  to={{
                                    pathname: `/Manage_plant/${data.id_plant}`,
                                    state: {
                                      id: data.id_plant,
                                    },
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    style={{ color: "#FFFFFF" }}
                                  >
                                    <BsPlusLg />
                                  </button>
                                </Link>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    deletePlants(data.id_plant);
                                  }}
                                >
                                  <BsFillTrashFill />
                                </button>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-warning"
                                  style={{ color: "#fff" }}
                                  onClick={() => {
                                    Show_status();
                                    setCicleStatus(data.status_circle);
                                    setGetIdplant(data.plant_id);
                                    setGetIDStatus(data.status_plant);
                                  }}
                                >
                                  <AiOutlineFundView />
                                </button>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    getCommnent(data.plant_id);
                                  }}
                                >
                                  <BsFillChatSquareDotsFill />
                                </button>
                              </center>
                            ) : data.status_plant == "4" ? (
                              <center>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  style={{ color: "#FFFFFF" }}
                                  disabled
                                >
                                  <BsPlusLg />
                                </button>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    deletePlants(data.id_plant);
                                  }}
                                >
                                  <BsFillTrashFill />
                                </button>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    getCommnent(data.plant_id);
                                  }}
                                >
                                  <BsFillChatSquareDotsFill />
                                </button>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  onClick={() => {
                                    lastStatus(
                                      data.id_plant,
                                      data.plant_id,
                                      1,
                                      data.status_circle + 1
                                    );
                                  }}
                                >
                                  <BsFillCheckCircleFill />
                                </button>
                              </center>
                            ) : (
                              <center>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  style={{ color: "#FFFFFF" }}
                                  disabled
                                >
                                  <BsPlusLg disabled />
                                </button>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    deletePlants(data.id_plant);
                                  }}
                                >
                                  <BsFillTrashFill />
                                </button>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-warning"
                                  style={{ color: "#fff" }}
                                  onClick={() => {
                                    Show_status();
                                    setCicleStatus(data.status_circle);
                                    setGetIdplant(data.plant_id);
                                    setGetIDStatus(data.status_plant);
                                  }}
                                >
                                  <AiOutlineFundView />
                                </button>
                                <> </>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    getCommnent(data.plant_id);
                                  }}
                                >
                                  <BsFillChatSquareDotsFill />
                                </button>
                              </center>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show_status} onHide={Close_status}>
        <Modal.Header style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}>
          <Modal.Title>???????????????????????????????????????????????????????????????</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="form-group">
            <div className="row">
              <div className="col-sm-12">
                <select
                  className="custom-select form-control-border"
                  onChange={(e) => setGetStatus(e.target.value)}
                  defaultValue={getIDStatus}
                >
                  {StatusPlant.map((status) => {
                    return (
                      <option
                        key={status.id}
                        value={status.id}
                        style={{
                          display: getIDStatus >= status.id ? "none" : "block",
                        }}
                      >
                        {status.status_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={Close_status}>
            Close
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              postStatusPlant(getIdplant, getStatus, CicleStatus);
            }}
          >
            SAVE
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={Close_Edit}>
        <Modal.Header style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}>
          <Modal.Title>???????????????????????????????????????????????????????????????</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {getSelect2.map((data, index) => {
              return (
                <div key={index}>
                  <form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <form.Label>?????????????????????????????????</form.Label>
                    <select
                      className="custom-select form-control-border"
                      defaultValue={edit_name_plant}
                      onChange={(e) => {
                        getDataSelect2(e.target.value);
                        setEditNamePlant(e.target.value);
                      }}
                    >
                      <option>------???????????????????????????????????????????????????------</option>
                      {plantMaster.map((data, index) => {
                        return (
                          <option key={index} value={data.id}>
                            {data.plant_name}
                          </option>
                        );
                      })}
                    </select>
                  </form.Group>
                  <form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <form.Label>??????????????????????????????????????????</form.Label>
                    <form.Control
                      type="date"
                      placeholder="??????????????????????????????????????????"
                      defaultValue={edit_start_date_plant}
                      autoFocus
                      max={edit_end_date_plant}
                      onChange={(e) => setEditStartDatePlant(e.target.value)}
                    />
                  </form.Group>
                  <form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <form.Label>???????????????????????????????????????</form.Label>
                    <form.Control
                      type="date"
                      placeholder="???????????????????????????????????????"
                      defaultValue={edit_end_date_plant}
                      min={edit_start_date_plant}
                      autoFocus
                      onChange={(e) => setEditEndDatePlant(e.target.value)}
                    />
                  </form.Group>
                  <form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <hr></hr>
                    <Row>
                      <Col md>
                        <form.Label>Preview</form.Label>
                        <img
                          src={data.plant_img ? data.plant_img : edit_path_img}
                          className="img-fluid"
                        />
                      </Col>
                    </Row>
                  </form.Group>
                </div>
              );
            })}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={Close_Edit}>
            Close
          </button>
          <button
            className="btn btn-success"
            type="submit"
            onClick={() => {
              updatePlant(edit_plant_id);
            }}
          >
            <BsCheckSquareFill /> ??????????????????
          </button>
        </Modal.Footer>
      </Modal>

      {/* Comment */}
      <Modal show={showComment} onHide={Close_Comment}>
        <Modal.Header style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {CommentData.map((data, index) => (
              <form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                key={index}
              >
                <form.Label>????????????????????????????????????????????? : </form.Label>
                <form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={data.comment}
                  onChange={(e) => {
                    setCommentUpdate(e.target.value);
                    setCommentId(data.id);
                  }}
                />
              </form.Group>
            ))}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={Close_Comment}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={UpdateCommnent}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};;;;

export default Edit_data;
