import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



const Content = () => {
  const [plant, setPlant] = useState([]);

  useEffect(() => {
    getPlant();
  }, []);

  const getPlant = async () => {
    const response = await axios.get(
      "http://node30998-env-3297740.th1.proen.cloud:4000/getplant"
    );

    setPlant(response.data);
  };

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
                    <h3 className="card-title">แปลงปลูกผัก</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    {plant.map((data, index) => (
                      <div
                        className="col-md-12 col-lg-6 col-xl-4"
                        key={data.id_plant}
                      >
                        <Link to="/Data_detail" className="text-white">
                        <div className="card mb-2 bg-gradient-dark">
                          <img
                            className="card-img-top"
                            src={data.plant_image}
                            alt="Dist Photo 1"
                            width={250}
                            height={300}
                          />
                          <div className="card-img-overlay d-flex flex-column justify-content-end">
                            <h1 className="card-title text-primary text-white">
                              Plant {data.id_name_plant}
                            </h1>
                            <p className="card-text text-white pb-3 pt-1">
                              {data.name_plant}
                            </p>
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

export default Content;
