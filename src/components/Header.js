import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const history = useNavigate();
  const [checktime, setCheckTime] = useState([]);
  const [countchecktime, setCountCheckTime] = useState([]);

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
    console.log(response.data);
    setCountCheckTime(response.data.lenght);
  };

  useEffect(() => {
    getCheckTime();
  }, []);

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
          <Link className="nav-link text-white" to="/contract_farm">
            Home
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto ">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-bell text-white" />
            <span className="badge badge-danger navbar-badge">
              {countchecktime}
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">
              เเจ้งเตือนเวลา
            </span>
            {checktime.map((data, index) => {
              return (
                <>
                  <div className="dropdown-divider" />
                  <a
                    href={`http://node32367-env-0204914.th1.proen.cloud:3000/Page_chemical/${data.id_plant}`}
                    className="dropdown-item"
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
                </>
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
