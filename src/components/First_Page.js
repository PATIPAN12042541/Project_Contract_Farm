import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./CSS/First_Page.css";

const First_Page = () => {

  const [data, setData] = useState([]);

  
  const get_api_weather = async () => {
    await axios
      .get(
        `${process.env.BASE_URL}/weather/?lat=14.8060348&lon=100.030848&units=metric&APPID=${process.env.API_KEY}`
      )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
      });
  };

  useEffect(() => {
    get_api_weather();
  }, []);


  return (
  <div className="content-wrapper">
    ทดสอบระบบ
  </div>
  );
};

export default First_Page;
