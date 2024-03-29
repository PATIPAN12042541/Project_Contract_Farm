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
import { BsFillPlusSquareFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

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
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

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
    //console.log(formData);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/public/dist/img/Zone/`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  // Post Data
  const postZone = async () => {
    if (idzone == "" || image_name == "" || lat == "" || lon == "") {
      Swal.fire({
        icon: "error",
        title: "โปรดใส่ข้อมูลให้ครบถ้วน",
        text: "Save Error!",
      });
    } else {
      const autoid = uuidv4();
      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/zoneplant/postZone`, {
            zone_name: idzone,
            image_zone: image_name,
            auto_id_zone: autoid,
            lat: lat,
            lon: lon,
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
      if (image_name == undefined) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/zoneplant/UpdateZone/${id}`,
          {
            zone_name: idzone,
            lat: lat,
            lon: lon,
          }
        );
      } else {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/zoneplant/UpdateZone/${id}`,
          {
            zone_name: idzone,
            image_zone: "../dist/img/Zone/" + image_name,
            lat: lat,
            lon: lon,
          }
        );

        uploadImg();
      }
      handleClose2();
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
                      <h3 className="card-title">จัดการโซนเพาะปลูก</h3>
                    </div>
                    <div className="col-md-1">
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={handleShow}
                        style={
                          ({ width: "100%" },
                          { display: "block" },
                          { float: "right" })
                        }
                      >
                        <BsFillPlusSquareFill />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>
                          <center>preview</center>
                        </th>
                        <th>
                          <center>Latitude</center>
                        </th>
                        <th>
                          <center>Longitude</center>
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
                          <td>{data.lat}</td>
                          <td>{data.lon}</td>
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
                                  setLat(data.lat);
                                  setLon(data.lon);
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
                                  <BsFillArrowRightCircleFill />
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
            <form.Group className="mb-3">
              <form.Label>รหัสโซนเพาะปลูก</form.Label>
              <form.Control
                type="text"
                placeholder="รหัสโซนเพาะปลูก"
                defaultValue={idzone}
                autoFocus
                onChange={(e) => setIdZone(e.target.value)}
              />
              <hr></hr>
            </form.Group>
            <form.Group className="mb-3">
              <form.Label>ละติจูด</form.Label>
              <form.Control
                type="number"
                placeholder="ละติจูด"
                defaultValue={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </form.Group>
            <form.Group className="mb-3">
              <form.Label>ลองติจูด</form.Label>
              <form.Control
                type="number"
                placeholder="ลองติจูด"
                defaultValue={lon}
                onChange={(e) => setLon(e.target.value)}
              />
            </form.Group>
            <form.Group className="mb-3">
              <hr></hr>
              <Row>
                <Col md>
                  <form.Label>อัพโหลด</form.Label>
                  <FileUpload
                    btnIcon="fas fa-upload"
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
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
            <form.Group className="mb-3">
              <form.Label>รหัสโซนเพาะปลูก</form.Label>
              <form.Control
                type="text"
                defaultValue={idzone}
                autoFocus
                onChange={(e) => setIdZone(e.target.value)}
              />
            </form.Group>
            <hr></hr>
            <form.Group className="mb-3">
              <form.Label>ละติจูด</form.Label>
              <form.Control
                type="number"
                placeholder="ละติจูด"
                defaultValue={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </form.Group>
            <form.Group className="mb-3">
              <form.Label>ลองติจูด</form.Label>
              <form.Control
                type="number"
                placeholder="ลองติจูด"
                defaultValue={lon}
                onChange={(e) => setLon(e.target.value)}
              />
            </form.Group>
            <form.Group className="mb-3">
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
