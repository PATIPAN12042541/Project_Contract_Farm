import React, { useEffect, useState, useInterval } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTime } from "react-timer-hook";
import { Link } from "react-router-dom";
import "./CSS/Header.css";
import jwt_decode from "jwt-decode";

const Header = () => {
  const locale = "en";
  const [today, setDate] = React.useState(new Date());
  const [token, setToken] = useState("");

  const history = useNavigate();
  const [checktime, setCheckTime] = useState([]);
  const [temperature, setTemperature] = useState([]);

  const { seconds, minutes, hours, ampm } = useTime({
    format: "12-hour",
    hours: "2-digit",
    minutes: "2-digit",
    seconds: "2-digit",
  });

  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };

  const Logout = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/user/logout`);
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/token`
      );

      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);

      //console.log(decoded);

      if (decoded.role_id == "3") {
        getCheckTimeUser(decoded.userId);
      } else {
        getCheckTime();
      }
    } catch (error) {
      if (error.response) {
        history("/");
      }
    }
  };

  const getCheckTimeUser = async (user_id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/header/user/${user_id}`
    );
    setCheckTime(response.data);
  };

  const getCheckTime = async (user_id) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/header`);
    setCheckTime(response.data);
  };

  const get_api_weather2 = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5//weather/?lat=14.8060348&lon=100.030848&units=metric&APPID=f95c293c45ca886ddb11fec556e1cb16`
    )
      .then((res) => res.json())
      .then((result) => {
        setTemperature(result.main.temp);
      });
  };

  useEffect(() => {
    refreshToken();
    //getCheckTime();
    get_api_weather2();
  }, []);

  // Function Date
  const day = today.toLocaleDateString(locale, { weekday: "long" });

  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  })}\n\n`;

  const changePage = () => {};

  return (
    <nav
      className="main-header navbar navbar-expand navbar-white navbar-light"
      style={{ backgroundColor: "#8CC152" }}
    >
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars text-white" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <span className="nav-link text-white">
            {date}
            {"เวลา "}
            <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:
            <span>{formatTime(seconds)}</span>
            <span> {ampm}</span>
          </span>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto ">
        <li className="nav-item  change-page">
          <Link to="/weather">
            <span className="nav-link text-white">
              อุณหภูมิวันนี้ {Math.round(temperature)} °C
            </span>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-bell text-white" />
            <span className="badge badge-danger navbar-badge">
              {checktime.length}
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            {checktime.length == "0" ? (
              <span className="dropdown-item dropdown-header">ไม่พบข้อมูล</span>
            ) : (
              <span className="dropdown-item dropdown-header">
                เเจ้งเตือนเวลา
              </span>
            )}
            {checktime.map((data, index) => {
              return (
                <a
                  href={`http://node33263-env-7309918.th1.proen.cloud:3000/Page_chemical/${data.id_plant}`}
                  className="dropdown-item"
                  key={index}
                >
                  <i className="fas fa-envelope mr-2" />{" "}
                  {data.zone_name +
                    "-" +
                    data.id_name_plant +
                    " " +
                    "แปลง" +
                    data.name_plant}
                  <span
                    // className="float-right text-muted text-sm"
                    className="set-drowdown text-sm"
                  >
                    {" "}
                    {data.end_date_plant}
                  </span>
                </a>
              );
            })}
          </div>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="fas fa-sign-out-alt text-white" />
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <div className="dropdown-divider" />
            <button onClick={Logout} className="dropdown-item">
              <i className="fas fa-sign-out-alt mr-2" /> ออกจากระบบ
            </button>
            <div className="dropdown-divider" />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
