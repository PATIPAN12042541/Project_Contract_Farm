import React, { useState, useEffect } from "react";
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
import ReactPaginate from 'react-paginate';

const List_Chemical = () => {
  const [listChemicals, setListChemicals] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ListTypeChemical, setListTypeChemical] = useState([]);
  const [checked, setChecked] = useState(false);
  const [nameChemicalThai, setNameChemicalThai] = useState("");
  const [nameChemicalEng, setNameChemicalEng] = useState("");
  const [eumrl, setEumrl] = useState("");
  const [typeChemicalID, setTypeChemicalID] = useState();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [image_name, setImageName] = useState();
  const navigate = useNavigate();

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const getListTypeChemicals = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/chemical/getTypeChemical`
    );
    setListTypeChemical(response.data);
  };

  const [checkthai, setCheckthai] = useState(false);
  const [checkeng, setCheckEng] = useState(false);

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

  const CheckwordingTH = (data) => {
    let ThaiCount;
    ThaiCount = (data.match(/[ก-๙]/g) || []).length;

    if (ThaiCount > 0) {
      setCheckEng(true);
    } else {
      setCheckEng(false);
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
            image_name === undefined
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
          getListTypeChemicals();
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

  useEffect(() => {
    getListChemical();
    getListTypeChemicals();

    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const getListChemical = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/master`
    );
    setListChemicals(response.data);
  };

  const deleteChemical = async (id) => {
    console.log(id);
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
                    <Button variant="success" onClick={handleShow}>
                      เพิ่มข้อมูลสารเคมี
                    </Button>
                    {/* <Link to={"/AddChemical"}>
                      <Button variant="success">เพิ่มข้อมูลสารเคมี</Button>
                    </Link> */}
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
                          <th>ลบข้อมูล</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listChemicals.map((listChemical, index) => (
                          <tr key={listChemical.id}>
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
                                {listChemical.status === 1 ? (
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
                              <Link to={`/UpdateChemical/${listChemical.id}`}>
                                <Button
                                  variant="warning"
                                  style={{ color: "#ffff" }}
                                >
                                  <center>
                                    <AiFillEdit />
                                  </center>
                                </Button>
                              </Link>
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={(e) => deleteChemical(listChemical.id)}
                              >
                                <center>
                                  <BsTrashFill />
                                </center>
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
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setChecked(!checked);
                    }}
                  />
                </div>
              </div>
            </div>

            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
            />
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
    </div>
  );
};

export default List_Chemical