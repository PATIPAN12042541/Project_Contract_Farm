import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Zoom from "react-medium-image-zoom";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FileUpload from "@hawk-ui/file-upload";

const Plant_master = () => {
  const [plantMaster, setPlantMaster] = useState([]);
  const [image, setImage] = useState({ preview: "", data: "" });

  const [show, setShow] = useState(false);
  const CloseMaster = () => setShow(false);
  const ShowMaster = () => setShow(true);

  const getPlantMasterDetail = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/plant/getMasterPlant`
    );
    setPlantMaster(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getPlantMasterDetail();
  }, []);

  return (
    <div className="content-wrapper">
      {" "}
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
                    <h3 className="card-title">จัดการข้อมูลพืช Master</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <button className="btn btn-success" onClick={ShowMaster}>
                      เพิ่มข้อมูลพืช
                    </button>
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
                          <th>ชื่อพืช (ไทย)</th>
                          <th>ชื่อพืช (Eng)</th>
                          <th>
                            <center>รูปภาพ</center>
                          </th>
                          <th>
                            <center>สถานะ</center>
                          </th>
                          <th>
                            <center>ลบข้อมูล</center>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {plantMaster.map((data, index) => (
                          <tr key={index}>
                            <td style={{ cursor: "pointer" }}>{index + 1}</td>
                            <td style={{ cursor: "pointer" }}>
                              {data.plant_name}
                            </td>
                            <td style={{ cursor: "pointer" }}>
                              {data.plant_name_eng}
                            </td>
                            <td>
                              <center>
                                <Zoom>
                                  <Image
                                    src={data.plant_img}
                                    className="img-fluid mb-2"
                                    alt="white sample"
                                    width="100"
                                    height="100"
                                    thumbnail
                                  />
                                </Zoom>
                              </center>
                            </td>
                            <td>
                              <center>
                                {data.status_show === 1 ? (
                                  <Image
                                    src="../dist/img/symbol_true.png"
                                    className="img-fluid mb-2"
                                    alt="white sample"
                                    width="50"
                                    height="50"
                                    thumbnail
                                  />
                                ) : (
                                  <Image
                                    src="../dist/img/symbol_false.png"
                                    className="img-fluid mb-2"
                                    alt="white sample"
                                    width="50"
                                    height="50"
                                    thumbnail
                                  />
                                )}
                              </center>
                            </td>
                            <td>
                              <center>
                                <button className="btn btn-danger">
                                  ลบข้อมูล
                                </button>
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
      {/*เพิ่มข้อมูลพืช Master*/}
      <Modal show={show} onHide={CloseMaster}>
        <Modal.Header
          style={{
            backgroundColor: "rgb(140, 193, 82)",
            color: "#FFFFFF",
            fontSize: "24px",
          }}
        >
          <Modal.Title>ข้อมูลพืช Master</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-horizontal">
            <div className="card-body">
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  ชื่อพืช :
                </Form.Label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" ชื่อพืช (ภาษาไทย)"
                  />
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  Plant Name :
                </Form.Label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" ชื่อพืช (ภาษาอังกฤษ)"
                  />
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">รูป</Form.Label>
                <div className="col-sm-8">
                  <Zoom>
                    <Image
                      src={
                        image.preview
                          ? image.preview
                          : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                      }
                      className="img-fluid mb-2"
                      width="100"
                      height="100"
                    />
                  </Zoom>

                  <FileUpload
                    btnIcon="fas fa-upload"
                    multiple
                    accept="image/*"
                    // onUpload={(file) => {
                    //   const filesArray = [].slice.call(file);
                    //   filesArray.forEach((e) => {
                    //     setImageName(e.name);
                    //   });

                    //   const img = {
                    //     preview: URL.createObjectURL(file[0]),
                    //     data: file[0],
                    //   };
                    //   setImage(img);
                    // }}
                  />
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  Active Status
                </Form.Label>
                <div className="col-sm-7 col-form-label">
                  <input
                    type="checkbox"
                    // onChange={(e) => {
                    //   setChecked(!checked);
                    // }}
                  />
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CloseMaster}>
            Close
          </Button>
          <Button variant="primary" onClick={CloseMaster}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Plant_master;
