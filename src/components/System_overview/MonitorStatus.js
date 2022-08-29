import React from "react";

const MonitorStatus = () => {
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
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                          <span className="progress-description">
                            จากงานทั้งหมด 300 งาน
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
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                          <span className="progress-description">
                            จากงานทั้งหมด 300 งาน
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      รหัสโซนเพาะปลูก
                      <select className="custom-select form-control-border">
                        <option>----เลือกข้อมูล----</option>
                        <option>A1</option>
                        <option>A2</option>
                        <option>A3</option>
                        <option>A4</option>
                      </select>
                    </div>
                    <div className="col-3">
                      ชนิดเเปลงเพาะปลูก
                      <select className="custom-select form-control-border">
                        <option>----เลือกข้อมูล----</option>
                        <option>แปลงมะเขือ</option>
                        <option>แปลงแตงกวา</option>
                        <option>แปลงคะน้า</option>
                        <option>แปลงมะม่วง</option>
                      </select>
                    </div>
                    <div className="col-3">
                      ชื่อผู้รับผิดชอบ
                      <select className="custom-select form-control-border">
                        <option>----เลือกข้อมูล----</option>
                        <option>นายปฏิภาณ ศรีทองคำ</option>
                        <option>นายปฏิภาณ ศรีทองคำ</option>
                        <option>นายปฏิภาณ ศรีทองคำ</option>
                        <option>นายปฏิภาณ ศรีทองคำ</option>
                      </select>
                    </div>
                    <div className="col-3">
                      สถานะ
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
                      <tbody>
                        <tr>
                          <td>1.</td>
                          <td>A1</td>
                          <td>1</td>
                          <td>แปลงมะเขือ</td>
                          <td>นายปฏิภาณ ศรีทองคำ</td>
                          <td>หมดเวลา</td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar bg-danger"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-danger">0%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2.</td>
                          <td>A2</td>
                          <td>2</td>
                          <td>แปลงแตงกวา</td>
                          <td>นายปฏิภาณ ศรีทองคำ</td>
                          <td>กำลังดำเนินการ</td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: "50%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-warning">50%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3.</td>
                          <td>A4</td>
                          <td>1</td>
                          <td>แปลงมะม่วง</td>
                          <td>นายปฏิภาณ ศรีทองคำ</td>
                          <td>เสร็จสิ้น</td>
                          <td>
                            <div className="progress progress-xs progress-striped active">
                              <div
                                className="progress-bar bg-success"
                                style={{ width: "100%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-success">100%</span>
                          </td>
                        </tr>
                      </tbody>
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
