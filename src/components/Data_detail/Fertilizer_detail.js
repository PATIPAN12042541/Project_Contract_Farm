import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Zoom from "react-medium-image-zoom";

const Fertilizer_detail = (props) => {
  const [FertilizerData, setFertilizerData] = useState([]);

  const getFertilizerData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/FertilizerData/Detail/${props.id}`
    );
    setFertilizerData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getFertilizerData();
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
          {FertilizerData.map((data, index) => (
            <div className="row" key={index}>
              <div className="col-md-12" />
              <div className="card card-info">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <h1 className="card-title">รายละเอียด{data.name_thai}</h1>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <div className="col-12">
                        <Zoom>
                          <img
                            className="img-fluid"
                            src={data.path_img}
                            loading="lazy"
                          />
                        </Zoom>
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

export default Fertilizer_detail;
