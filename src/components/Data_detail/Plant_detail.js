import React, { useState, useEffect } from "react";
import axios from "axios";

const Plant_detail = (props) => {
  const [plantdetail, setPlantDetail] = useState([]);

  const getPlantData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant/plant_detail/${props.id}`
    );
    setPlantDetail(response.data);
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
            <div className="col-sm-12" />
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {plantdetail.map((data, index) => (
                <div className="card card-success">
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#8CC152" }}
                  >
                    <center>
                      <h3 className="card-title">
                        ปลูกผัก : {data.name_plant}
                      </h3>
                    </center>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12" key={index}>
                        <img
                          className="ima-size card-img-top"
                          src={data.plant_image}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button type="submit" class="btn btn-success float-right">
                      ยืนยัน
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plant_detail;