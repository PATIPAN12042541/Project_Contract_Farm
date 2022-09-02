import React, { useState, useEffect } from "react";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import "../CSS/Data_detail.css";
import { BsCheckCircleFill } from "react-icons/bs";
import Swal from "sweetalert2";

const Data_detail = (props) => {
  const [datadetail, setDatadetail] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getDatadetail();
  }, []);

  const getDatadetail = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/Data_detail/${props.id}`
    );
    setDatadetail(response.data);
  };

  const changeStatus = async (id, status) => {
    Swal.fire({
      title: "Are you sure complate?",
      text: "Okay Are you Ready ? ",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/getChemical/updateChangeStatus/${id}`,
          {
            status_check: status,
          }
        );
        getDatadetail();
      }
    });
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-12" />
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          {datadetail.map((data, index) => (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="card card-info">
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#8CC152" }}
                  >
                    <h1 className="card-title">
                      รายละเอียดสารเคมี {data.name_chemical}
                      {"  "}
                      {data.status_check == "0" && (
                        <BsCheckCircleFill style={{ color: "#FFFFF" }} />
                      )}
                    </h1>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-sm-4">
                        <div className="col-12">
                          <Zoom>
                            <img
                              className="img-fluid"
                              src={data.path_img}
                              loading="lazy"
                            />
                          </Zoom>
                        </div>
                      </div>
                      <div className="col-12 col-sm-8">
                        <div className="col-12 col-md-12 col-lg-12 order-2 order-md-1">
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="info-box bg-light">
                                <div className="info-box-content">
                                  <span className="info-box-text text-left text-black">
                                    <b className="font-size2">ชื่อสามัญ : </b>
                                    <span className="font-size-data">
                                      {data.name_chemical_eng}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="info-box bg-light">
                                <div className="info-box-content">
                                  <span className="info-box-text text-left text-black">
                                    <b className="font-size2">
                                      วัน/เดือน/ปี :{" "}
                                    </b>
                                    <span className="font-size-data">
                                      {data.date_start}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="info-box bg-light">
                                <div className="info-box-content">
                                  <span className="info-box-text text-left text-black">
                                    <b className="font-size2">
                                      อัตรา (cc / L.) :{" "}
                                    </b>
                                    <span className="font-size-data">
                                      {data.cc} cc / {data.liter} L.
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="info-box bg-light">
                                <div className="info-box-content">
                                  <span className="info-box-text text-left text-black">
                                    <b className="font-size2">
                                      ระยะเวลาตกค้าง :{" "}
                                    </b>
                                    <span className="font-size-data">
                                      {data.time + " " + data.unit}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="info-box bg-light">
                                <div className="info-box-content">
                                  <span className="info-box-number text-center text-black mb-0 font-size2">
                                    วันที่เก็บเกี่ยวผลผลิตได้
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              className={
                                data.status_check == "0"
                                  ? "col-12 col-sm-6 font-size-success"
                                  : "col-12 col-sm-6 font-size"
                              }
                              type="date"
                            >
                              {data.date_end}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-12">
                              <h4>Note.</h4>
                              <div className="post">
                                <p>{data.note}</p>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-12">
                              {data.status_check == "1" ? (
                                <button
                                  className="btn btn-success float-right"
                                  onClick={() => {
                                    changeStatus(data.id, "0");
                                  }}
                                >
                                  เสร็จสิ้น
                                </button>
                              ) : (
                                <button
                                  className="btn btn-default float-right"
                                  onClick={() => {
                                    changeStatus(data.id, "1");
                                  }}
                                >
                                  ยกเลิก
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-12" />
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
                  style={{ backgroundColor: "#DC143C", color: "#FFFFFF" }}
                >
                  <h3 className="card-title">รายงานปัญหา</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4 col-sm-6 col-12">
                      <div className="form-group">
                        <form>
                          <label>โรค</label>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                          />
                          <label>เชื้อรา</label>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                          />
                        </form>
                      </div>
                    </div>
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

export default Data_detail;
