/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link } from "react-router-dom";


const SidebarDev = () => {
  return (
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
  );
};

export default SidebarDev;
