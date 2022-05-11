import React, { useEffect, useState } from "react";
import "./CSS/First_Page.css";

const First_Page = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]); 
  const [data, setData] = useState([]);

  useEffect(() => {

  lat = "14.8060348";
  long = "100.030848";

  await fetch(`${process.env.BASE_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
 
  }, [lat,long])

  return (
  <div className="content-wrapper">
    ทดสอบระบบ
  </div>
  );
};

export default First_Page;
