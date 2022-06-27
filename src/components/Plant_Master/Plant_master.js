import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import axios from "axios";

const Plant_master = () => {
  const [plantMaster, setPlantMaster] = useState([]);

  const getPlantMasterDetail = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/plant/getMasterPlant`
    );
    setPlantMaster(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getPlantMasterDetail();
  }, []);

  return (
    <div className="content-wrapper">
      {" "}
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
            <div className="col-md-12">
              <div className="card card-success">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <center>
                    <h3 className="card-title">จัดการข้อมูลพืช Master</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <button className="btn btn-success">เพิ่มข้อมูลพืช</button>
                  </div>
                  <hr />
                  <div className="row">
                    <Table
                      className="table table-bordered table-hover dataTable dtr-inline"
                      responsive
                    >
                      <thead>
                        <tr>
                          <th>ลำดับ</th>
                          <th>ชื่อพืช (ไทย)</th>
                          <th>ชื่อพืช (Eng)</th>
                          <th>รูปภาพ</th>
                          <th>
                            <center>สถานะ</center>
                          </th>
                          <th>
                            <center>ลบข้อมูล</center>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {plantMaster.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.plant_name}</td>
                            <td>{data.plant_name_eng}</td>
                            <td>{data.plant_img}</td>
                            <td>
                              <center>
                                {data.status_show === 1 ? (
                                  <Image
                                    src="../dist/img/symbol_true.png"
                                    className="img-fluid mb-2"
                                    alt="white sample"
                                    width="100"
                                    height="100"
                                    thumbnail
                                  />
                                ) : (
                                  <Image
                                    src="../dist/img/symbol_false.png"
                                    className="img-fluid mb-2"
                                    alt="white sample"
                                    width="100"
                                    height="100"
                                    thumbnail
                                  />
                                )}
                              </center>
                            </td>
                            <td>
                              <button className="btn btn-danger">
                                ลบข้อมูล
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plant_master;
