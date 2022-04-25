import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

  // {
  //   id: "A1",
  //   name: "ปลูกกระเพรา",
  //   url: "../dist/img/holy_basil.jpg",
  // },
  // {
  //   id: "A2",
  //   name: "ปลูกพริก",
  //   url: "../dist/img/cili.jpg",
  // },
  // {
  //   id: "A3",
  //   name: "ปลูกมะเขือ",
  //   url: "../dist/img/Thai-Eggplant-2.jpg",
  // },
  // {
  //   id: "A4",
  //   name: "ปลูกแตงกวา",
  //   url: "../dist/img/images2.jpg",
  // },
  // {
  //   id: "A5",
  //   name: "ผักกาดขาว",
  //   url: "../dist/img/images.jpg",
  // },

const Content = () => {
  const [plant, setPlant] = useState([]);

  useEffect(() => {
    getPlant();
  }, []);

  const getPlant = async () => {
    const response = await axios.get(
      "http://node30998-env-3297740.th1.proen.cloud:4000/plant"
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
                              Plant {data.id_plant}
                            </h1>
                            <p className="card-text text-white pb-3 pt-1">
                              {data.name_plant}
                            </p>
                            <Link to="/Data_detail" className="text-white">
                              Click Me
                            </Link>
                          </div>
                        </div>
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
