import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Plant.css";
import moment from "moment";
import { Link } from "react-router-dom";

const Plant = (props) => {
  const [datadetail, setDatadetail] = useState([]);
  

  const getPlantData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant/plant/${props.id}`
    );
    setDatadetail(response.data);
  };


  useEffect(() => {
    getPlantData();
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-12"></div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-success">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <center>
                    <h3 className="card-title">แปลงเพาะปลูก</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    {datadetail.map((data, index) => (
                      <div className="col-md-12" key={index}>
                        <Link
                          to={{
                            pathname: `/Page_chemical/${data.id_plants}`,
                            state: { id: data.id_plants },
                          }}
                          params={data.id_plants}
                          className="text-white"
                        >
                          <div className="card mb-12 bg-gradient-white">
                            <div className="container">
                              <div className="position-relative">
                                {data.status_check == "0" ? (
                                  <div className="ribbon-wrapper ribbon-lg">
                                    <div className="ribbon bg-success text-lg">
                                      เสร็จสิ้น
                                    </div>
                                  </div>
                                ) : moment(new Date()).format("YYYY-MM-DD") >
                                    data.end_date_plant &&
                                  data.status_check !== "0" ? (
                                  <div className="ribbon-wrapper ribbon-lg">
                                    <div className="ribbon bg-danger text-lg">
                                      หมดเวลา
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <div className="text-block-code">
                                  {data.zone_name + "-" + data.id_name_plant}
                                </div>
                                <div className="text-block-Plant">
                                  {data.name_plant}
                                </div>
                                <div className="text-block-stdate">
                                  วันที่เริ่มปลูก :{" "}
                                  {moment(data.start_date_plant).format(
                                    "DD-MM-YYYY"
                                  )}
                                </div>
                                <div className="text-block-eddate">
                                  วันที่สิ้นสุด :{" "}
                                  {moment(data.end_date_plant).format(
                                    "DD-MM-YYYY"
                                  )}
                                </div>

                                <img
                                  className="ima-size card-img-top"
                                  src={data.plant_image}
                                />
                                <div className="text-block-name">
                                  ผู้รับผิดชอบ : นาย {data.name} นามสกุล{" "}
                                  {data.last_name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
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

export default Plant;
