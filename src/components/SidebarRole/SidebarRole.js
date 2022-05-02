/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const SidebarRole = () => {
    const [name, setName] = useState('');
    const [last_name,setLastName] = useState('');
    const [roleid, setRoleID] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [mainmenu,setMainMenu] = useState([]);
    const [submenulv1,setSubMenuLV1] = useState([]);
    const history = useNavigate

    useEffect(() => {
      refreshToken();
      //getUsers();
    }, []);


    const refreshToken = async () => {
      try {
        //const response = await axios.get('http://node30998-env-3297740.th1.proen.cloud:4000/user/token');

        // const response = await axios.get("http://localhost:4000/user/token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/token`
        );
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setLastName(decoded.last_name);
        setRoleID(decoded.role_id);
        setExpire(decoded.exp);

        const menu = await axios.get(`${process.env.REACT_APP_API_URL}/menu/main/${decoded.role_id}`)
        setMainMenu(menu.data);

      } catch (error) {
        if (error.response) {
          history("/");
        }
      }
    }

    const menusublv1 = async(role_id,parentid) => {
        const menu_lv1 = await axios.get(`${process.env.REACT_APP_API_URL}/menu/sublv1/${role_id}/${parentid}`);
        setSubMenuLV1(menu_lv1.data);
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/token`
          );
          //const response = await axios.get('http://localhost:4000/user/token');
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setName(decoded.name);
          setLastName(decoded.last_name);
          setRoleID(decoded.role_id);
          setExpire(decoded.exp);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const getUsers = async () => {
      const response = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/check_users`,
        {
          //const response = await axiosJWT.get('http://localhost:4000/check_users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
    };
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
                  {name} {last_name}
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
                {mainmenu.map((item,index)=>{
                    return (
                        <li className="nav-item" 
                            key={index}
                            onClick={(e)=>{
                              menusublv1(item.role_id,item.id);
                            }}>
                            <Link to={item.link} className="nav-link">
                                <p>
                                {item.menu_name}
                                <i className="fas fa-angle-left right"></i>
                                </p>
                            </Link>
                            {submenulv1.map((item_lv1)=>{
                                return(
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={item_lv1.link}>
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>{item_lv1.menu_name}</p>
                                            </Link>
                                        </li>
                                    </ul>
                                )
                            })}
                        </li>
                    );
                })}
                {/* <li className="nav-item">
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
                </li> */}
              </ul>
            </nav>
          </div>
        </aside>
      );
};


export default SidebarRole;
