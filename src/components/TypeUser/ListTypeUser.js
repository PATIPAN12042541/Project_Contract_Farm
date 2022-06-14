import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ListTypeUser = () => {
  const [listTypeUser, setListTypeUser] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [typeUser, setTypeUser] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const AddTypeUser = async (e) => {
    e.preventDefault();
    if (typeUser == "") {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูล",
        text: "Save Error!",
      });
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/role_group/createTypeRole`, {
          role_group_name: typeUser,
          status: checked,
        })
        .then(function (response) {
          getListTypeUser();
          handleClose();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Save OK !",
          });
          navigate("/ListTypeUser");
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

  useEffect(() => {
    getListTypeUser();
  }, []);

  const getListTypeUser = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/role_group`
    );
    setListTypeUser(response.data);
  };

  const deleteTypeUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want Delete !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(
            `${process.env.REACT_APP_API_URL}/role_group/deleteTypeUser/${id}`
          )
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Delete Success!",
            });

            getListTypeUser();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Delete Fail!",
              text: error,
            });
          });
      }
    });
  };

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
                    <h3 className="card-title">ประเภทผู้ใช้งานระบบ</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <Button variant="success" onClick={handleShow}>
                      เพิ่มประเภทผู้ใช้งานระบบ
                    </Button>
                    {/* <Link to={"/AddTypeUser"}>
                      <Button variant="success" onClick={handleShow}>
                        เพิ่มประเภทผู้ใช้งานระบบ
                      </Button>
                    </Link> */}
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
                          <th>ประเภทผู้ใช้งานระบบ</th>
                          <th>แก้ไขข้อมูล</th>
                          <th>ลบข้อมูล</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listTypeUser.map((listTypeUser, index) => (
                          <tr key={listTypeUser.id}>
                            <td>{index + 1}</td>
                            <td>{listTypeUser.role_group_name}</td>
                            <td>
                              <Link to={`/UpdateTypeUser/${listTypeUser.id}`}>
                                <Button variant="info">แก้ไขข้อมูล</Button>
                              </Link>
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={(e) => deleteTypeUser(listTypeUser.id)}
                              >
                                ลบข้อมูล
                              </Button>
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
          }}
        >
          <Modal.Title>เพิ่มประเภทผู้ใช้งานระบบ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-horizontal" onSubmit={AddTypeUser}>
            <div className="card-body">
              <div className="form-group row">
                <Form.Label className="col-sm-5 col-form-label">
                  ประเภทผู้ใช้งานระบบ
                </Form.Label>
                <div className="col-sm-7">
                  <Form.Control
                    type="text"
                    className="form-control"
                    onChange={(e) => setTypeUser(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-5 col-form-label">
                  Active Status
                </Form.Label>
                <div className="col-sm-7 col-form-label">
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
          <button
            type="button"
            className="btn btn-success"
            onClick={AddTypeUser}
          >
            บันทึก
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListTypeUser