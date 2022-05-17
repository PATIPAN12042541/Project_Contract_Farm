import React, { useState, useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Content from "../Content";
import axios from "axios";
import "./Data_detail.css";

const Data_detail = (props) => {
  const [datadetail, setDatadetail] = useState([]);
  console.log(props.id);
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
          {/* {datadetail.map((data, index) => ( */}
          <div className="row">
            <div className="col-md-12">
              <div className="card card-info">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <h1 className="card-title">
                    รายละเอียดสารเคมี
                    {/* รายละเอียดสารเคมี {data.name_chemical} */}
                  </h1>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <div className="col-12">
                        <img
                          className="img-fluid"
                          // src={data.path_image}
                          loading="lazy"
                        />
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
                                  chlorantraniliprole
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="info-box bg-light">
                              <div className="info-box-content">
                                <span className="info-box-text text-left text-black">
                                  <b className="font-size2">วัน/เดือน/ปี : </b>
                                  11/05/2565
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
                                  40 cc : 25 L.
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
                                  3 วัน
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
                          <div className="col-12 col-sm-6 font-size">
                            19/05/2565
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <h4>Note.</h4>
                            <div className="post">
                              <p>-</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </section>
    </div>
  );
};

export default Data_detail;
