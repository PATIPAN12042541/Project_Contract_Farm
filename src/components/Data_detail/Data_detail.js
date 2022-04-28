import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Content from "../Content";

const images = [
  { url: "../dist/img/insecticide/Pic_1.png" },
  { url: "../dist/img/insecticide/Pic_2.png" },
  { url: "../dist/img/insecticide/Pic_3.png" },
  { url: "../dist/img/insecticide/Pic_4.png" },
  { url: "../dist/img/insecticide/Pic_5.png" },
];

const Data_detail = () => {

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
                  <h1 className="card-title">รายละเอียดแปลง A1 </h1>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <div className="col-12">
                        <SimpleImageSlider
                          width={320}
                          height={350}
                          images={images}
                          showBullets={true}
                          showNavs={true}
                          style={{ backgroundColor: "#FFFFF" }}
                          autoPlay={true}
                          className="product-image"
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
                                  20/04/2022
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
                              <p>
                                Lorem ipsum represents a long-held tradition for
                                designers, typographers and the like. Some
                                people hate it and argue for its demise, but
                                others ignore.
                              </p>
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
