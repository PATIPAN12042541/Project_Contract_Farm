import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Zoom from "react-medium-image-zoom";
// import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FileUpload from "@hawk-ui/file-upload";

const Plant_master = () => {
  const [plantMaster, setPlantMaster] = useState([]);
  const [image, setImage] = useState({ preview: "", data: "" });
  const [image_name, setImageName] = useState();
  const [pathimage, setPathImage] = useState([]);

  /*********** Model เพิ่ม  ***************/
  const [show, setShow] = useState(false);
  const CloseMaster = () => setShow(false);
  const ShowMaster = () => setShow(true);
  /*************************************/

  /*********** Model แก้ไข  ***************/
  const [showEdit, setShowEdit] = useState(false);
  const CloseMaster_Edit = () => setShowEdit(false);
  const ShowMaster_Edit = () => setShowEdit(true);
  /*************************************/

  /*****  Insert Plant *****/
  const [plantMasterid, setPlantMasterid] = useState([]);
  const [nameThai, setNameThai] = useState([]);
  const [nameEng, setNameEng] = useState([]);
  const [checked, setChecked] = useState(false);
  /************************/

  // Get Data in Table
  const getPlantMasterDetail = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/plant/getMasterPlant`
    );
    setPlantMaster(response.data);
  };

  // Post Data Plant
  const PostPlantMaster = async (e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_API_URL}/getplant/plant/postMasterPlant`, {
        plant_name: nameThai,
        plant_name_eng: nameEng,
        plant_img:
          image_name === undefined
            ? "../dist/img/No_Image_Available.jpg"
            : "../dist/img/" + image_name,
        status_show: checked,
      })
      .then(function (response) {
        uploadImg();
        getPlantMasterDetail();
        CloseMaster();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Save OK !",
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: error,
          text: "Save Error!",
        });
      });
  };

  // post image
  const uploadImg = async () => {
    let formData = new FormData();
    formData.append("file", image.data);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/public/dist/img`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  ///////////////////////////////////////////////////////////

  // Delte Data Plant
  const deletePlants = async (id) => {
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
            `${process.env.REACT_APP_API_URL}/getplant/plant/deleteMasterPlant/${id}`
          );
          getPlantMasterDetail();
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

  /// Update Edit Plant
  const updatePlant = async (id) => {
    try {
      if (image_name === undefined) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/getplant/plant/UpdatePlantMaster/${id}`,
          {
            plant_name: nameThai,
            plant_name_eng: nameEng,
            status_show: checked,
          }
        );
      } else {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/getplant/plant/UpdatePlantMaster/${id}`,
          {
            plant_name: nameThai,
            plant_name_eng: nameEng,
            plant_img: "../dist/img/" + image_name,
            status_show: checked,
          }
        );

        uploadImg();
      }
      getPlantMasterDetail();
      CloseMaster_Edit();
      Swal.fire("Succes !", "Your file has been Update.", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        text: "Update Error!",
      });
    }
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
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                ShowMaster_Edit();
                                setNameThai(data.plant_name);
                                setNameEng(data.plant_name_eng);
                                setPathImage(data.plant_img);
                                setChecked(data.status_show);
                                setPlantMasterid(data.id);
                              }}
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                ShowMaster_Edit();
                                setNameThai(data.plant_name);
                                setNameEng(data.plant_name_eng);
                                setPathImage(data.plant_img);
                                setChecked(data.status_show);
                                setPlantMasterid(data.id);
                              }}
                            >
                              {data.plant_name}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                ShowMaster_Edit();
                                setNameThai(data.plant_name);
                                setNameEng(data.plant_name_eng);
                                setPathImage(data.plant_img);
                                setChecked(data.status_show);
                                setPlantMasterid(data.id);
                              }}
                            >
                              {data.plant_name_eng}
                            </td>
                            <td>
                              <center>
                                <Zoom>
                                  <img
                                    src={data.plant_img}
                                    className="img-fluid mb-2"
                                    alt="white sample"
                                    width="100"
                                    height="100"
                                  />
                                </Zoom>
                              </center>
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                ShowMaster_Edit();
                                setNameThai(data.plant_name);
                                setNameEng(data.plant_name_eng);
                                setPathImage(data.plant_img);
                                setChecked(data.status_show);
                                setPlantMasterid(data.id);
                              }}
                            >
                              <center>
                                {data.status_show === 1 ? (
                                  <img
                                    src="../dist/img/symbol_true.png"
                                    className="img-fluid mb-2"
                                    alt="white sample"
                                    width="50"
                                    height="50"
                                  />
                                ) : (
                                  <img
                                    src="../dist/img/symbol_false.png"
                                    className="img-fluid mb-2"
                                    alt="white sample"
                                    width="50"
                                    height="50"
                                  />
                                )}
                              </center>
                            </td>
                            <td>
                              <center>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    deletePlants(data.id);
                                  }}
                                >
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
                    onChange={(e) => setNameThai(e.target.value)}
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
                    onChange={(e) => setNameEng(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">รูป</Form.Label>
                <div className="col-sm-8">
                  <Zoom>
                    <img
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
                    onUpload={(file) => {
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
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  Active Status
                </Form.Label>
                <div className="col-sm-7 col-form-label">
                  <input
                    type="checkbox"
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
          <button
            onClick={CloseMaster}
            className="btn btn-default"
            style={{ float: "left" }}
          >
            ย้อนกลับ
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-success"
            onClick={PostPlantMaster}
          >
            บันทึก
          </button>
        </Modal.Footer>
      </Modal>
      {/* แก้ไขข้อมูลพืช Master*/}
      <Modal show={showEdit} onHide={CloseMaster_Edit}>
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
                    defaultValue={nameThai}
                    onChange={(e) => setNameThai(e.target.value)}
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
                    defaultValue={nameEng}
                    onChange={(e) => setNameEng(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">รูป</Form.Label>
                <div className="col-sm-8">
                  <Zoom>
                    <img
                      src={image.preview ? image.preview : pathimage}
                      className="img-fluid mb-2"
                      width="100"
                      height="100"
                    />
                  </Zoom>

                  <FileUpload
                    btnIcon="fas fa-upload"
                    multiple
                    accept="image/*"
                    onUpload={(file) => {
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
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  Active Status
                </Form.Label>
                <div className="col-sm-7 col-form-label">
                  <input
                    type="checkbox"
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
          <button
            onClick={CloseMaster_Edit}
            className="btn btn-default"
            style={{ float: "left" }}
          >
            ย้อนกลับ
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              updatePlant(plantMasterid);
            }}
          >
            บันทึก
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Plant_master;
