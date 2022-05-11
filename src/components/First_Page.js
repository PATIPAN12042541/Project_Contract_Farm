import React, { useEffect, useState } from "react";
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
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 18
              ? "App hot"
              : "App cold"
            : "App"
        }
      >
        <main>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-container">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date"> {dateBuild(new Date())}</div>
              </div>
              <div className="weather-container">
                <div className="temperature">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather">{weather.weather[0].main}</div>
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
