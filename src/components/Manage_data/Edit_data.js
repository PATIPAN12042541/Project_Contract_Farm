/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { BsFillTrashFill } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import "../../../node_modules/@hawk-ui/file-upload/dist/index.min.css";
import FileUpload from "@hawk-ui/file-upload";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const Edit_data = (props) => {


  const [plantdata, setPlantData] = useState([]);
  const [plantUser, setPlantUser] = useState([]);
  const [idplant, setIdPlant] = useState();
  const [nameplant, setNamePlant] = useState();
  const [startdate, setStartDate] = useState();
  const [enddate, setEndDate] = useState();
  const [userid, setUserId] = useState();
  /***** set edit data *****/
  const [edit_name_plant, setEditNamePlant] = useState();
  const [edit_start_date_plant, setEditStartDatePlant] = useState();
  const [edit_end_date_plant, setEditEndDatePlant] = useState();
  const [edit_plant_image, setEditPlantImage] = useState();
  /*************************/

  const [image, setImage] = useState({ preview: "", data: "" });
  const [image_name, setImageName] = useState();

  const [editimage, setEditImage] = useState({ preview: "", data: "" });
  const [edit_image_name, setEditImageName] = useState();

  // const [plantimage, setPlantImage] = useState();

  useEffect(() => {
    getPlant();
    getPlantUser();
  }, []);

  const uploadImg = async () => {
    let formData = new FormData();
    formData.append("file", image.data);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/public/dist/img/`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  const editUploadImg = async () => {
    let formData = new FormData();
    formData.append("file", editimage.data);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/public/dist/img/`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  const getPlant = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/${props.id}`
    );
    setPlantData(response.data);
  };

  const getPlantUser = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/getUser`
    );
    setPlantUser(response.data);
    console.log(response.data);
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

  const postPlant = async (e) => {
    e.preventDefault();
    const autoid = uuidv4();
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/getplant/DetailPlant`, {
          id_name_plant: idplant,
          id_zone: props.id,
          autoid_check: autoid,
          name_plant: nameplant,
          start_date_plant: startdate,
          end_date_plant: enddate,
          image_url: image_name,
        })
        .then(function (response) {
          getPlant();
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

      uploadImg();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.msg,
        text: "Save Error!",
      });
    }
  };

  const updatePlant = async (id) => {
    try {
      if (edit_image_name === undefined) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/getplant/UpdatePlant/${id}`,
          {
            name_plant: edit_name_plant,
            start_date_plant: edit_start_date_plant,
            end_date_plant: edit_end_date_plant,
          }
        );
      } else {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/getplant/UpdatePlant/${id}`,
          {
            name_plant: edit_name_plant,
            start_date_plant: edit_start_date_plant,
            end_date_plant: edit_end_date_plant,
            plant_image: "../dist/img/" + edit_image_name,
          }
        );

        editUploadImg();
      }
      getPlant();
      Swal.fire("Succes !", "Your file has been Update.", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        text: "Update Error!",
      });
    }
  };

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
                  <h3 className="card-title">จัดการข้อมูลแปลงเพาะปลูก</h3>
                </div>
                <div className="card-body">
                  <div className="col-12">
                    <div className="card card-primary">
                      <div
                        className="card-header"
                        style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}
                      >
                        <h3 className="card-title">เพิ่มข้อมูลแปลงเพาะปลูก</h3>
                      </div>
                      <form onSubmit={postPlant}>
                        <div className="card-body">
                          <div className="form-group">
                            <div className="row">
                              <div className="col-1">
                                <center>
                                  <label>รหัส</label>
                                </center>
                                <input
                                  type="text"
                                  className="form-control form-control-border"
                                  id="exampleInputBorder"
                                  defaultValue={idplant}
                                  placeholder="รหัส"
                                  onChange={(e) => setIdPlant(e.target.value)}
                                ></input>
                              </div>
                              <div className="col-3">
                                <center>
                                  <label>ชื่อแปลงเพาะปลูก</label>
                                </center>
                                <input
                                  type="text"
                                  className="form-control form-control-border"
                                  id="exampleInputBorder"
                                  placeholder="ชื่อแปลงเพาะปลูก"
                                  defaultValue={nameplant}
                                  onChange={(e) => setNamePlant(e.target.value)}
                                ></input>
                              </div>
                              <div className="col-2">
                                <center>
                                  <label>ชื่อผู้รับผิดชอบ</label>
                                </center>
                                <select
                                  className="custom-select form-control-border"
                                  onChange={(e) => setUserId(e.target.value)}
                                >
                                  <option>------ผู้รับผิดชอบ------</option>
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
                                  <label>วันที่เริ่มต้น</label>
                                </center>
                                <input
                                  type="date"
                                  className="form-control form-control-border"
                                  id="exampleInputBorder"
                                  placeholder="วันที่เริ่มต้น"
                                  defaultValue={startdate}
                                  onChange={(e) => setStartDate(e.target.value)}
                                ></input>
                              </div>
                              <div className="col-2">
                                <center>
                                  <label>วันที่สิ้นสุด</label>
                                </center>
                                <input
                                  type="date"
                                  className="form-control form-control-border"
                                  id="exampleInputBorder"
                                  placeholder="วันที่สิ้นสุด"
                                  defaultValue={enddate}
                                  onChange={(e) => setEndDate(e.target.value)}
                                ></input>
                              </div>
                              <div className="col-1">
                                <label>Upload</label>
                                <FileUpload
                                  btnIcon="fas fa-upload"
                                  multiple
                                  accept="image/*"
                                  onUpload={(file) => {
                                    const filesArray = [].slice.call(file);
                                    filesArray.forEach((e) => {
                                      setImageName(e.name);
                                    });

                                    const img = {
                                      preview: URL.createObjectURL(file[0]),
                                      data: file[0],
                                    };
                                    setImage(img);
                                  }}
                                />
                              </div>
                              <div className="col-1">
                                <Zoom>
                                  <img
                                    src={
                                      image.preview
                                        ? image.preview
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
                        <div className="card-footer text-right">
                          <button
                            type="submit"
                            className="btn"
                            style={{
                              backgroundColor: "#8CC152",
                              color: "#FFFFFF",
                            }}
                          >
                            ยืนยัน
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
                          <center>ชื่อแปลงเพาะปลูก</center>
                        </th>
                        <th>
                          <center>วันที่เริ่มต้น</center>
                        </th>
                        <th>
                          <center>วันที่สิ้นสุด</center>
                        </th>
                        <th>
                          <center>รูปภาพ</center>
                        </th>
                        <th>
                          <center>เพิ่ม/แก้ไข/ลบข้อมูล</center>
                        </th>
                      </tr>
                    </thead>
                    {plantdata.map((data, index) => (
                      <tbody key={data.id_plant}>
                        <tr
                          data-widget="expandable-table"
                          aria-expanded="false"
                        >
                          <td>{data.plant_detail_id_name_plant}</td>
                          <td>{data.name_plant}</td>
                          <td>{data.start_date_plant}</td>
                          <td>{data.end_date_plant}</td>
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
                          <td>
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
                              {/* <> </>
                              <Link
                                to={{
                                  pathname: `/Manage_plant_edit/${data.id_plant}`,
                                  state: { id: data.id_plant },
                                }}
                              >
                                <button
                                  type="submit"
                                  className="btn btn-warning"
                                  style={{ color: "#FFFFFF" }}
                                >
                                  <BsFillPencilFill />
                                </button>
                              </Link> */}
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
                            </center>
                          </td>
                        </tr>
                        <tr className="expandable-body d-none">
                          <td colSpan={6}>
                            <div className="row">
                              <div className="col-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  placeholder="# หมายเลข "
                                  defaultValue={data.plant_detail_id_name_plant}
                                />
                              </div>
                              <div className="col-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="ชื่อแปลงผัก"
                                  defaultValue={data.name_plant}
                                  onChange={(e) =>
                                    setEditNamePlant(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="วันที่เริ่มต้น"
                                  defaultValue={data.start_date_plant}
                                  onChange={(e) =>
                                    setEditStartDatePlant(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="วันที่สิ้นสุด"
                                  defaultValue={data.end_date_plant}
                                  onChange={(e) =>
                                    setEditEndDatePlant(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-1">
                                <FileUpload
                                  btnIcon="fas fa-upload"
                                  multiple
                                  accept="image/*"
                                  onUpload={(file) => {
                                    const filesArray = [].slice.call(file);
                                    filesArray.forEach((e) => {
                                      setEditImageName(e.name);
                                    });

                                    const edit_img = {
                                      preview: URL.createObjectURL(file[0]),
                                      data: file[0],
                                    };
                                    setEditImage(edit_img);
                                  }}
                                />
                              </div>
                              <div className="col-1">
                                <Zoom>
                                  <img
                                    src={
                                      editimage.preview
                                        ? editimage.preview
                                        : data.plant_image
                                    }
                                    className="img-fluid mb-2"
                                    width="100"
                                    height="100"
                                  />
                                </Zoom>
                              </div>
                              <div className="col-1">
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  onClick={() => {
                                    updatePlant(data.plant_id);
                                  }}
                                >
                                  <BsCheckSquareFill /> ยืนยัน
                                </button>
                              </div>
                            </div>
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
    </div>
  );
};

export default Edit_data;
