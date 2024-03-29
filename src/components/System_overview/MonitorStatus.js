import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import "../CSS/MonitorStatus.css";

const MonitorStatus = () => {
  const [getstatusDetail, setStatusDetail] = useState([]);
  const [getstatusDetail2, setStatusDetail2] = useState([]);
  const [COMPLETION, setCOMPLETION] = useState([]);
  const [Waning, setWaning] = useState([]);
  const [Danger, setDanger] = useState([]);
  const [count_, setCount_] = useState([]);
  const [COMPLETION_PER, setCOMPLETIONPER] = useState([]);
  const [Waning_PER, setWaningPer] = useState([]);
  const [Danger_PER, setDangerPer] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getPlantStatus = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant/statusPlant`
    );
    setStatusDetail(response.data);
    setStatusDetail2(response.data);
  };

  // Search Item
  const searchItems2 = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue != "") {
      const filteredData = getstatusDetail.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setStatusDetail2(filteredData);
    } else {
      setStatusDetail2(getstatusDetail);
    }
  };

  const searchItems = async (searchValue) => {
    if (searchValue == 1) {
      const filteredData = getstatusDetail.filter((data) => data.Danger_ == 1);
      setStatusDetail2(filteredData);
    } else if (searchValue == 2) {
      const filteredData = getstatusDetail.filter((data) => data.Waning_ == 1);
      setStatusDetail2(filteredData);
    } else if (searchValue == 3) {
      const filteredData = getstatusDetail.filter(
        (data) => data.COMPLETION_ == 1
      );
      setStatusDetail2(filteredData);
    } else {
      setStatusDetail2(getstatusDetail);
    }
  };

  const getDashBoardSumStatus = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant/DashBoardSumStatus`
    );

    const countdata = response.data.length;
    setCount_(countdata);

    var COMPLETION_ = response.data
      .map((sum) => sum.COMPLETION_)
      .reduce((sum2, sum) => sum + sum2);

    setCOMPLETION(COMPLETION_);

    let COMPLETION_percent = (COMPLETION_ / countdata) * 100;
    setCOMPLETIONPER(COMPLETION_percent);

    var Waning_ = response.data
      .map((sum) => sum.Waning_)
      .reduce((sum2, sum) => sum + sum2);

    setWaning(Waning_);

    let Waning_percent = (Waning_ / countdata) * 100;
    setWaningPer(Waning_percent);

    var Danger_ = response.data
      .map((sum) => sum.Danger_)
      .reduce((sum2, sum) => sum + sum2);

    setDanger(Danger_);

    let Danger_percent = (Danger_ / countdata) * 100;
    setDangerPer(Danger_percent);
  };

  useEffect(() => {
    getPlantStatus();
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
                          <span className="info-box-number">
                            {COMPLETION} แปลง
                          </span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: COMPLETION_PER + "%" }}
                            ></div>
                          </div>
                          <span className="progress-description">
                            จากทั้งหมด {count_} แปลง
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
                          <span className="info-box-number">{Waning} แปลง</span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: Waning_PER + "%" }}
                            ></div>
                          </div>
                          <span className="progress-description">
                            จากงานทั้งหมด {count_} แปลง
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
                          <span className="info-box-number">{Danger} แปลง</span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: Danger_PER + "%" }}
                            ></div>
                          </div>
                          <span className="progress-description">
                            จากงานทั้งหมด {count_} แปลง
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3"></div>
                    <div className="col-3"></div>
                    <div className="col-3">
                      ค้นหา
                      <input
                        type="text"
                        className="form-control rounded-0"
                        placeholder="ค้นหา"
                        onChange={(e) => searchItems2(e.target.value)}
                      />
                    </div>
                    <div className="col-3">
                      สถานะ
                      <select
                        className="custom-select form-control-border"
                        onChange={(e) => searchItems(e.target.value)}
                      >
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
                        </tr>
                      </thead>
                      {getstatusDetail2.map((data, index) => {
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
                                      data.status_Fertilizer != "0" ? (
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
                                      data.status_chemical != "0" ? (
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
