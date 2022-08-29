import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

const MonitorStatus = () => {
  const [getstatusDetail, setStatusDetail] = useState([]);
  const [dataNamePlant, setDataNamePlant] = useState([]);
  const [dataUserPlant, setDataUserPlant] = useState([]);

  const getPlantStatus = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant/statusPlant`
    );
    setStatusDetail(response.data);
  };

  const getDataNamePlant = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant/DataNamePlant`
    );
    setDataNamePlant(response.data);
  };

  const getDataUserPlant = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant/DataUserPlant`
    );
    setDataUserPlant(response.data);
  };

  useEffect(() => {
    getPlantStatus();
    getDataNamePlant();
    getDataUserPlant();
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
            <div className="col-md-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}
                >
                  <h3 className="card-title">DashBoard</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4 col-sm-6 col-12">
                      <div className="info-box bg-success">
                        <span className="info-box-icon">
                          <i className="far fa-thumbs-up"></i>
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">
                            สถานะที่เสร็จสิ้นเเล้ว
                          </span>
                          <span className="info-box-number">200 แปลง</span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                          <span className="progress-description">
                            จากทั้งหมด 300 แปลง
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12">
                      <div className="info-box bg-warning">
                        <span className="info-box-icon">
                          <i className="far fa-calendar-alt"></i>
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">
                            สถานะกำลังดำเนินการ
                          </span>
                          <span className="info-box-number">99 แปลง</span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: "29%" }}
                            ></div>
                          </div>
                          <span className="progress-description">
                            จากงานทั้งหมด 300 แปลง
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12">
                      <div className="info-box bg-danger">
                        <span className="info-box-icon">
                          <i className="fas fa-comments"></i>
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">
                            สถานะเกินเวลาที่กำหนด
                          </span>
                          <span className="info-box-number">1 แปลง</span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: "1%" }}
                            ></div>
                          </div>
                          <span className="progress-description">
                            จากงานทั้งหมด 300 แปลง
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <center>รหัสโซนเพาะปลูก</center>
                      <select className="custom-select form-control-border">
                        <option>----เลือกข้อมูล----</option>
                        <option>A1</option>
                        <option>A2</option>
                        <option>A3</option>
                        <option>A4</option>
                      </select>
                    </div>
                    <div className="col-3">
                      <center>ชนิดเเปลงเพาะปลูก</center>
                      <select className="custom-select form-control-border">
                        <option>----เลือกข้อมูล----</option>
                        {dataNamePlant.map((dataPlant, index) => {
                          return (
                            <option key={index} value={dataPlant.name_plant}>
                              {dataPlant.name_plant}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-3">
                      <center>ชื่อผู้รับผิดชอบ</center>
                      <select className="custom-select form-control-border">
                        <option>----เลือกข้อมูล----</option>
                        {dataUserPlant.map((dataUser, index) => {
                          return (
                            <option key={index} value={dataUser.name}>
                              {dataUser.name + " " + dataUser.last_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-3">
                      <center>สถานะ</center>
                      <select className="custom-select form-control-border">
                        <option>----เลือกข้อมูล----</option>
                        <option>หมดเวลา</option>
                        <option>กำลังดำเนินการ</option>
                        <option>เสร็จสิ้น</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>รหัสโซน</th>
                          <th>รหัสเเปลง</th>
                          <th>แปลงเพาะปลูก</th>
                          <th>ผู้ดูเเล</th>
                          <th>สถานะ</th>
                          <th>ความคืบหน้า</th>
                          <th>เปอร์เซ็น</th>
                        </tr>
                      </thead>
                      {getstatusDetail.map((data, index) => {
                        return (
                          <tbody key={index}>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{data.zone_name}</td>
                              <td>{data.id_name_plant}</td>
                              <td>แปลง{data.name_plant}</td>
                              <td>
                                {data.name} {data.last_name}
                              </td>
                              <td>{data.status_name}</td>
                              <td>
                                {data.status_plant == "1" ||
                                data.status_plant == "4" ? (
                                  <div>
                                    {data.status_plant == "1" ? (
                                      data.plant_status == "0" ? (
                                        <div>เสร็จสิ้น</div>
                                      ) : (
                                        <div>กำลังดำเนินการ</div>
                                      )
                                    ) : data.harvest_status == "0" ? (
                                      <div>เสร็จสิ้น</div>
                                    ) : (
                                      <div>กำลังดำเนินการ</div>
                                    )}
                                  </div>
                                ) : data.status_plant == "2" ? (
                                  data.status_Fertilizer == "0" ? (
                                    <div>เสร็จสิ้น</div>
                                  ) : moment(new Date()).format("YYYY-MM-DD") >
                                      data.end_date_plant &&
                                    data.status_Fertilizer !== "0" ? (
                                    <div>หมดเวลา</div>
                                  ) : (
                                    <div>กำลังดำเนินการ</div>
                                  )
                                ) : data.status_plant == "3" ? (
                                  data.status_chemical == "0" ? (
                                    <div>เสร็จสิ้น</div>
                                  ) : moment(new Date()).format("YYYY-MM-DD") >
                                      data.end_date_plant &&
                                    data.status_chemical !== "0" ? (
                                    <div>หมดเวลา</div>
                                  ) : (
                                    <div>กำลังดำเนินการ</div>
                                  )
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>
                                {data.status_plant == "1" ||
                                data.status_plant == "4" ? (
                                  <div className="progress progress-xs">
                                    {data.status_plant == "1" ? (
                                      data.plant_status == "0" ? (
                                        <div
                                          className="progress-bar bg-success"
                                          style={{ width: "100%" }}
                                        >
                                          <span className="badge bg-success">
                                            100%
                                          </span>
                                        </div>
                                      ) : (
                                        <div
                                          className="progress-bar bg-warning"
                                          style={{ width: "50%" }}
                                        >
                                          <span className="badge bg-warning">
                                            50%
                                          </span>
                                        </div>
                                      )
                                    ) : data.harvest_status == "0" ? (
                                      <div
                                        className="progress-bar bg-success"
                                        style={{ width: "100%" }}
                                      >
                                        <span className="badge bg-success">
                                          100%
                                        </span>
                                      </div>
                                    ) : (
                                      <div
                                        className="progress-bar bg-warning"
                                        style={{ width: "50%" }}
                                      >
                                        <span className="badge bg-warning">
                                          50%
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ) : data.status_plant == "2" ? (
                                  <div className="progress progress-xs">
                                    {data.status_Fertilizer == "0" ? (
                                      <div
                                        className="progress-bar bg-success"
                                        style={{ width: "100%" }}
                                      >
                                        <span className="badge bg-success">
                                          100%
                                        </span>
                                      </div>
                                    ) : moment(new Date()).format(
                                        "YYYY-MM-DD"
                                      ) > data.end_date_plant &&
                                      data.status_Fertilizer !== "0" ? (
                                      <div
                                        className="progress-bar bg-danger"
                                        style={{ width: "1%" }}
                                      >
                                        <span className="badge bg-danger">
                                          1%
                                        </span>
                                      </div>
                                    ) : (
                                      <div
                                        className="progress-bar bg-warning"
                                        style={{ width: "50%" }}
                                      >
                                        <span className="badge bg-warning">
                                          50%
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ) : data.status_plant == "3" ? (
                                  <div className="progress progress-xs">
                                    {data.status_chemical == "0" ? (
                                      <div
                                        className="progress-bar bg-success"
                                        style={{ width: "100%" }}
                                      >
                                        <span className="badge bg-success">
                                          100%
                                        </span>
                                      </div>
                                    ) : moment(new Date()).format(
                                        "YYYY-MM-DD"
                                      ) > data.end_date_plant &&
                                      data.status_chemical !== "0" ? (
                                      <div
                                        className="progress-bar bg-danger"
                                        style={{ width: "1%" }}
                                      >
                                        <span className="badge bg-danger">
                                          1%
                                        </span>
                                      </div>
                                    ) : (
                                      <div
                                        className="progress-bar bg-warning"
                                        style={{ width: "50%" }}
                                      >
                                        <span className="badge bg-warning">
                                          50%
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
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

export default MonitorStatus;
