import React, { useState, useEffect, useParams } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { AiOutlineEdit } from "react-icons/ai";
import "./CSS/Zone_plant.css";

import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const [plant, setPlant] = useState([]);
  const [roleid, setRoleID] = useState("");
  const [Userid, setUserID] = useState("");
  const [token, setToken] = useState("");
  const history = useNavigate();

  useEffect(() => {
    getPlant();
    refreshToken();
  }, []);

  const getPlant = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant`
    );

    setPlant(response.data);
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/token`
      );
      
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);

      console.log(decoded);

      setUserID(decoded.userId);
      setRoleID(decoded.role_id);
    } catch (error) {
      if (error.response) {
        history("/");
      }
    }
  };

  console.log("Role ID : " + roleid + " User ID : " + Userid);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-12"></div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-success">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <center>
                    <h3 className="card-title">โซนเพาะปลูก</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    {plant.map((data, index) => (
                      <div className="col-md-12 col-lg-6 col-xl-4" key={index}>
                        <div className="card mb-2 bg-gradient-white">
                          <Link
                            to={{
                              pathname: `/Data_detail/${data.id}`,
                              state: { id: data.id },
                            }}
                            params={data.id}
                            className="text-white"
                          >
                            <img
                              className="card-img-top"
                              src={`${data.image_zone}?w=248&fit=crop&auto=format`}
                              srcSet={`${data.image_zone}?w=248&fit=crop&auto=format&dpr=2 2x`}
                              loading="lazy"
                              width={250}
                              height={300}
                            />
                            <div className="card-img-overlay d-flex flex-column justify-content-end">
                              <center>
                                <ImageListItemBar
                                  className="card-title text-primary text-white"
                                  title={"Zone " + data.zone_name}
                                />
                              </center>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
