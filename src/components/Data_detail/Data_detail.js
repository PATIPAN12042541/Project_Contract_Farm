import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import "../CSS/Data_detail.css";
import { BsCheckCircleFill } from "react-icons/bs";
import Swal from "sweetalert2";


const Data_detail = (props) => {
  const [datadetail, setDatadetail] = useState([]);
  const [remark, setRemark] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);


  function toggle(value) {
    return !value;
  }

  const ReportDefect = async () => {
    const reportDefect = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/getReportDefect/${props.id}`
    );

    if (reportDefect.data[0].ReportDefect == 0) {
      console.log("insert" + reportDefect);

      try {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/getChemical/CreateReportDefect/${props.id}`,
            {
              disease: checked,
              bug: checked2,
              weed: checked3,
              remark: remark == "" ? "" : remark,
            }
          )
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Save OK !",
            });
            window.location.reload(3);
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: error.response.data.msg,
              text: "Save Error!",
            });
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error.response.data.msg,
          text: "Save Error!",
        });
      }
    } else {
      console.log("Update" + reportDefect);
      try {
        await axios
          .patch(
            `${process.env.REACT_APP_API_URL}/getChemical/UpdateReportDefect/${props.id}`,
            {
              disease: checked,
              bug: checked2,
              weed: checked3,
              remark: remark == "" ? "" : remark,
            }
          )
          .then(function (response) {
            window.location.reload(3);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Save OK !",
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: error.response.data.msg,
              text: "Save Error!",
            });
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error.response.data.msg,
          text: "Save Error!",
        });
      }
    }

  };;

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

  useEffect(() => {
    getDatadetail();
  }, []);

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
                    <div className="col-12 col-sm-4">
                      <lable>แจ้งปัญหาที่พบ : </lable>
                      <br />
                      <br />
                      <div className="col-md-12">
                        <label>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => setChecked(toggle)}
                          />
                          &nbsp; โรค
                        </label>
                        <br />

                        <label>
                          <input
                            type="checkbox"
                            checked={checked2}
                            onChange={() => setChecked2(toggle)}
                          />
                          &nbsp; แมลง
                        </label>
                        <br />

                        <label>
                          <input
                            type="checkbox"
                            checked={checked3}
                            onChange={() => setChecked3(toggle)}
                          />
                          &nbsp; วัชพืช
                        </label>
                        <br />
                      </div>
                    </div>
                    <div className="col-12 col-sm-8">
                      <div className="col-md-12">
                        <label>หมายเหตุ</label>
                        <textarea
                          rows="3"
                          className="form-control"
                          placeholder="Input Data ..."
                          onChange={(e) => setRemark(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-danger float-right"
                    onClick={ReportDefect}
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};;

export default Data_detail;


