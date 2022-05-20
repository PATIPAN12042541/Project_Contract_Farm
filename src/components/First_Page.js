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
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>65</h3>
                  <p>Unique Visitors</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph"></i>
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest Members</h3>
                  <div className="card-tools">
                    <span className="badge badge-danger">8 New Members</span>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>

                <div className="card-body p-0" style="display: block;">
                  <ul className="users-list clearfix">
                    <li>
                      <img src="dist/img/user1-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">
                        Alexander Pierce
                      </a>
                      <span className="users-list-date">Today</span>
                    </li>
                    <li>
                      <img src="dist/img/user8-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">
                        Norman
                      </a>
                      <span className="users-list-date">Yesterday</span>
                    </li>
                    <li>
                      <img src="dist/img/user7-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">
                        Jane
                      </a>
                      <span className="users-list-date">12 Jan</span>
                    </li>
                    <li>
                      <img src="dist/img/user6-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">
                        John
                      </a>
                      <span className="users-list-date">12 Jan</span>
                    </li>
                    <li>
                      <img src="dist/img/user2-160x160.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">
                        Alexander
                      </a>
                      <span className="users-list-date">13 Jan</span>
                    </li>
                    <li>
                      <img src="dist/img/user5-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">
                        Sarah
                      </a>
                      <span className="users-list-date">14 Jan</span>
                    </li>
                    <li>
                      <img src="dist/img/user4-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">
                        Nora
                      </a>
                      <span className="users-list-date">15 Jan</span>
                    </li>
                    <li>
                      <img src="dist/img/user3-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">
                        Nadia
                      </a>
                      <span className="users-list-date">15 Jan</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="card-footer text-center" style="display: block;">
                <a href="javascript:">View All Users</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div
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
                  <img
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div> */}
    </div>
  );
};

export default First_Page;
