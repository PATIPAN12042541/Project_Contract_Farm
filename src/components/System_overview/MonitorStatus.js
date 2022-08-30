import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import "../CSS/MonitorStatus.css";

const MonitorStatus = () => {
  const [getstatusDetail, setStatusDetail] = useState([]);
  const [dataNamePlant, setDataNamePlant] = useState([]);
  const [dataUserPlant, setDataUserPlant] = useState([]);
  const [dataZonePlant, setDataZonePlant] = useState([]);
  const [dashBoardSumStatus, setDashBoardSumStatus] = useState([]);

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

  const getDataZonePlant = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant/DataZonePlant`
    );
    setDataZonePlant(response.data);
  };

  const getDashBoardSumStatus = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant/DashBoardSumStatus`
    );
    setDashBoardSumStatus(response.data);

    var COMPLETION_ = response.data
      .map((sum) => sum.COMPLETION_)
      .reduce((sum2, sum) => sum + sum2);

    console.log("COMPLETION_ : " + COMPLETION_);

    var Waning_ = response.data
      .map((sum) => sum.Waning_)
      .reduce((sum2, sum) => sum + sum2);

    console.log("Waning_ : " + Waning_);

    var Danger_ = response.data
      .map((sum) => sum.Waning_)
      .reduce((sum2, sum) => sum + sum2);

    console.log("Danger_ : " + Danger_);
  };

  useEffect(() => {
    getPlantStatus();
    getDataNamePlant();
    getDataUserPlant();
    getDataZonePlant();
    getDashBoardSumStatus();
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
                  <h3 className="card-title">ตรวจสอบสถานะการทำงาน</h3>
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
                        {dataZonePlant.map((dataZone, index) => {
                          return (
                            <option key={index} value={dataZone.zone_name}>
                              {dataZone.zone_name}
                            </option>
                          );
                        })}
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
                        <option value={1}>หมดเวลา</option>
                        <option value={2}>กำลังดำเนินการ</option>
                        <option value={3}>เสร็จสิ้น</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>
                            <center>#</center>
                          </th>
                          <th>
                            <center>รหัสโซน</center>
                          </th>
                          <th>
                            <center>รหัสเเปลง</center>
                          </th>
                          <th>
                            <center>แปลงเพาะปลูก</center>
                          </th>
                          <th>
                            <center>ผู้ดูเเล</center>
                          </th>
                          <th>
                            <center>สถานะ</center>
                          </th>
                          <th>
                            <center>ความคืบหน้า</center>
                          </th>
                          <th>
                            <center>เปอร์เซ็น</center>
                          </th>
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
                              <td>
                                <center>{data.status_name}</center>
                              </td>
                              <td>
                                <center>
                                  {data.status_plant == "1" ||
                                  data.status_plant == "4" ? (
                                    <div>
                                      {data.status_plant == "1" ? (
                                        data.plant_status == "0" ? (
                                          <div className="saccess-data">
                                            เสร็จสิ้น
                                          </div>
                                        ) : (
                                          <div className="waning-data">
                                            กำลังดำเนินการ
                                          </div>
                                        )
                                      ) : data.harvest_status == "0" ? (
                                        <div className="saccess-data">
                                          เสร็จสิ้น
                                        </div>
                                      ) : (
                                        <div className="waning-data">
                                          กำลังดำเนินการ
                                        </div>
                                      )}
                                    </div>
                                  ) : data.status_plant == "2" ? (
                                    data.status_Fertilizer == "0" ? (
                                      <div className="saccess-data">
                                        เสร็จสิ้น
                                      </div>
                                    ) : moment(new Date()).format(
                                        "YYYY-MM-DD"
                                      ) > data.end_date_plant &&
                                      data.status_Fertilizer !== "0" ? (
                                      <div className="danger-data">หมดเวลา</div>
                                    ) : (
                                      <div className="waning-data">
                                        กำลังดำเนินการ
                                      </div>
                                    )
                                  ) : data.status_plant == "3" ? (
                                    data.status_chemical == "0" ? (
                                      <div className="saccess-data">
                                        เสร็จสิ้น
                                      </div>
                                    ) : moment(new Date()).format(
                                        "YYYY-MM-DD"
                                      ) > data.end_date_plant &&
                                      data.status_chemical !== "0" ? (
                                      <div className="danger-data">หมดเวลา</div>
                                    ) : (
                                      <div className="waning-data">
                                        กำลังดำเนินการ
                                      </div>
                                    )
                                  ) : (
                                    ""
                                  )}
                                </center>
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
