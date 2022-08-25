import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BsTrashFill } from "react-icons/bs";

const Plant_master_type = () => {
  const [TypeMasterPlant, setTypeMasterPlant] = useState([]);

  const getTypeMasterPlant = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/plant/getPlantMasterType`
    );
    setTypeMasterPlant(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getTypeMasterPlant();
  }, []);

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
                    <h3 className="card-title">ประเภทพืช Master</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <Button variant="success">เพิ่มประเภทพืช</Button>
                  </div>
                  <hr />
                  <div className="row">
                    <Table
                      className="table table-bordered table-hover dataTable dtr-inline"
                      responsive
                    >
                      <thead>
                        <tr>
                          <th>ลำดับ</th>
                          <th>ประเภทพืช Master</th>
                          <th>
                            <center>แก้ไขข้อมูล</center>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {TypeMasterPlant.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.type_plant_name}</td>
                            <td>
                              <center>
                                <Button variant="danger">
                                  <BsTrashFill />
                                </Button>
                              </center>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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

export default Plant_master_type;
