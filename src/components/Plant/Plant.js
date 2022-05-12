import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const Plant = (props) => {

 const [datadetail, setDatadetail] = useState([]);

 const getPlantData = async () => {
   const response = await axios.get(
     `${process.env.REACT_APP_API_URL}/zoneplant/plant/${props.id}`
   );
   setDatadetail(response.data);
   console.log(response.data);
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
                            pathname: `/Data_detail/${data.id}`,
                            state: { id: data.id },
                          }}
                          params={data.id}
                          className="text-white"
                        >
                          <div className="card mb-12 bg-gradient-dark">
                            {/* <img
                              className="card-img-top"
                              src={`${data.plant_image}?w=248&fit=crop&auto=format`}
                              srcSet={`${data.plant_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                              loading="lazy"
                              width={250}
                              height={300}
                            /> */}
                            <img
                              src={data.plant_image}
                              alt="Snow"
                              width={250}
                              height={300}
                            />
                            <div class="bottom-left">Bottom Left</div>
                            <div class="top-left">Top Left</div>
                            <div class="top-right">Top Right</div>
                            <div class="bottom-right">Bottom Right</div>
                            <div class="centered">Centered</div>
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
