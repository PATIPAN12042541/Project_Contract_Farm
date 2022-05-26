import React, { useState, useEffect } from "react";
import axios from "axios";

const System_overview = () => {
  const [Overview, setOverview] = useState([]);

  const getOverview = async () => {
    const overview = await axios.get(
      `${process.env.REACT_APP_API_URL}/OverView`
    );
    setOverview(overview.data);
    console.log(overview.data);
  };

  useEffect(() => {
    getOverview();
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
                <div className="card-header">
                  <h3 className="card-title">Fixed Header Table</h3>
                  <div className="card-tools">
                    <div className="input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control float-right"
                        placeholder="Search"
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-head-fixed text-nowrap">
                    <thead>
                      <tr>
                        <th>ชื่อโซนเพาะปลูก</th>
                        <th>ชื่อเเปลง</th>
                        <th>วันที่เริ่มต้น</th>
                        <th>วันที่สิ้นสุด</th>
                        <th>ผู้รับผิดชอบ</th>
                        <th>ชื่อสารเคมี/ปุ๋ย</th>
                        <th>EU MRL</th>
                        <th>ระยะเวลา</th>
                        <th>ปริมาณที่ใช้</th>
                        <th>Note</th>
                        <th>วันที่เริ่มต้นสารเคมี</th>
                        <th>วันที่สิ้นสุดสารเคมี</th>
                        <th>สถานะ</th>
                      </tr>
                    </thead>
                    {Overview.map((data, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{data.zone_name + "-" + data.id_name_plant}</td>
                          <td>{data.name_plant}</td>
                          <td>{data.start_date_plant}</td>
                          <td>{data.end_date_plant}</td>
                          <td>{data.name + " " + data.last_name}</td>
                          <td>
                            {data.name_chemical +
                              " ( " +
                              data.name_chemical_eng +
                              " ) "}
                          </td>
                          <td>{data.eu_mrl}</td>
                          <td>{data.time + " " + data.unit}</td>
                          <td>{data.cc + " CC / " + data.liter + " L"}</td>
                          <td>{data.note}</td>
                          <td>{data.date_start}</td>
                          <td>{data.date_end}</td>
                          <td>{data.status_check}</td>
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

export default System_overview;
