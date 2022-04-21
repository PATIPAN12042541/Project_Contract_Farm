import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
        <li class="nav-item d-none d-sm-inline-block">
          <Link class="nav-link text-white" to="/">
            Home
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto ">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-bell text-white" />
            <span className="badge badge-danger navbar-badge">15</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">
              เเจ้งเตือนเวลา
            </span>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <i className="fas fa-envelope mr-2" /> แปลง A1
              <span className="float-right text-muted text-sm">3 day</span>
            </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <i className="fas fa-users mr-2" /> แปลง A3
              <span className="float-right text-muted text-sm">12 day</span>
            </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <i className="fas fa-file mr-2" /> แปลง A5
              <span className="float-right text-muted text-sm">2 day</span>
            </a>
            <div className="dropdown-divider" />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
