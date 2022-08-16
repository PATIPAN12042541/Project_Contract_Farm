import React, { useEffect, useState,useMemo } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { BsTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Pagination from "../Pagination/Pagination.js";
import '../Pagination/style.scss';

let PageSize = 5;

const List_Chemical = () => {
  const [listChemicals, setListChemicals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [typeChemical, setTypeChemical] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const AddTypeChemical = async (e) => {
    e.preventDefault();
    if (typeChemical == "") {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูล",
        text: "Save Error!",
      });
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/chemical/addTypeChemical`, {
          type_chemical: typeChemical,
          status: checked,
        })
        .then(function (response) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Save OK !",
          });
          navigate("/TypeChemical");
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

  useEffect(() => {
    getListChemical();
  }, []);

  const getListChemical = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/chemical/getTypeChemical`
    );
    setListChemicals(response.data);
  };

  const deleteTypeChemical = async (id) => {
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
            `${process.env.REACT_APP_API_URL}/chemical/getTypeChemical/${id}`
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

  const currentTableData = useMemo(() => {
    console.log(currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return listChemicals.slice(firstPageIndex, lastPageIndex);
  }, [currentPage,listChemicals]); // eslint-disable-line react-hooks/exhaustive-deps

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
                    <h3 className="card-title">ประเภทข้อมูลสารเคมี</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <Button onClick={handleShow} variant="success">
                      เพิ่มประเภทสารเคมี
                    </Button>
                    {/* <Link to={"/addTypeChemical"}>
                      <Button onClick={handleShow} variant="success">เพิ่มประเภทสารเคมี</Button>
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
                          <th>แก้ไขข้อมูล</th>
                          <th>ลบข้อมูล</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTableData.map((listChemical, index) => (
                          <tr key={listChemical.id}>
                            <td>{index + 1}</td>
                            <td>{listChemical.type_chemical}</td>
                            <td>
                              <Link to={`/editTypeChemical/${listChemical.id}`}>
                                <Button
                                  variant="warning"
                                  style={{ color: "#ffff" }}
                                >
                                  <AiFillEdit /> แก้ไขข้อมูล
                                </Button>
                              </Link>
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={(e) =>
                                  deleteTypeChemical(listChemical.id)
                                }
                              >
                                <BsTrashFill /> ลบข้อมูล
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Pagination
                      className="pagination-bar"
                      currentPage={currentPage}
                      totalCount={listChemicals.length}
                      pageSize={PageSize}
                      onPageChange={page => setCurrentPage(page)}
                    />
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
          <Modal.Title>เพิ่มประเภทข้อมูลสารเคมี</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-horizontal">
            <div className="card-body">
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  ประเภทสารเคมี
                </Form.Label>
                <div className="col-sm-8">
                  <Form.Control
                    type="text"
                    className="form-control"
                    onChange={(e) => setTypeChemical(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <Form.Label className="col-sm-4 col-form-label">
                  Active Status
                </Form.Label>
                <div className="col-sm-8 col-form-label">
                  <input
                    type="checkbox"
                    id="custom-switch"
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
          <Button className="btn btn-default" onClick={handleClose}>
            ย้อนกลับ
          </Button>
          &nbsp;
          <button
            type="submit"
            className="btn btn-success"
            onClick={AddTypeChemical}
          >
            บันทึก
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default List_Chemical