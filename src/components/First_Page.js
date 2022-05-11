import React, { useState } from "react";
import "./CSS/First_Page.css";


const First_Page = () => {
  //////
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const api = {
    key: process.env.API_KEY,
    base: process.env.BASE_URL,
  };

  // function search api
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(
        `${api.base}weather?lat=${query}&units=metric&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };
  // function check date
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

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
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-bar"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
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
