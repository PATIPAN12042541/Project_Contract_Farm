import { Icon } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "./CSS/First_Page.css";

const First_Page = () => {
  const [data, setData] = useState([]);

  const dateBuild = (d) => {
    //let date = String(new window.Date());
    let date2 = moment(Date()).format("DD-MMM-YYYY");

    return date2;
  };

  const get_api_weather = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5//weather/?lat=14.8060348&lon=100.030848&units=metric&APPID=f95c293c45ca886ddb11fec556e1cb16`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  };

  useEffect(() => {
    get_api_weather();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">สภาพอากาศ</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div
                className={
                  typeof data.main != "undefined"
                    ? data.weather[0].main == "Clouds"
                      ? "App clouds"
                      : data.weather[0].main == "Rain"
                      ? "App rain"
                      : data.weather[0].main == "Thunderstorm"
                      ? "App thunderstorm"
                      : data.weather[0].main == "Shower rain"
                      ? "App shower-rain"
                      : data.weather[0].main == "Broken clouds"
                      ? "App clouds"
                      : data.weather[0].main == "Few clouds"
                      ? "App clouds"
                      : data.weather[0].main == "Mist"
                      ? "App mist"
                      : "App clear-sky"
                    : "App"
                }
              >
                {typeof data.main != "undefined" ? (
                  <div>
                    <div className="row">
                      <div className="col-sm-10">
                        <div className="location-container">
                          <div className="location">
                            {data.name}, {data.sys.country}
                          </div>
                          <div className="date"> {dateBuild(new Date())}</div>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="weather-container">
                          <div className="weather">
                            <img
                              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                            />
                            {data.weather[0].main}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="weather-container">
                      <div className="temperature">
                        {Math.round(data.main.temp)}°C
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default First_Page;
