import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";
import FileUpload from "@hawk-ui/file-upload";
import "../../../node_modules/@hawk-ui/file-upload/dist/index.min.css";
import Zoom from "react-medium-image-zoom";
import axios from "axios";
import Swal from "sweetalert2";

const Manage_plant_edit = (props) => {
  const [managedetail, setManageDetail] = useState([]);

  const getManageDetail = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/ManagePlantEdit/${props.id}`
    );
    setManageDetail(response.data);
  };

  useEffect(() => {
    getManageDetail();
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid"></div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 ">
              <div className="card card-primary">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#8CC152",
                    color: "#FFFFFF",
                  }}
                >
                  <h3 className="card-title">แก้ไขรายรายละเอียดข้อมูล</h3>
                </div>
                <div className="card-body">
                  <div className="col-12">
                    <table className="table table-hover">
                      <thead>
                        <th>#</th>
                        <th>ชื่อสารเคมีที่ใช้</th>
                        <th>ปริมาณสารเคมีที่ใช้</th>
                        <th>หน่วย</th>
                        <th>Note.</th>
                        <th>upload</th>
                        <th>
                          <center>ลบ/เเก้ไขข้อมูล</center>
                        </th>
                      </thead>
                      {managedetail.map((data, index) => (
                        <tbody>
                          <tr
                            data-widget="expandable-table"
                            aria-expanded="false"
                          >
                            <td>{index + 1}</td>
                            <td>{data.name_chemical}</td>
                            <td>{data.quantity_chemical}</td>
                            <td>{data.unit}</td>
                            <td>{data.note}</td>
                            <td>
                              <Zoom>
                                <img
                                  src={data.path_image}
                                  className="img-fluid mb-2"
                                  alt="white sample"
                                  width="50"
                                  height="50"
                                ></img>
                              </Zoom>
                            </td>
                            <td>
                              <center>
                                <button
                                  type="submit"
                                  className="expandable-table-caret btn btn-danger"
                                  style={{ color: "#FFFFFF" }}
                                >
                                  <BsFillTrashFill />
                                </button>
                              </center>
                            </td>
                          </tr>
                          <tr className="expandable-body d-none">
                            <td colSpan={8}>
                              <div className="p-0">
                                <table className="table table-hover">
                                  <tbody>
                                    <tr
                                      data-widget="expandable-table"
                                      aria-expanded="true"
                                    >
                                      <td>
                                        <div className="row">
                                          <div className="col-2">
                                            <input
                                              type="text"
                                              className="form-control"
                                              disabled
                                              placeholder="ชื่อสารเคมีที่ใช้"
                                              defaultValue=""
                                            />
                                          </div>
                                          <div className="col-1">
                                            <input
                                              type="text"
                                              className="form-control"
                                              disabled
                                              placeholder="ปริมาณสารเคมีที่ใช้"
                                              defaultValue=""
                                            />
                                          </div>
                                          <div className="col-1">
                                            <input
                                              type="text"
                                              className="form-control"
                                              disabled
                                              placeholder="หน่วย"
                                              defaultValue=""
                                            />
                                          </div>
                                          <div className="col-2">
                                            <input
                                              type="text"
                                              className="form-control"
                                              disabled
                                              placeholder="note"
                                              defaultValue=""
                                            />
                                          </div>
                                          <div className="col-2">
                                            <FileUpload
                                              btnIcon="fas fa-upload"
                                              multiple
                                              accept="image/*"
                                            />
                                          </div>
                                          <div className="col-1">
                                            <button
                                              type="submit"
                                              className="btn btn-success"
                                            >
                                              <BsCheckSquareFill />
                                              ยืนยัน
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <Link to="/Edit_data">
                    <button type="button" className="btn btn-default">
                      ย้อนกลับ
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manage_plant_edit;
