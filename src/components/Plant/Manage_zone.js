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
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const Manage_zone = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShowEdit(false);
  const handleShow2 = () => setShowEdit(true);

  const [plant, setPlant] = useState([]);
  const [id, setID] = useState([]);
  const [idzone, setIdZone] = useState([]);
  const [pathimage, setPathImage] = useState([]);

  const [image, setImage] = useState({ preview: "", data: "" });
  const [image_name, setImageName] = useState();

  const postData = () => postZone();

  useEffect(() => {
    getPlant();
  }, []);

  const getPlant = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant`
    );

    setPlant(response.data);
  };

  const uploadImg = async () => {
    let formData = new FormData();
    formData.append("file", image.data);
    console.log(formData);
    
    if (image.size > 1000000) {
      Swal.fire({
        icon: "error",
        title: "กรุณา Upload File ให้หน่อยกว่า 1 MB",
        text: "Save Error!",
      });
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/public/dist/img/`, formData)
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    }
  };

  // Post Data
  const postZone = async () => {
    const autoid = uuidv4();
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/zoneplant/postZone`, {
          zone_name: idzone,
          image_zone: image_name,
          auto_id_zone: autoid,
        })
        .then(function (response) {
          getPlant();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Save OK !",
          });
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: error.response.data.msg,
            text: "Save Error!",
          });
        });

      uploadImg();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.msg,
        text: "Save Error!",
      });
    }
  };

  // delete data
  const deleteZone = async (id) => {
    Swal.fire({
      title: "Are you sure delete?",
      text: "You want delete data !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.REACT_APP_API_URL}/zoneplant/DeleteZone/${id}`
          );
          getPlant();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: error.response.data.msg,
            text: "error.response.data.msg !",
          });
        }
      }
    });
  };

  const updateZone = async (id) => {
    try {
      if (image_name === undefined) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/zoneplant/UpdateZone/${id}`,
          {
            zone_name: idzone,
            image_zone: "../dist/img/" + image_name,
          }
        );
      } else {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/zoneplant/UpdateZone/${id}`,
          {
            zone_name: idzone,
            image_zone: "../dist/img/" + image_name,
          }
        );

        uploadImg();
      }
      getPlant();
      Swal.fire("Succes !", "Your file has been Update.", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        text: "Update Error!",
      });
    }
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
                        style={({ width: "100%" }, { display: "block" })}
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
                        <th>#</th>
                        <th>
                          <center>preview</center>
                        </th>
                        <th>
                          <center>เเก้ไข/ลบข้อมูล</center>
                        </th>
                        <th>
                          <center>ข้อมูลแปลงผัก</center>
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

                          <td className="col-md-2">
                            <center>
                              <button
                                type="submit"
                                className="btn btn-warning"
                                style={{ color: "#FFFFFF" }}
                                onClick={() => {
                                  setIdZone(data.zone_name);
                                  setID(data.id);
                                  setPathImage(data.image_zone);
                                  handleShow2();
                                }}
                              >
                                <BsFillPencilFill />
                              </button>
                              <> </>
                              <button
                                type="submit"
                                className="btn btn-danger"
                                style={{ color: "#FFFFFF" }}
                                onClick={() => {
                                  deleteZone(data.id);
                                }}
                              >
                                <BsFillTrashFill />
                              </button>
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
      >
        <Modal.Header
          style={{
            backgroundColor: "rgb(140, 193, 82)",
            color: "#FFFFFF",
          }}
        >
          <Modal.Title>
            <center>เพิ่มข้อมูล</center>
          </Modal.Title>
          <span
            style={({ color: "#FFFFF" }, { cursor: "pointer" })}
            onClick={handleClose}
          >
            &times;
          </span>
        </Modal.Header>
        <Modal.Body>
          <form>
            <form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <form.Label>รหัสโซนเพาะปลูก</form.Label>
              <form.Control
                type="text"
                placeholder="รหัสโซนเพาะปลูก"
                defaultValue={idzone}
                autoFocus
                onChange={(e) => setIdZone(e.target.value)}
              />
            </form.Group>
            <form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <hr></hr>
              <Row>
                <Col md>
                  <form.Label>อัพโหลด</form.Label>
                  <FileUpload
                    btnIcon="fas fa-upload"
                    multiple
                    accept="image/*"
                    onUpload={(file) => {
                      console.log("query file", file);

                      const filesArray = [].slice.call(file);
                      filesArray.forEach((e) => {
                        setImageName(e.name);
                      });

                      const img = {
                        preview: URL.createObjectURL(file[0]),
                        data: file[0],
                      };
                      setImage(img);
                    }}
                  />
                </Col>
                <Col md>
                  <form.Label>Preview</form.Label>
                  <img
                    src={
                      image.preview
                        ? image.preview
                        : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                    }
                    className="img-fluid"
                  />
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
          <button type="submit" className="btn btn-success" onClick={postData}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      {/* #### EDTT #### */}
      <Modal
        show={showEdit}
        onHide={handleClose2}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header
          style={{
            backgroundColor: "rgb(140, 193, 82)",
            color: "#FFFFFF",
          }}
        >
          <Modal.Title>แก้ไขข้อมูล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <form.Label>รหัสโซนเพาะปลูก</form.Label>
              <form.Control
                type="text"
                defaultValue={idzone}
                autoFocus
                onChange={(e) => setIdZone(e.target.value)}
              />
            </form.Group>
            <form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <hr></hr>
              <Row>
                <Col md>
                  <form.Label>อัพโหลด</form.Label>
                  <FileUpload
                    btnIcon="fas fa-upload"
                    multiple
                    accept="image/*"
                    onUpload={(file) => {
                      console.log("query file", file);

                      const filesArray = [].slice.call(file);
                      filesArray.forEach((e) => {
                        setImageName(e.name);
                      });

                      const img = {
                        preview: URL.createObjectURL(file[0]),
                        data: file[0],
                      };
                      setImage(img);
                    }}
                  />
                </Col>
                <Col md>
                  <form.Label>Preview</form.Label>
                  <img
                    src={image.preview ? image.preview : pathimage}
                    className="img-fluid"
                  />
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
            onClick={() => {
              updateZone(id);
            }}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Manage_zone;
