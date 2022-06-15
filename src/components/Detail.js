import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "./CSS/Detail.css";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import axios from "axios";

const Detail = () => {
  const [image_url, setImage_url] = useState([]);

  const getListChemical = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/master2`
    );
    setImage_url(response.data);
  };

  useEffect(() => {
    getListChemical();
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
            <div className="col-12">
              <div className="card card-success">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <center>
                    <h3 className="card-title">
                      คำแนะนำ การใช้สารป้องกันและกำจัดโรคพืช (กะเพรา,โหระพา)
                      ฤดูกาล 2564/2565
                    </h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    {image_url.map((data) => (
                      <div
                        className="col-md-12 col-lg-6 col-xl-3"
                        key={data.id}
                      >
                        <div className="card mb-2 container">
                          <div className="overlay">
                            <div className="name">{data.name_chemical}</div>
                            <div className="eu-mrl">
                              {"Eu-MRL : " + data.eu_mrl}
                            </div>
                          </div>
                          <img
                            className="img-set"
                            src={data.path_img}
                            width={250}
                            height={300}
                          />
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

export default Detail;
