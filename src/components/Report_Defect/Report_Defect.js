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
                  <th>
                    <center>โรค</center>
                  </th>
                  <th>
                    <center>แมลง</center>
                  </th>
                  <th>
                    <center>วัชพืช</center>
                  </th>
                  <th>หมายเหตุ</th>
                  <th>
                    <center>วันที่เเจ้ง</center>
                  </th>
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
                      <td
                        className={
                          data.disease == 0 ? "defult-color" : "red-color"
                        }
                      >
                        <center>{data.disease == 0 ? "-" : "/"}</center>
                      </td>
                      <td
                        className={data.bug == 0 ? "defult-color" : "red-color"}
                      >
                        <center>{data.bug == 0 ? "-" : "/"}</center>
                      </td>
                      <td
                        className={
                          data.weed == 0 ? "defult-color" : "red-color"
                        }
                      >
                        <center>{data.weed ? "-" : "/"}</center>
                      </td>
                      <td>{data.remark}</td>
                      <td>
                        <center>{data.updatedAt}</center>
                      </td>
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
