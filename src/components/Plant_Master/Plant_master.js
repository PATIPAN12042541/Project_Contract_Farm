import React, { useState, useEffect,useMemo } from "react";
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
import { BsTrashFill } from "react-icons/bs";
import Pagination from "../Pagination/Pagination.js";
import '../Pagination/style.scss';

let PageSize = 5;

const Plant_master = () => {
  const [plantMaster, setPlantMaster] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
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
  const [typePlant, setTypePlant] = useState([]);
  const [plantCondition, setPlantCondition] = useState([]);
  /************************/

  /********* Dropdown Type **********/
  const [masterDropType, setmasterDropType] = useState([]);
  /***********************************/

  // Search Item
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = plantMaster.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
      setCurrentPage(1);
    } else {
      setFilteredResults(plantMaster);
    }
  };

  // Pageing
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    if (searchInput.length > 1) {
      return filteredResults.slice(firstPageIndex, lastPageIndex);
    } else {
      return plantMaster.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, searchInput.length > 1 ? filteredResults : plantMaster]); // eslint-disable-line react-hooks/exhaustive-deps

  // Get Data in Table
  const getPlantMasterDetail = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/plant/getPlantMasterSetup`
    );
    setPlantMaster(response.data);
    // console.log(response.data);
  };

  // Get Data in Table Drop Type Plant
  const getMasterDropType = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getplant/plant/getPlantMasterTypeUsed`
    );
    setmasterDropType(response.data);
    console.log(response.data);
  };

  // Post Data Plant
  const PostPlantMaster = async (e) => {
    if (nameThai == "" || nameEng == "") {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูล",
        text: "Save Error!",
      });
    } else {
      e.preventDefault();
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/getplant/plant/postMasterPlant`,
          {
            plant_name: nameThai,
            plant_name_eng: nameEng,
            plant_img:
              image_name === undefined
                ? "../dist/img/No_Image_Available.jpg"
                : "../dist/img/" + image_name,
            status_show: checked,
            type_plant: typePlant,
            plant_condition: plantCondition,
          }
        )
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
    }
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
            type_plant: typePlant,
            plant_condition: plantCondition,
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
            type_plant: typePlant,
            plant_condition: plantCondition,
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
    getMasterDropType();
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
                    <h3 className="card-title">จัดการข้อมูลพืช Master</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <button className="btn btn-success" onClick={ShowMaster}>
                        เพิ่มข้อมูลพืช
                      </button>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ค้นหา"
                        onChange={(e) => searchItems(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <Table
                      className="table table-bordered table-hover dataTable dtr-inline"
                      responsive
                    >
                      <thead>
                        <tr>
                          <th>
                            <center>ลำดับ</center>
                          </th>
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
                        {currentTableData.map((data, index) => (
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
                                setTypePlant(data.type_plant);
                              }}
                            >
                              <center>{index + 1}</center>
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
                                setTypePlant(data.type_plant);
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
                                setTypePlant(data.type_plant);
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
                                setTypePlant(data.type_plant);
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
                                  <BsTrashFill /> ลบข้อมูล
                                </button>
                              </center>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Pagination
                      className="pagination-bar"
                      currentPage={currentPage}
                      totalCount={
                        searchInput.length > 1
                          ? filteredResults.length
                          : plantMaster.length
                      }
                      pageSize={PageSize}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
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
                  ชนิดพืช :
                </Form.Label>

                <div className="col-sm-8">
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setTypePlant(e.target.value);
                    }}
                  >
                    <option>--เลือกประเภทพืช--</option>
                    {masterDropType.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.type_plant_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  เงื่อนไข :
                </Form.Label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setPlantCondition(e.target.value);
                    }}
                  >
                    <option>------เงื่อนไข-------</option>
                    <option value={1}>รูปแบบที่ 1 : วน Circle</option>
                    <option value={2}>รูปแบบที่ 1 : ไม่วน Circle</option>
                  </select>
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
                  ชนิดพืช :
                </Form.Label>

                <div className="col-sm-8">
                  <select
                    className="form-control"
                    defaultValue={typePlant}
                    onChange={(e) => {
                      setTypePlant(e.target.value);
                    }}
                  >
                    <option>--เลือกประเภทพืช--</option>
                    {masterDropType.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.type_plant_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  เงื่อนไข :
                </Form.Label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    defaultValue={plantCondition}
                    onChange={(e) => {
                      setPlantCondition(e.target.value);
                    }}
                  >
                    <option>------เงื่อนไข-------</option>
                    <option value={1}>รูปแบบที่ 1 : วน Circle</option>
                    <option value={2}>รูปแบบที่ 1 : ไม่วน Circle</option>
                  </select>
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
