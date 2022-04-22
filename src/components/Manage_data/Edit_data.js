import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { BsFillTrashFill } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";

const Edit_data = () => {
  const [plantdata, setPlantData] = useState([
    {
      id: "A1",
      name: "ปลูกกระเพรา",
      start_date: "01-01-2022",
      end_date: "01-04-2022",
      url: "../dist/img/holy_basil.jpg",
    },
    {
      id: "A2",
      name: "ปลูกพริก",
      start_date: "11-07-2022",
      end_date: "11-12-2022",
      url: "../dist/img/cili.jpg",
    },
    {
      id: "A3",
      name: "ปลูกเขือ",
      start_date: "11-07-2022",
      end_date: "11-08-2022",
      url: "../dist/img/Thai-Eggplant-2.jpg",
    },
    {
      id: "A4",
      name: "ปลูกแตงกวา",
      start_date: "02-03-2022",
      end_date: "02-09-2022",
      url: "../dist/img/images2.jpg",
    },
    {
      id: "A5",
      name: "ปลูกผักกาดขาว",
      start_date: "04-01-2022",
      end_date: "04-03-2022",
      url: "../dist/img/images.jpg",
    },
  ]);

  return (
    <div className="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-12"></div>
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
                  <button className="btn btn-success">เพิ่มข้อมูล</button>
                  <table className="table table-bordered table-hover">
                    <thead
                      style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}
                    >
                      <tr>
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
                      <tbody key={data.id}>
                        <tr
                          data-widget="expandable-table"
                          aria-expanded="false"
                        >
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.start_date}</td>
                          <td>{data.end_date}</td>
                          <td>
                            <center>
                              <Zoom>
                                <img
                                  src={data.url}
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
                                <span className="btn btn-info col fileinput-button dz-clickable">
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
