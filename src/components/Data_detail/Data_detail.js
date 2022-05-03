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
          {datadetail.map((data, index) => (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="card card-info">
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#8CC152" }}
                  >
                    <h1 className="card-title">
                      รายละเอียดสารเคมีต่างๆ {data.name_chemical}
                    </h1>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-sm-4">
                        <div className="col-12">
                          <img
                            className="img-fluid mb-2"
                            src={data.path_image}
                            alt={data.name_chemical}
                            loading="lazy"
                          />
                          <ImageListItemBar
                            className="card-title text-primary text-white"
                            title={data.name_chemical}
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
                                    {data.start_date_plant}
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
                                    {data.end_date_plant}
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
                                    {data.quantity_chemical} {data.unit}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <h4>Note.</h4>
                              <div className="post">
                                <p>{data.note}</p>
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
          ))}
        </div>
      </section>
    </div>
  );
};

export default Data_detail;
