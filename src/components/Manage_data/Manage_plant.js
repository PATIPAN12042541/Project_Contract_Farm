import React, { useState } from "react";
import { fontSize } from "@mui/system";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

function refreshPage() {
  setTimeout(() => {
    window.location.reload(false);
  }, 500);
  console.log("page to reload");
}

const Manage_plant = () => {
  const [appends, setAppends] = useState([]);
  const { control } = useForm();

  const append = () => {
    setAppends([...appends, { id: uuidv4() }]);
  };

  const remove = (index) => {
    setAppends([...appends.slice(0, index), ...appends.slice(index + 1)]);
  };

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
                  style={{
                    backgroundColor: "#8CC152",
                    color: "#FFFFFF",
                  }}
                >
                  <h3 className="card-title">จัดการรายละเอียดข้อมูล</h3>
                </div>

                <form>
                  <div className="card-body">
                    <button
                      type="button"
                      className="btn  btn-outline-success"
                      onClick={() => {
                        append();
                      }}
                    >
                      เพิ่มข้อมูล (+)
                    </button>
                    <hr />
                    <ul>
                      {appends.map((data, index) => (
                        <li key={data.id}>
                          <div className="callout callout-info">
                            <div className="row">
                              <div className="col-12 col-sm-8">
                                <div className="form-group">
                                  <label>ชื่อสารเคมีที่ใช้</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ปริมาณสารเคมีที่ใช้"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-3">
                                <div className="form-group">
                                  <label>ปริมาณที่ใช้</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ปริมาณที่ใช้"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-1">
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
                            <div className="row">
                              <div className="col-12 col-sm-8">
                                <div className="form-group">
                                  <label>Note.</label>
                                  <textarea
                                    rows="3"
                                    className="form-control"
                                    placeholder="Note"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-4">
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
                            <button
                              onClick={() => remove(index)}
                              className="btn btn-outline-danger"
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
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
