import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const locale = "en";
  const [today, setDate] = React.useState(new Date());

  const history = useNavigate();
  const [checktime, setCheckTime] = useState([]);
  const [temperature, setTemperature] = useState([]);

  const Logout = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/user/logout`);
      //await axios.delete('http://node30998-env-3297740.th1.proen.cloud:4000/user/logout');
      //await axios.delete('http://localhost:4000/user/logout');
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getCheckTime = async () => {
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
    getCheckTime();
    get_api_weather2();

    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;

  const hour = today.getHours();

  const wish = `Good ${
    (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
  } `;

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

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
            {time}
            {" || "}
            {wish}
            {" || "}
          </span>
        </li>
        {/* <li className="nav-item d-none d-sm-inline-block">
          <Link className="nav-link text-white" to="/contract_farm">
            Home
          </Link>
        </li> */}
      </ul>
      <ul className="navbar-nav ml-auto ">
        <li className="nav-item d-none d-sm-inline-block">
          <span className="nav-link text-white">
            อุณหภูมิวันนี้ {Math.round(temperature)} °C
          </span>
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
                  href={`http://node32367-env-0204914.th1.proen.cloud:3000/Page_chemical/${data.id_plant}`}
                  className="dropdown-item"
                  key={index}
                >
                  <i className="fas fa-envelope mr-2" />{" "}
                  {data.zone_name +
                    "-" +
                    data.id_name_plant +
                    " " +
                    data.name_plant}
                  <span className="float-right text-muted text-sm">
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
