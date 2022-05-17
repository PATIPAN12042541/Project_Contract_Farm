import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Zoom from "react-medium-image-zoom";

const Manage_plant_chemical = (props) => {
  const [getChemical, setGetChemical] = useState([]);

  const getChemicals = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical`
    );
    setGetChemical(response.data);
  };

  return (
    <div className="content-wrapper">
      จัดการข้อมูล
      <div className="form-group">
        <label>ชื่อสารเคมีที่ใช้</label>
        <select className="form-control" placeholder="">
          {getChemical.map((Chemical, index) => {
            return <option key={index}>{Chemical.name_chemical}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default Manage_plant_chemical;
