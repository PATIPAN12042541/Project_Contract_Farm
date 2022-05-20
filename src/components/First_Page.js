import { Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CSS/First_Page.css";

const First_Page = () => {
  const [data, setData] = useState([]);

  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

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
      <div
        className={
          typeof data.main != "undefined"
            ? data.main.temp > 18
              ? "App hot"
              : "App cold"
            : "App"
        }
      >
        <main>
          {typeof data.main != "undefined" ? (
            <div>
              <div className="location-container">
                <div className="location">
                  {data.name}, {data.sys.country}
                </div>
                <div className="date"> {dateBuild(new Date())}</div>
              </div>
              <div className="weather-container">
                <div className="temperature">
                  {Math.round(data.main.temp)}°C
                </div>
                <div className="weather">
                  {data.weather[0].main}
                  <image url="http://openweathermap.org/img/wn/10d@2x.png"/>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
    </div>
  );
};

export default First_Page;
