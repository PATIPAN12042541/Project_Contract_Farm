import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import form from "react-bootstrap/Form";
import Zoom from "react-medium-image-zoom";
import { BsFillTrashFill } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";

const Manage_zone = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                    <thead>
                      <tr>
                        <th>#รหัสโซน</th>
                        <th>
                          <center>preview</center>
                        </th>
                        <th>
                          <center>ลบ/เเก้ไข</center>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>A1</td>
                        <td>
                          <center>
                            <Zoom>
                              <img
                                src="../dist/img/Plant2.jpg"
                                className="img-fluid mb-2"
                                alt="white sample"
                                width="100"
                                height="100"
                              />
                            </Zoom>
                          </center>
                        </td>
                        <td>
                          <center>
                            <button
                              type="submit"
                              className="btn btn-warning"
                              style={{ color: "#FFFFFF" }}
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
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <form.Label>Email address</form.Label>
              <form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </form.Group>
            <form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <form.Label>Example textarea</form.Label>
              <form.Control as="textarea" rows={3} />
            </form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button variant="primary" onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Manage_zone;
