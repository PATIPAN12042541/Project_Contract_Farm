import React from "react";
import "../CSS/ReportDefect.css";

const Report_Defect = () => {
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
          <div className="card-header">
            <h3 className="card-title">รายละเอียด</h3>
          </div>

          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "10px" }}>#</th>
                  <th>Task</th>
                  <th>Progress</th>
                  <th style={{ width: "40px" }}>Label</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>Update software</td>
                  <td>
                    <div className="progress progress-xs">
                      <div
                        className="progress-bar progress-bar-danger"
                        style={{ width: "55%" }}
                      ></div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-danger">55%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Report_Defect;
    