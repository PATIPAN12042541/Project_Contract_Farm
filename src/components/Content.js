import React, { useState, useEffect, useParams } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const Content = () => {
  const [plant, setPlant] = useState([]);

  console.log(plant); 
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
                    {plant.map((data, index) => (
                      <div className="col-md-12 col-lg-6 col-xl-4" key={index}>
                        <Link
                          //to={`/Data_detail/${data.id}`}
                          to={{
                            pathname: `/Data_detail/${data.id_plant}`,
                            state: { id: data.id_plant },
                          }}
                          params={data.id_plant}
                          className="text-white"
                        >
                          <div className="card mb-2 bg-gradient-dark">
                            <img
                              className="card-img-top"
                              src={`${data.plant_image}?w=248&fit=crop&auto=format`}
                              srcSet={`${data.plant_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                              alt={data.id_name_plant}
                              loading="lazy"
                              width={250}
                              height={300}
                            />
                            <div className="card-img-overlay d-flex flex-column justify-content-end">
                              <ImageListItemBar
                                className="card-title text-primary text-white"
                                title={"Plant " + data.id_name_plant}
                                subtitle={data.name_plant}
                              />
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
