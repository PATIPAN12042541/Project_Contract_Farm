import React, { useState, useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Content from "../Content";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import "./Data_detail.css";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsFillEmojiNeutralFill } from "react-icons/bs";

const Data_detail = (props) => {
  const [datadetail, setDatadetail] = useState([]);

  useEffect(() => {
    getDatadetail();
  }, []);

  const getDatadetail = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/Data_detail/${props.id}`
    );
    setDatadetail(response.data);
    console.log(response.data);
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
                    </h1>
                    {"  "}
                    <BsCheckCircleFill style={{ color: "#FFFFF" }} />
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
                                    {data.name_chemical_eng}
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
                                    {data.date_start}
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
                                      อัตรา (cc : L.) :{" "}
                                    </b>
                                    {data.cc} cc : {data.liter} L.
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
                                    {data.time + " " + data.unit}
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
                              className="col-12 col-sm-6 font-size"
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
                              <button className="btn btn-info">
                                แจ้งปัญหา
                              </button>{" "}
                              <button className="btn btn-success float-right">
                                เสร็จสิ้น
                              </button>
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
    </div>
  );
};

export default Data_detail;
