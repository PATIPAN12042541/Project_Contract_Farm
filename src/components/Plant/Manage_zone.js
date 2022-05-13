import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import form from "react-bootstrap/Form";
import Zoom from "react-medium-image-zoom";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import "../../../node_modules/@hawk-ui/file-upload/dist/index.min.css";
import FileUpload from "@hawk-ui/file-upload";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Manage_zone = () => {
  const [show, setShow] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShowEdit(false);
  const handleShow2 = () => setShowEdit(true);

  const [plant, setPlant] = useState([]);

  useEffect(() => {
    getPlant();
  }, []);

  const getPlant = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant`
    );

    setPlant(response.data);
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
                  <div className="row">
                    <div className="col-md-11">
                      <h1 className="card-title">จัดการโซนเพาะปลูก</h1>
                    </div>
                    <div className="col-md-1">
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={handleShow}
                      >
                        เพิ่มข้อมูล
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-hover">
                    <thead
                      style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}
                    >
                      <tr>
                        <th>#รหัสโซน</th>
                        <th>
                          <center>preview</center>
                        </th>
                        <th>
                          <center>ข้อมูลแปลงผัก</center>
                        </th>
                        <th>
                          <center>เเก้ไข/ลบข้อมูล</center>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {plant.map((data, index) => (
                        <tr key={index}>
                          <td className="col-md-2">{data.zone_name}</td>
                          <td className="col-md-7">
                            <center>
                              <Zoom>
                                <img
                                  src={data.image_zone}
                                  className="img-fluid mb-2"
                                  alt="white sample"
                                  width="100"
                                  height="100"
                                />
                              </Zoom>
                            </center>
                          </td>
                          <td className="col-md-1">
                            <center>
                              <Link
                                to={{
                                  pathname: `/Edit_data/${data.id}`,
                                  state: { id: data.id },
                                }}
                              >
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  style={{ color: "#FFFFFF" }}
                                >
                                  <BsFillExclamationCircleFill />
                                </button>
                              </Link>
                            </center>
                          </td>
                          <td className="col-md-2">
                            <center>
                              <button
                                type="submit"
                                className="btn btn-warning"
                                style={{ color: "#FFFFFF" }}
                                onClick={handleShow2}
                              >
                                <BsFillPencilFill />
                              </button>
                              <> </>
                              <button
                                type="submit"
                                className="btn btn-danger"
                                style={{ color: "#FFFFFF" }}
                              >
                                <BsFillTrashFill />
                              </button>
                            </center>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ### set modal ### */}
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <center>เพิ่มข้อมูล</center>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <form.Label>รหัสโซนเพาะปลูก</form.Label>

              <form.Control
                type="text"
                placeholder="รหัสโซนเพาะปลูก"
                autoFocus
              />
            </form.Group>
            <form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Row>
                <Col md>
                  <form.Label>อัพโหลด</form.Label>
                  <FileUpload
                    btnIcon="fas fa-upload"
                    multiple
                    accept="image/*"
                  />
                </Col>
                <Col md>
                  <form.Label>Preview</form.Label>
                  <img src="../dist/img/Plant2.jpg" className="img-fluid" />
                </Col>
              </Row>
            </form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-success"
            onClick={handleClose}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      {/* #### EDTT #### */}
      <Modal
        show={showEdit}
        onHide={handleClose2}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "rgb(140, 193, 82)",
            color: "#FFFFFF",
          }}
        >
          <Modal.Title centered>แก้ไขข้อมูล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <form.Label>รหัสโซนเพาะปลูก</form.Label>
              <form.Control
                type="text"
                placeholder="รหัสโซนเพาะปลูก"
                autoFocus
              />
            </form.Group>
            <form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Row>
                <Col md>
                  <form.Label>อัพโหลด</form.Label>
                  <FileUpload
                    btnIcon="fas fa-upload"
                    multiple
                    accept="image/*"
                  />
                </Col>
                <Col md>
                  <form.Label>Preview</form.Label>
                  <img src="../dist/img/Plant2.jpg" className="img-fluid" />
                </Col>
              </Row>
            </form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleClose2}
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-success"
            onClick={handleClose2}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Manage_zone;
