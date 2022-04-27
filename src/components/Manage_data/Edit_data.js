import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { BsFillTrashFill } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import "../../../node_modules/@hawk-ui/file-upload/dist/index.min.css";
import FileUpload from "@hawk-ui/file-upload";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Edit_data = () => {
  const [plantdata, setPlantData] = useState([]);
  const [idplant, setIdPlant] = useState();
  const [nameplant, setNamePlant] = useState();
  const [startdate, setStartDate] = useState();
  const [enddate, setEndDate] = useState();
  // const [plantimage, setPlantImage] = useState();

  useEffect(() => {
    getPlant();
  }, []);

  const getPlant = async () => {
    const response = await axios.get(
      "http://node30998-env-3297740.th1.proen.cloud:4000/getplant"
    );
    setPlantData(response.data);
  };

  const postPlant = async (e) => {
    e.preventDefault();
    try {
      
      await axios
        .post(
          "http://node30998-env-3297740.th1.proen.cloud:4000/getplant/DetailPlant",
          {
            id_name_plant: idplant,
          }
        )
        .then(function (response) {
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

      try {
        await axios.post(
          "http://node30998-env-3297740.th1.proen.cloud:4000/getplant/Plant",
          {
            id_plant: idplant,
            name_plant: nameplant,
            start_date_plant: startdate,
            end_date_plant: enddate,
          }
        );
      } catch (err) {
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.msg,
        text: "Save Error!",
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
                  <h3 className="card-title">รายละเอียดข้อมูล</h3>
                </div>
                <div className="card-body">
                  <div className="col-12">
                    <div className="card card-primary">
                      <div
                        className="card-header"
                        style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}
                      >
                        <h3 className="card-title">เพิ่มข้อมูล</h3>
                      </div>
                      <form onSubmit={postPlant}>
                        <div className="card-body">
                          <div className="form-group">
                            <div className="row">
                              <div className="col-1">
                                <center>
                                  <label for="exampleInputBorder">รหัส</label>
                                </center>
                                <input
                                  type="text"
                                  className="form-control form-control-border"
                                  id="exampleInputBorder"
                                  value={idplant}
                                  placeholder="รหัส"
                                  onChange={(e) => setIdPlant(e.target.value)}
                                ></input>
                              </div>
                              <div className="col-5">
                                <center>
                                  <label for="exampleInputBorder">
                                    ชื่อแปลงผัก
                                  </label>
                                </center>
                                <input
                                  type="text"
                                  className="form-control form-control-border"
                                  id="exampleInputBorder"
                                  placeholder="ชื่อแปลงผัก"
                                  value={nameplant}
                                  onChange={(e) => setNamePlant(e.target.value)}
                                ></input>
                              </div>
                              <div className="col-2">
                                <center>
                                  <label for="exampleInputBorder">
                                    วันที่เริ่มต้น
                                  </label>
                                </center>
                                <input
                                  type="date"
                                  className="form-control form-control-border"
                                  id="exampleInputBorder"
                                  placeholder="วันที่เริ่มต้น"
                                  value={startdate}
                                  onChange={(e) => setStartDate(e.target.value)}
                                ></input>
                              </div>
                              <div className="col-2">
                                <center>
                                  <label for="exampleInputBorder">
                                    วันที่สิ้นสุด
                                  </label>
                                </center>
                                <input
                                  type="date"
                                  className="form-control form-control-border"
                                  id="exampleInputBorder"
                                  placeholder="วันที่สิ้นสุด"
                                  value={enddate}
                                  onChange={(e) => setEndDate(e.target.value)}
                                ></input>
                              </div>
                              <div className="col-2">
                                <label for="exampleInputBorder">Upload</label>
                                <FileUpload
                                  btnIcon="fas fa-upload"
                                  multiple
                                  accept="image/*"
                                  onUpload={(file) => {
                                    console.log("query file", file);
                                  }}
                                />
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
                        <th className="col-md-1 col-xl-1">#</th>
                        <th className="col-1">#</th>
                        <th className="col-5">
                          <center>ชื่อแปลงผัก</center>
                        </th>
                        <th className="col-1">
                          <center>วันที่เริ่มต้น</center>
                        </th>
                        <th className="col-1">
                          <center>วันที่สิ้นสุด</center>
                        </th>
                        <th className="col-2">
                          <center>รูปภาพ</center>
                        </th>
                        <th className="col-1">
                          <center>ลบข้อมูล</center>
                        </th>
                      </tr>
                    </thead>
                    {plantdata.map((data, index) => (
                      <tbody key={data.id_plant}>
                        <tr
                          data-widget="expandable-table"
                          aria-expanded="false"
                        >
                          <td className="col-md-1 col-xl-1">{data.id_name_plant}</td>
                          <td>{data.name_plant}</td>
                          <td>{data.start_date_plant}</td>
                          <td>{data.end_date_plant}</td>
                          <td>
                            <center>
                              <Zoom>
                                <img
                                  src={data.plant_image}
                                  class="img-fluid mb-2"
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
                                  pathname: `/Manage_plant/${data.id}`,
                                }}
                              >
                                <button
                                  type="submit"
                                  class="btn btn-warning"
                                  style={{ color: "#FFFFFF" }}
                                >
                                  <BsFillPencilFill />
                                </button>
                              </Link>
                              <> </>
                              <button type="submit" class="btn btn-danger">
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
                                  placeholder="# หมายเลข "
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="ชื่อแปลงผัก"
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="วันที่เริ่มต้น"
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="วันที่สิ้นสุด"
                                />
                              </div>
                              <div className="col-3">
                                <span
                                  className="btn btn-info col fileinput-button dz-clickable"
                                  type="file"
                                >
                                  <i className="fas fa-plus" />
                                  <span> Add files</span>
                                </span>
                              </div>
                              <div className="col-1">
                                <button type="submit" class="btn btn-success">
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
