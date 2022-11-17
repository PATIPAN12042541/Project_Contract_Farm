import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../CSS/ReportDefect.css";

const Report_Defect = () => {
  const [getDataDefect, setDataDefect] = useState([]);

  const getDefect = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/ReportDefectData`
    );
    setDataDefect(response.data);
  };

  useEffect(() => {
    getDefect();
  }, []);

  return (
    <div className="content-wrapper">
      {/* <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>รายงานปัญหา</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card image_bg">
          <div className="card-body row">
            <div className="col-5 text-center d-flex align-items-center justify-content-center">
              <div className="">
                <h1>
                  Contract<strong>Farming</strong>
                </h1>
                <p className="lead mb-5">report an issue</p>
              </div>
            </div>
            <div className="col-7">
              <div className="form-group">
                <label className="inputName">ชื่อแปลง</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>หัวข้อปัญหา</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>ปัญหาที่พบ</label>
                <textarea className="form-control" rows="4"></textarea>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-warning"
                  style={{ color: "white" }}
                  value={"ส่งรายงานปัญหา"}
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>รายงานปัญหา</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="card">
          <div
            className="card-header"
            style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}
          >
            <h3 className="card-title">รายละเอียด</h3>
          </div>

          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>รหัสแปลงเพาะปลูก</th>
                  <th>ชื่อแปลงผัก</th>
                  <th>ผู้รับผิดชอบ</th>
                  <th>โรค</th>
                  <th>แมลง</th>
                  <th>วัชพืช</th>
                  <th>หมายเหตุ</th>
                  <th>วันที่เเจ้ง</th>
                </tr>
              </thead>

              <tbody>
                {getDataDefect.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.zone_name}</td>
                      <td>{data.plant_name}</td>
                      <td>
                        {data.name} {data.last_name}
                      </td>
                      <td>{data.disease}</td>
                      <td>{data.bug}</td>
                      <td>{data.weed}</td>
                      <td>{data.remark}</td>
                      <td>{data.updatedAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Report_Defect;
