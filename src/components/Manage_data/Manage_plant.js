import React from "react";

const Manage_plant = (props) => {
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
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        ปริมาณสารเคมีที่ใช้
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="ปริมาณสารเคมีที่ใช้"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Note.</label>
                      <textarea
                        rows="3"
                        className="form-control"
                        placeholder="Note"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputFile">File input</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="exampleInputFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="exampleInputFile"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="text-left">
                        <button
                          type="submit"
                          className="btn btn"
                          style={{
                            backgroundColor: "#8CC152",
                            color: "#FFFFFF",
                          }}
                        >
                          Submit
                        </button>
                      </div>
                      <div className="align-right">
                        <button
                          type="submit"
                          className="btn btn"
                          style={{
                            backgroundColor: "#8CC152",
                            color: "#FFFFFF",
                          }}
                        >
                          ยืนยัน
                        </button>
                      </div>
                    </div>
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
