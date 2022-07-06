import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

const FertilizerUnit = () => {

  const [unitText, setUnitText] = useState([]);

  /*************** Modal *******************/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /******************************************/

  const PostUnitData = async(e) => {
    e.preventDefault();
    if (unitText == "") {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูล",
        text: "Save Error!",
      });
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/getChemical/PostFertilizerUnit`,
          {
            unit: unitText,
          }
        )
        .then(function (response) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Save OK !",
          });
          handleClose();
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: error,
            text: "Save Error!",
          });
        });
    }
  }
 
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
                    <h3 className="card-title">หน่วยนับของปุ๋ย</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <Button variant="success" onClick={handleShow}>
                      เพิ่มประเภทหน่วยนับ
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
                          <th>ประเภทหน่วย</th>
                          <th>ลบข้อมูล</th>
                        </tr>
                      </thead>
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
          <Modal.Title>เพิ่มประเภทหน่วยนับ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-horizontal">
            <div className="card-body">
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  ประเภทหน่วยนับ
                </Form.Label>
                <div className="col-sm-8">
                  <Form.Control
                    type="text"
                    className="form-control"
                    onChange={(e) => setUnitText(e.target.value)}
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
          <Button className="btn btn-success" onClick={PostUnitData}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};;

export default FertilizerUnit;
