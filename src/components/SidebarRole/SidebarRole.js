/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';
import SidebarDev from './SidebarDev';


const SidebarRole = () => {
    const [name, setName] = useState('');
    const [last_name,setLastName] = useState('');
    const [roleid, setRoleID] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useNavigate();

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
      } catch (error) {
        if (error.response) {
          history("/");
        }
      }
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
  if (roleid == 1){
      return <SidebarDev />
  }else if(roleid == 2){
      return <SidebarAdmin />
  }
};

export default SidebarRole;
