/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";


const SidebarDev = () => {
  return (
    <aside className="main-sidebar sidebar-light-primary elevation-4">
      <Link
        to="/contract_farm"
        className="brand-link"
        style={{ backgroundColor: "#8CC152" }}
      >
        <img
          src="dist/img/sprout.png"
          alt="sprout"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light text-white">
          Contract Farming
        </span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user6-128x128.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Dev
            </a>
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column nav-child-indent"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <li className="nav-item">
                <a href="/contract_farm" className="nav-link">
                  <p>
                    ข้อมูลรายละเอียด
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link className="nav-link" to="/Home">
                      <i className="far fa-circle nav-icon"></i>
                      <p>แปลงผัก</p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link className="nav-link" to="/Detail">
                      <i className="far fa-circle nav-icon"></i>
                      <p>ข้อมูลเบื้องต้น</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </li>
            <li className="nav-item">
              <li className="nav-item">
                <a href="/contract_farm" className="nav-link">
                  <p>
                    จัดการข้อมูล
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/Edit_data" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>จัดการข้อมูล</p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link  className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>เมนู Dev</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </li>
            <li className="nav-item">
              <li className="nav-item">
                <a className="nav-link">
                  <p>
                    เพิ่มเติม
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/contract_farm" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>อื่นๆ</p>
                    </a>
                  </li>
                </ul>
              </li>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SidebarDev;
