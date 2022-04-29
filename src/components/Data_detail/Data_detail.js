import React, { useState, useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Content from "../Content";
import axios from "axios";
import ImageListItemBar from "@mui/material/ImageListItemBar";

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
          <div className="row">
            <div className="col-md-12">
              <div className="card card-info">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <h1 className="card-title">รายละเอียดสารเคมี "พรีวาทอน"</h1>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <div className="col-12">
                        <img
                          className="card-img-top"
                          src={"../dist/img/insecticide/Pic_1.png"}
                          alt={"พรีวาทอน"}
                          loading="lazy"
                          width={200}
                          height={250}
                        />
                        <ImageListItemBar
                          className="card-title text-primary text-white"
                          title={"พรีวาทอน"}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-8">
                      <div className="col-12 col-md-12 col-lg-12 order-2 order-md-1">
                        <div className="row">
                          <div className="col-12 col-sm-4">
                            <div className="info-box bg-light">
                              <div className="info-box-content">
                                <span className="info-box-text text-center text-muted">
                                  วันที่เริ่มต้น
                                </span>
                                <span className="info-box-number text-center text-muted mb-0">
                                  20/07/2022
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="info-box bg-light">
                              <div className="info-box-content">
                                <span className="info-box-text text-center text-muted">
                                  วันที่สิ้นสุด
                                </span>
                                <span className="info-box-number text-center text-muted mb-0">
                                  20/07/2022
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="info-box bg-light">
                              <div className="info-box-content">
                                <span className="info-box-text text-center text-muted">
                                  ปริมาณสารเคมีที่ใช้
                                </span>
                                <span className="info-box-number text-center text-muted mb-0">
                                  5 ml.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <h4>Note.</h4>
                            <div className="post">
                              <p>ยังอยู่ในช่วงทดสอบระบบนะครับ</p>
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

          <div className="row">
            <div className="col-md-12">
              <div className="card card-info">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <h1 className="card-title">รายละเอียดสารเคมี "เอ็กซอล"</h1>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <div className="col-12">
                        <img
                          className="card-img-top"
                          src={"../dist/img/insecticide/Pic_2.png"}
                          alt={"เอ็กซอล"}
                          loading="lazy"
                          width={200}
                          height={250}
                        />
                        <ImageListItemBar
                          className="card-title text-primary text-white"
                          title={"เอ็กซอล"}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-8">
                      <div className="col-12 col-md-12 col-lg-12 order-2 order-md-1">
                        <div className="row">
                          <div className="col-12 col-sm-4">
                            <div className="info-box bg-light">
                              <div className="info-box-content">
                                <span className="info-box-text text-center text-muted">
                                  วันที่เริ่มต้น
                                </span>
                                <span className="info-box-number text-center text-muted mb-0">
                                  20/07/2022
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="info-box bg-light">
                              <div className="info-box-content">
                                <span className="info-box-text text-center text-muted">
                                  วันที่สิ้นสุด
                                </span>
                                <span className="info-box-number text-center text-muted mb-0">
                                  20/07/2022
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="info-box bg-light">
                              <div className="info-box-content">
                                <span className="info-box-text text-center text-muted">
                                  ปริมาณสารเคมีที่ใช้
                                </span>
                                <span className="info-box-number text-center text-muted mb-0">
                                  5 ml.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <h4>Note.</h4>
                            <div className="post">
                              <p>ยังอยู่ในช่วงทดสอบระบบนะครับ</p>
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
        </div>
      </section>
    </div>
  );
};

export default Data_detail;
