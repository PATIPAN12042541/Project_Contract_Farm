import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";

const FertilizerUnit = () => {
  const [getUnit, setGetUnit] = useState([]);
  const [unitText, setUnitText] = useState([]);

  /*************** Modal *******************/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /******************************************/

  const getUnitData = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/FertilizerUnit`
    );
    setGetUnit(response.data);
    // console.log(response.data);
  };

  const PostUnitData = async (e) => {
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
          getUnitData();
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

  const deleteUnitData = async (id) => {
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
            `${process.env.REACT_APP_API_URL}/getChemical/DeleteFertilizerUnit/${id}`
          )
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Delete Success!",
            });

            getUnitData();
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

  useEffect(() => {
    getUnitData();
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
                      <tbody>
                        {getUnit.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.unit}</td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={(e) => deleteUnitData(data.id)}
                              >
                                <BsTrashFill /> ลบข้อมูล
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
