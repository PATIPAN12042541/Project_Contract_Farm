import React from "react";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <aside className="main-sidebar sidebar-light-primary elevation-4">
      <Link
        to="/"
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
              Robert Patricia
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
            <li class="nav-item">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <p>
                    ข้อมูลรายละเอียด
                    <i class="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <Link className="nav-link" to="/Home">
                      <i class="far fa-circle nav-icon"></i>
                      <p>แปลงผัก</p>
                    </Link>
                  </li>
                </ul>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <Link className="nav-link" to="/Detail">
                      <i class="far fa-circle nav-icon"></i>
                      <p>ข้อมูลเบื้องต้น</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </li>
            <li class="nav-item">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <p>
                    จัดการข้อมูล
                    <i class="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <Link to="/Edit_data" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>เพิ่มข้อมูล</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </li>
            <li class="nav-item">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <p>
                    เพิ่มเติม
                    <i class="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="/#" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
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

export default SidebarAdmin;
