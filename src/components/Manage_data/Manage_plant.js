import React from "react";
import { Link } from "react-router-dom";

function refreshPage() {
  setTimeout(() => {
    window.location.reload(false);
  }, 500);
  console.log("page to reload");
}

const Manage_plant = () => {
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid"></div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 ">
              <div className="card card-primary">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}
                >
                  <h3 className="card-title">จัดการรายละเอียดข้อมูล</h3>
                </div>
                <form>
                  <div className="float-right">
                    <button
                      type="button"
                      className="btn btn-block bg-gradient-success btn-lg"
                    >
                      เพิ่ม
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="callout callout-info">
                      <div className="float-right">1</div>
                      <div className="form-group">
                        <label>ชื่อสารเคมีที่ใช้</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ปริมาณสารเคมีที่ใช้"
                        />
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>ปริมาณที่ใช้</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ปริมาณที่ใช้"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>หน่วย</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="หน่วยนับ"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Note.</label>
                        <textarea
                          rows="3"
                          className="form-control"
                          placeholder="Note"
                        />
                      </div>
                      <div className="form-group">
                        <label>File input</label>
                        <div className="input-group">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputFile"
                            />
                            <label className="custom-file-label">
                              Choose file
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link to="/Edit_data">
                      <button type="submit" className="btn btn-default">
                        ย้อนกลับ
                      </button>
                    </Link>
                    <Link to="/Edit_data" onClick={refreshPage}>
                      <button
                        type="submit"
                        className="btn btn-default float-right"
                        style={{
                          backgroundColor: "#8CC152",
                          color: "#FFFFFF",
                        }}
                      >
                        ยืนยัน
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manage_plant;
