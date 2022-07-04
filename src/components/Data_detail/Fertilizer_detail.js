import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
        <div className="container-fluid">ทดสอบเเสดงผล</div>
      </section>
    </div>
  );
};

export default Fertilizer_detail;
