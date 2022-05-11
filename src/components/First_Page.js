import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./CSS/First_Page.css";

const First_Page = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]); 
  const [data, setData] = useState([]);

  
  await axios.get(`${process.env.BASE_URL}/weather/?lat=14.8060348&lon=100.030848&units=metric&APPID=${process.env.API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
 


  return (
  <div className="content-wrapper">
    ทดสอบระบบ
  </div>
  );
};

export default First_Page;
