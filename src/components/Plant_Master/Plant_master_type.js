import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";

const Plant_master_type = () => {
  /* Query Data */
  const [TypeMasterPlant, setTypeMasterPlant] = useState([]);

  /* Modal Add */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* Modal Edit */
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


  /* Post data */
  const [editPlantMasterID, setEditPlantMasterID] = useState([]);
  const [checked, setChecked] = useState(false);
  const [NameTypePlant, setNameTypePlant] = useState([]);

  const getTypeMasterPlant = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/plant/getPlantMasterType`
    );
    setTypeMasterPlant(response.data);
    console.log(response.data);
  };

  const AddTypePlantMaster = async (e) => {
    e.preventDefault();
    if (NameTypePlant == "") {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูล",
        text: "Save Error!",
      });
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/getplant/plant/PostPlantMasterType`,
          {
            type_plant_name: NameTypePlant,
            status_: checked,
          }
        )
        .then(function (response) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Save OK !",
          });
          handleClose();
          getTypeMasterPlant();
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: error,
            text: "Save Error!",
          });
        });
    }
  };

  const updatePlantMaster = async (id) => {
    console.log("ID : " + id);
    console.log("checked : " + checked);
    console.log("NameTypePlant : " + NameTypePlant);
    // try {
    //   await axios.patch(
    //     `${process.env.REACT_APP_API_URL}/chemical/getTypeChemical/${id}`,
    //     {
    //       type_plant_name: typeChemical,
    //       status_: checked,
    //     }
    //   );
    //   Swal.fire({
    //     icon: "success",
    //     title: "Success",
    //     text: "Update Success!",
    //   });
    //   handleClose2();
    //   getTypeMasterPlant();
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Update Fail!",
    //     text: error,
    //   });
    // }
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
                    <Button onClick={handleShow} variant="success">
                      เพิ่มประเภทพืช
                    </Button>
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
                                <Button
                                  variant="warning"
                                  style={{ color: "#ffff" }}
                                  onClick={() => {
                                    handleShow2();
                                    setNameTypePlant(data.type_plant_name);
                                    setChecked(data.status_);
                                    setEditPlantMasterID(data.id);
                                  }}
                                >
                                  <AiFillEdit /> แก้ไขข้อมูล
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{
            backgroundColor: "rgb(140, 193, 82)",
            color: "#FFFFFF",
            fontSize: "24px",
            borderLine: "none",
          }}
        >
          <Modal.Title>เพิ่มประเภทพืช Master</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-horizontal">
            <div className="card-body">
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  ชื่อประเภทพืข Master
                </Form.Label>
                <div className="col-sm-8">
                  <Form.Control
                    type="text"
                    className="form-control"
                    onChange={(e) => setNameTypePlant(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  Active Status
                </Form.Label>
                <div className="col-sm-8 col-form-label">
                  <input
                    type="checkbox"
                    id="custom-switch"
                    onChange={(e) => {
                      setChecked(!checked);
                    }}
                  />
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn btn-default" onClick={handleClose}>
            ย้อนกลับ
          </Button>
          &nbsp;
          <button
            type="submit"
            className="btn btn-success"
            onClick={AddTypePlantMaster}
          >
            บันทึก
          </button>
        </Modal.Footer>
      </Modal>

      {/*  Edit Plant Master */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header
          style={{
            backgroundColor: "rgb(140, 193, 82)",
            color: "#FFFFFF",
            fontSize: "24px",
            borderLine: "none",
          }}
        >
          <Modal.Title>แก้ไขประเภทพืช Master</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-horizontal">
            <div className="card-body">
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  ชื่อประเภทพืข Master
                </Form.Label>
                <div className="col-sm-8">
                  <Form.Control
                    type="text"
                    className="form-control"
                    defaultValue={NameTypePlant}
                    onChange={(e) => setNameTypePlant(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  Active Status
                </Form.Label>
                <div className="col-sm-8 col-form-label">
                  <input
                    type="checkbox"
                    id="custom-switch"
                    checked={checked}
                    name={checked ? 1 : 0}
                    onChange={(e) => {
                      setChecked(!checked);
                    }}
                  />
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={handleClose2}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={updatePlantMaster(editPlantMasterID)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Plant_master_type;
