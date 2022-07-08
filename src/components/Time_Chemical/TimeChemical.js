import React from "react";

const TimeChemical = () => {
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
              <div className="card card-success">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <center>
                    <h3 className="card-title">จัดการระยะเวลาตกค้าง</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <button className="btn btn-success">เพิ่มข้อมูล</button>
                  </div>
                  <hr />
                  <div className="row">
                    <table
                      className="table table-bordered table-hover dataTable dtr-inline"
                      responsive
                    >
                      <thead>
                        <tr>
                          <th>ลำดับ</th>
                          <th>ประเภทสารเคมี</th>
                          <th>ชื่อสารเคมี (ไทย)</th>
                          <th>ชื่อสารเคมี (Eng)</th>
                          <th>ER MUL</th>
                          <th>รูปภาพ</th>
                          <th>Active</th>
                          <th>แก้ไขข้อมูล</th>
                          <th>ลบข้อมูล</th>
                        </tr>
                      </thead>
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

export default TimeChemical;
