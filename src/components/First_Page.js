import React, { useEffect, useState } from "react";
import "./CSS/First_Page.css";

const First_Page = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    console.log("Latitude is:", lat);
    console.log("Longitude is:", long);
  }, [lat, long]);

  return <div className="content-wrapper">ทดสอบ พยากรอากาศ</div>;
};

export default First_Page;
