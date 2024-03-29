import React, { useState, useEffect ,useMemo } from "react";
import Zoom from "react-medium-image-zoom";
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import FileUpload from "@hawk-ui/file-upload";
import Form from "react-bootstrap/Form";
import "../CSS/List_chemical.css";
import { BsTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Pagination from "../Pagination/Pagination.js";
import '../Pagination/style.scss';
import Switch from "react-switch";

let PageSize = 5;

const List_Chemical = () => {
  const [listChemicals, setListChemicals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const navigate = useNavigate();

  // Modal เพิ่มข้อมูลสารเคมี
  const [checkthai, setCheckthai] = useState(false);
  const [checkeng, setCheckEng] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [checked, setChecked] = useState(false);
  const [nameChemicalThai, setNameChemicalThai] = useState("");
  const [nameChemicalEng, setNameChemicalEng] = useState("");
  const [eumrl, setEumrl] = useState("");
  const [typeChemicalID, setTypeChemicalID] = useState();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [image_name, setImageName] = useState();
  const [ListTypeChemical, setListTypeChemical] = useState([]);

  // Modal แก้ไขข้อมูลสารเคมี
  const [editCheckthai, setEditCheckthai] = useState(false);
  const [editCheckeng, setEditCheckEng] = useState(false);
  const [editChemicalID, setEditChemicalID] = useState("");
  const [editNameChemicalThai, setEditNameChemicalThai] = useState("");
  const [editNameChemicalEng, setEditNameChemicalEng] = useState("");
  const [editEumrl, setEditEumrl] = useState("");
  const [editShow, setEditShow] = useState(false);
  const handleCloseModelEdit = () => setEditShow(false);
  const handleShowModelEdit = () => setEditShow(true);
  const [editChecked, setEditChecked] = useState(false);
  const [editTypeChemicalID, setEditTypeChemicalID] = useState();
  const [imgUrl,setImgUrl] = useState("")
  const [editImage, setEditImage] = useState({ preview: "", data: "" });
  const [editImage_name, setEditImageName] = useState();
  const [ListEditTypeChemical, setListEditTypeChemical] = useState([]);

  const getListTypeChemicals = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/chemical/getTypeChemical2`
    );
    setListTypeChemical(response.data);
  };

  const getEditListTypeChemicals = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/chemical/getTypeChemical2`
    );
    setListEditTypeChemical(response.data);
  };

  const CheckWording = (data) => {
    let smallCount, LagreCount, ThaiCount;

    smallCount = (data.match(/[a-z]/g) || []).length;
    LagreCount = (data.match(/[A-Z]/g) || []).length;
    ThaiCount = (data.match(/[ก-๙]/g) || []).length;

    if (smallCount > 0 || LagreCount > 0) {
      setCheckthai(true);
    } else {
      setCheckthai(false);
    }
  };

  const EditCheckWording = (data) => {
    let smallCount, LagreCount, ThaiCount;

    smallCount = (data.match(/[a-z]/g) || []).length;
    LagreCount = (data.match(/[A-Z]/g) || []).length;
    ThaiCount = (data.match(/[ก-๙]/g) || []).length;

    if (smallCount > 0 || LagreCount > 0) {
      setEditCheckthai(true);
    } else {
      setEditCheckthai(false);
    }
  };

  const CheckwordingTH = (data) => {
    let ThaiCount;
    ThaiCount = (data.match(/[ก-๙]/g) || []).length;

    if (ThaiCount > 0) {
      setCheckEng(true);
    } else {
      setCheckEng(false);
    }
  };

  const EditCheckwordingTH = (data) => {
    let ThaiCount;
    ThaiCount = (data.match(/[ก-๙]/g) || []).length;

    if (ThaiCount > 0) {
      setEditCheckEng(true);
    } else {
      setEditCheckEng(false);
    }
  };

  const AddChemical = async (e) => {
    e.preventDefault();
    // console.log("image_name : " + image_name);
    if (
      checkthai < 0 ||
      checkeng < 0 ||
      eumrl == "" ||
      typeChemicalID == "" ||
      image == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบ",
        text: "Save Error!",
      });
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/getChemical/createChemical`, {
          name_chemical: nameChemicalThai,
          name_chemical_eng: nameChemicalEng,
          eu_mrl: eumrl,
          path_img:
            image_name == undefined
              ? "../dist/img/No_Image_Available.jpg"
              : "../dist/img/insecticide/" + image_name,
          type_chemical_id: typeChemicalID,
          status: checked,
        })
        .then(function (response) {
          uploadImg();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Save OK !",
          });
          navigate("/ListChemical");
          handleClose();
          getListChemical();
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

  const updateChemical = async (id) => {
    try{
        if (editImage_name === undefined){
            await axios.patch(`${process.env.REACT_APP_API_URL}/getChemical/updateChemical/${id}`,{
                name_chemical: editNameChemicalThai,
                name_chemical_eng : editNameChemicalEng,
                eu_mrl : editEumrl,
                type_chemical_id : editTypeChemicalID,
                status : editChecked,
            });
        }else{
            await axios.patch(`${process.env.REACT_APP_API_URL}/getChemical/updateChemical/${id}`,{
                name_chemical: editNameChemicalThai,
                name_chemical_eng : editNameChemicalEng,
                eu_mrl : editEumrl,
                path_img : '../dist/img/insecticide/'+editImage_name,
                type_chemical_id : editTypeChemicalID,
                status : editChecked,
            });

            EdituploadImg();
        }
        
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Update Success!",
          });
        navigate("/ListChemical")
        handleCloseModelEdit();
        getListChemical();
    }catch(error){
        Swal.fire({
            icon: "error",
            title: "Update Fail!",
            text: error,
          });
    }
}

  const uploadImg = async () => {
    let formData = new FormData();
    formData.append("file", image.data);

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/public/dist/img/insecticide`,
        formData
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  const EdituploadImg = async () => {
    let formData = new FormData();
    formData.append("file", editImage.data);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/public/dist/img/insecticide`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  // Search Item
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = listChemicals.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
      setCurrentPage(1);
      // console.log(filteredData);
    } else {
      setFilteredResults(listChemicals);
      //  console.log(listChemicals);
    }
  };

  // Pageing
  const currentTableData = useMemo(() => {
    // console.log(currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    if (searchInput.length > 1) {
      return filteredResults.slice(firstPageIndex, lastPageIndex);
    } else {
      return listChemicals.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, searchInput.length > 1 ? filteredResults : listChemicals]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getListChemical()
    getListTypeChemicals()
    getEditListTypeChemicals()
  }, []);

  const getListChemical = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/master`
    );
    setListChemicals(response.data);
  };

  const deleteChemical = async (id) => {
    //console.log(id);
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
            `${process.env.REACT_APP_API_URL}/getChemical/deleteChemical2/${id}`
          )
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Delete Success!",
            });

            getListChemical();
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
                    <h3 className="card-title">ข้อมูลสารเคมี</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <Button variant="success" onClick={handleShow}>
                        เพิ่มข้อมูลสารเคมี
                      </Button>
                      {/* <Link to={"/AddChemical"}>
                      <Button variant="success">เพิ่มข้อมูลสารเคมี</Button>
                    </Link> */}
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
                          <th>ลำดับ</th>
                          <th>ประเภทสารเคมี</th>
                          <th>ชื่อสารเคมี (ไทย)</th>
                          <th>ชื่อสารเคมี (Eng)</th>
                          <th>ER MUL</th>
                          <th>รูปภาพ</th>
                          <th>Active</th>
                          <th>แก้ไขข้อมูล</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTableData.map((listChemical, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{listChemical.type_chemical}</td>
                            <td>{listChemical.name_chemical}</td>
                            <td>{listChemical.name_chemical_eng}</td>
                            <td>{listChemical.eu_mrl}</td>
                            <td>
                              <center>
                                <Zoom>
                                  <Image
                                    src={listChemical.path_img}
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
                                {listChemical.status == 1 ? (
                                  <Image
                                    src="../dist/img/symbol_true.png"
                                    className="img-fluid mb-2"
                                    alt="white sample"
                                    width="100"
                                    height="100"
                                    thumbnail
                                  />
                                ) : (
                                  <Image
                                    src="../dist/img/symbol_false.png"
                                    className="img-fluid mb-2"
                                    alt="white sample"
                                    width="100"
                                    height="100"
                                    thumbnail
                                  />
                                )}
                              </center>
                            </td>
                            <td>
                              <center>
                                {/* <Link to={`/UpdateChemical/${listChemical.id}`}> */}
                                  <Button
                                    variant="warning"
                                    style={{ color: "#ffff" }}
                                    onClick={(e)=>{
                                      handleShowModelEdit()
                                      setEditChemicalID(listChemical.id)
                                      setEditTypeChemicalID(listChemical.type_chemical_id)
                                      setEditNameChemicalThai(listChemical.name_chemical)
                                      setEditNameChemicalEng(listChemical.name_chemical_eng)
                                      setEditEumrl(listChemical.eu_mrl)
                                      setEditChecked(listChemical.status)
                                      setImgUrl(listChemical.path_img)
                                    }}
                                  >
                                    <AiFillEdit />
                                  </Button>
                                {/* </Link> */}
                              </center>
                            </td>
                            {/* <td>
                              <center>
                                <Button
                                  variant="danger"
                                  onClick={(e) =>
                                    deleteChemical(listChemical.id)
                                  }
                                >
                                  <BsTrashFill />
                                </Button>
                              </center>
                            </td> */}
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
                          : listChemicals.length
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

      {/* Modal เพิ่มข้อมูลสารเคมี */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{
            backgroundColor: "rgb(140, 193, 82)",
            color: "#FFFFFF",
            fontSize: "24px",
          }}
        >
          <Modal.Title>เพิ่มข้อมูลสารเคมี</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="form-horizontal">
            <div className="card-body">
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  ประเภทสารเคมี
                </Form.Label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setTypeChemicalID(e.target.value);
                    }}
                  >
                    <option>--เลือกประเภทสารเคมี--</option>
                    {ListTypeChemical.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.type_chemical}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  ชื่อสารเคมี (ไทย)
                </Form.Label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className={
                      checkthai > 0 && nameChemicalThai !== ""
                        ? "form-control borderLine"
                        : "form-control"
                    }
                    placeholder="ชื่อสารเคมี (ไทย)"
                    onChange={(e) => (
                      setNameChemicalThai(e.target.value),
                      CheckWording(e.target.value)
                    )}
                  />
                </div>
              </div>
              {checkthai > 0 && nameChemicalThai !== "" ? (
                <div className="col-sm-12 setValidation">
                  กรุณากรอกภาษาไทยเท่านั้น
                </div>
              ) : (
                ""
              )}
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  ชื่อสารเคมี (Eng)
                </Form.Label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className={
                      checkeng > 0 && nameChemicalEng !== ""
                        ? "form-control borderLine"
                        : "form-control"
                    }
                    placeholder="ชื่อสารเคมี (Eng)"
                    onChange={(e) => (
                      setNameChemicalEng(e.target.value),
                      CheckwordingTH(e.target.value)
                    )}
                  />
                </div>
              </div>
              {checkeng > 0 && nameChemicalEng !== "" ? (
                <div className="col-sm-12 setValidation">
                  กรุณากรอกอังกฤษเท่านั้น
                </div>
              ) : (
                ""
              )}
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  EU MRL
                </Form.Label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="EU MRL"
                    pattern="[0-9]*"
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => setEumrl(e.target.value)}
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
                  <Switch
                    onChange={(e) => {
                      setChecked(!checked);
                    }}
                    checked={checked}
                    className="react-switch"
                  />
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={handleClose}
            className="btn btn-default"
            style={{ float: "left" }}
          >
            ย้อนกลับ
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-success"
            onClick={AddChemical}
          >
            บันทึก
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal แก้ไขข้อมูลสารเคมี */}
      <Modal show={editShow} onHide={handleCloseModelEdit}>
        <Modal.Header
          style={{
            backgroundColor: "rgb(140, 193, 82)",
            color: "#FFFFFF",
            fontSize: "24px",
          }}
        >
          <Modal.Title>แก้ไขข้อมูลสารเคมี</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="form-horizontal">
            <div className="card-body">
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  ประเภทสารเคมี
                </Form.Label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    defaultValue={editTypeChemicalID}
                    onChange={(e) => {
                      setEditTypeChemicalID(e.target.value);
                    }}
                  >
                    <option>--เลือกประเภทสารเคมี--</option>
                    {ListEditTypeChemical.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.type_chemical}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  ชื่อสารเคมี (ไทย)
                </Form.Label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className={
                      editCheckthai > 0 && editNameChemicalThai !== ""
                        ? "form-control borderLine"
                        : "form-control"
                    }
                    placeholder="ชื่อสารเคมี (ไทย)"
                    value={editNameChemicalThai}
                    onChange={(e) => (
                      setEditNameChemicalThai(e.target.value),
                      EditCheckWording(e.target.value)
                    )}
                  />
                </div>
              </div>
              {editCheckthai > 0 && editNameChemicalThai !== "" ? (
                <div className="col-sm-12 setValidation">
                  กรุณากรอกภาษาไทยเท่านั้น
                </div>
              ) : (
                ""
              )}
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  ชื่อสารเคมี (Eng)
                </Form.Label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className={
                      editCheckeng > 0 && editNameChemicalEng !== ""
                        ? "form-control borderLine"
                        : "form-control"
                    }
                    placeholder="ชื่อสารเคมี (Eng)"
                    value={editNameChemicalEng}
                    onChange={(e) => (
                      setEditNameChemicalEng(e.target.value),
                      EditCheckwordingTH(e.target.value)
                    )}
                  />
                </div>
              </div>
              {editCheckeng > 0 && editNameChemicalEng !== "" ? (
                <div className="col-sm-12 setValidation">
                  กรุณากรอกอังกฤษเท่านั้น
                </div>
              ) : (
                ""
              )}
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  EU MRL
                </Form.Label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="EU MRL"
                    pattern="[0-9]*"
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    value={editEumrl}
                    onChange={(e) => setEditEumrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">รูป</Form.Label>
                <div className="col-sm-8">
                  <Zoom>
                    <Image
                      src={
                        editImage.preview
                          ? editImage.preview
                          : imgUrl
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
                        setEditImageName(e.name);
                      });

                      const img = {
                        preview: URL.createObjectURL(file[0]),
                        data: file[0],
                      };
                      setEditImage(img);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  Active Status
                </Form.Label>
                <div className="col-sm-7 col-form-label">
                  <Switch
                    onChange={(e) => {
                      setEditChecked(!editChecked);
                    }}
                    checked={editChecked}
                    className="react-switch"
                  />
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={handleCloseModelEdit}
            className="btn btn-default"
            style={{ float: "left" }}
          >
            ย้อนกลับ
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-success"
            onClick={(e)=>{
              updateChemical(editChemicalID)
            }}
          >
            บันทึก
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default List_Chemical