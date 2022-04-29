import React, { useState, useEffect, useParams } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";

const Content = () => {
  const [plant, setPlant] = useState([]);

  useEffect(() => {
    getPlant();
  }, []);

  const getPlant = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant`
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
                    <div className="col-md-12">
                      <ImageList sx={{ width: 1350 }}>
                        {plant.map((data, index) => (
                          <ImageListItem key={index}>
                            <Link
                              to={{
                                pathname: `/Data_detail/${data.id}`,
                                state: { id: data.id },
                              }}
                            >
                              <img
                                src={`${data.plant_image}?w=248&fit=crop&auto=format`}
                                srcSet={`${data.plant_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={data.id_name_plant}
                                loading="lazy"
                                sx={{ width: 300, hight: 300 }}
                              />
                              <ImageListItemBar title={data.id_name_plant} />
                            </Link>
                          </ImageListItem>
                        ))}
                      </ImageList>

                      {/* <div className="card mb-2 bg-gradient-dark">
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
                          </div> */}
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

export default Content;
