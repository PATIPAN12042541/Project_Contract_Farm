/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const SidebarAdmin = () => {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useNavigate();

    useEffect(() => {
      refreshToken();
      getUsers();
    }, []);


    const refreshToken = async () => {
      try {
        const response = await axios.get('http://node30998-env-3297740.th1.proen.cloud:4000/user/token');
        //const response = await axios.get('http://localhost:4000/user/token');
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setLastName(decoded.lastname);
        setExpire(decoded.exp);
      } catch (error) {
        if (error.response) {
          history("/");
        }
      }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://node30998-env-3297740.th1.proen.cloud:4000/user/token');
        //const response = await axios.get('http://localhost:4000/user/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setLastName(decoded.lastname);
        setExpire(decoded.exp);
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    const getUsers = async () => {
      const response = await axiosJWT.get('http://node30998-env-3297740.th1.proen.cloud:4000/check_users', {
      //const response = await axiosJWT.get('http://localhost:4000/check_users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    }
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
              {name}
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
                      <p>จัดการข้อมูล</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </li>
            <li class="nav-item">
              <li class="nav-item">
                <a class="nav-link">
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
