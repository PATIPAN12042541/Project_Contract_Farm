import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./CSS/First_Page.css";

const First_Page = () => {

  const [data, setData] = useState([]);

  
  const get_api_weather = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5//weather/?lat=14.8060348&lon=100.030848&units=metric&APPID=f95c293c45ca886ddb11fec556e1cb16`
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
