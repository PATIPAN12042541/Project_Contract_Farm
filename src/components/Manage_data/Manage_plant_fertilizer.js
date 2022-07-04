import React, { useState, useEffect } from "react";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import moment from "moment";
import { BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Manage_plant_fertilizer = (props) => {
  const [ftilizer, setFtilizer] = useState([]);
  const [ftilizerUnit, setFtilizerUnit] = useState([]);
  const [ftilizerData, setFtilizerData] = useState([]);
  const [ftilizer_query, setFtilizerQuery] = useState([
    {
      id: "",
      name_chemical: "",
      name_chemical_eng: "",
      eu_mrl: "",
      path_img: "",
    },
  ]);

  const [ftilizer_queryEdit, setFtilizerQueryEdit] = useState([
    {
      id: "",
      name_chemical: "",
      name_chemical_eng: "",
      eu_mrl: "",
      path_img: "",
    },
  ]);
  /************* Post Data **************/
  const [quantity, setQuantity] = useState([]);
  const [unit, setUnit] = useState([]);
  const [note, setNote] = useState([]);
  const [dateStart, setdateStart] = useState([]);
  const [dateEnd, setdateEnd] = useState([]);
  /*************************************/

  /************* Show Modal **************/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /*************************************/

  /************* Edit Ftilizer **************/
  const [ftilizerID, setftilizerID] = useState([]);
  const [nameChemicalE, setNameChemicalE] = useState([]);
  const [startdateE, setStartDateE] = useState([]);
  const [enddateE, setEndDateE] = useState([]);
  const [quantityE, setQuantityE] = useState([]);
  const [unitE, setUnitE] = useState([]);
  const [noteE, setNoteE] = useState([]);
  const [imageE, setimageE] = useState([]);

  /*************************************/

  const getFtilizer = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/Fertilizer`
    );
    setFtilizer(response.data);
  };

  const getFtilizerUnit = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/FertilizerUnit`
    );
    setFtilizerUnit(response.data);
  };

  const getFtilizerData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/FertilizerData/${props.id}`
    );
    setFtilizerData(response.data);
    console.log(response.data);
  };

  const getSelect = async (data) => {
    if (data !== "------กรุณาเลือกชนิดปุ๋ย------") {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/getChemical/Fertilizer2/${data}`
      );
      setFtilizerQuery(res.data);
    } else {
      setFtilizerQuery([
        {
          id: "",
          name_chemical: "",
          name_chemical_eng: "",
          eu_mrl: "",
          path_img: "",
        },
      ]);
    }
  };

  const getSelectEdit = async (data) => {
    if (data !== "------กรุณาเลือกชนิดปุ๋ย------") {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/getChemical/Fertilizer2/${data}`
      );
      setFtilizerQueryEdit(res.data);
    } else {
      setFtilizerQueryEdit([
        {
          id: "",
          name_chemical: "",
          name_chemical_eng: "",
          eu_mrl: "",
          path_img: "",
        },
      ]);
    }
  };

  const PostFertilizer = async () => {
    if (quantity == "" || unit == "" || dateStart == "" || dateEnd == "") {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        text: "Save Error!",
      });
    } else {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/getChemical/PostFertilizer/${props.id}`,
            {
              id_name_chemical: ftilizer_query[0].id,
              quantity: quantity,
              unit: unit,
              date_start: dateStart,
              date_end: dateEnd,
              note: note,
            }
          )
          .then(function (response) {
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
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error.response.data.msg,
          text: "Save Error!",
        });
      }
    }
  };

  const UpdateFertilizerEdit = async () => {
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}/getChemical/update/FertilizerData/${ftilizerID}`,
          {
            id_name_chemical: nameChemicalE,
            quantity: quantityE,
            unit: unitE,
            date_start: startdateE,
            date_end: enddateE,
            note: noteE,
          }
        )
        .then(function (response) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Save OK !",
          });
          getFtilizerData();
          handleClose();
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: error.response.data.msg,
            text: "Save Error!",
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.msg,
        text: "Save Error!",
      });
    }
  };

  const deleteFertilizer = async (id) => {
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
            `${process.env.REACT_APP_API_URL}/getChemical/DeleteFertilizer/${id}`
          );
          getFtilizerData();
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

  useEffect(() => {
    getFtilizer();
    getFtilizerUnit();
    getFtilizerData();
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid"></div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info">
            <div
              className="card-header"
              style={{
                backgroundColor: "#8CC152",
                color: "#FFFFFF",
              }}
            >
              <h3 className="card-title">จัดการข้อมูลปุ๋ย</h3>
            </div>
            <form className="form-horizontal" onSubmit={PostFertilizer}>
              {ftilizer_query.map((dataSelect, index) => {
                return (
                  <div className="card-body" key={index}>
                    <div className="form-group row">
                      <label className="col-sm-1 col-form-label">
                        ชื่อปุ๋ย
                      </label>
                      <div className="col-sm-5">
                        <select
                          className="custom-select form-control-border"
                          onChange={(e) => getSelect(e.target.value)}
                        >
                          <option>------กรุณาเลือกชนิดปุ๋ย------</option>
                          {ftilizer.map((data, index) => {
                            return (
                              <option key={index} value={data.id}>
                                {data.name_chemical}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <label className="col-sm-1 col-form-label">
                        ชื่อภาษาอังกฤษ
                      </label>
                      <div className="col-sm-5">
                        <input
                          type="text"
                          className="form-control form-control-border"
                          placeholder={dataSelect.name_chemical_eng}
                          defaultValue={dataSelect.name_chemical_eng}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-1 col-form-label">
                        วันที่เริ่มต้น
                      </label>
                      <div
                        className="col-sm-3 input-group date"
                        data-target-input="nearest"
                      >
                        <input
                          type="date"
                          className="form-control form-control-border"
                          placeholder="วันที่เริ่มต้น"
                          defaultValue={dateStart}
                          onChange={(e) => setdateStart(e.target.value)}
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">
                        วันที่สิ้นสุด
                      </label>
                      <div
                        className="col-sm-3 input-group date"
                        data-target-input="nearest"
                      >
                        <input
                          type="date"
                          className="form-control form-control-border"
                          placeholder="วันที่สิ้นสุด"
                          defaultValue={dateEnd}
                          onChange={(e) => setdateEnd(e.target.value)}
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">ปริมาณ</label>
                      <div className="col-sm-1">
                        <input
                          type="number"
                          className="form-control form-control-border"
                          placeholder="ปริมาณที่ใช้"
                          defaultValue={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">หน่วย</label>
                      <div className="col-sm-1">
                        <select
                          className="custom-select form-control-border"
                          onChange={(e) => setUnit(e.target.value)}
                        >
                          <option>--เลือกหน่วย--</option>
                          {ftilizerUnit.map((data_unit, index) => {
                            return (
                              <option key={index} value={data_unit.id}>
                                {data_unit.unit}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-1 col-form-label">Note</label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control form-control-border"
                          placeholder="-"
                          defaultValue={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">รูปภาพ</label>
                      <div className="col-sm-2">
                        <Zoom>
                          <img
                            src={
                              dataSelect.path_img
                                ? dataSelect.path_img
                                : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                            }
                            width="100"
                            height="100"
                          />
                        </Zoom>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="card-footer">
                <button
                  type="submit"
                  className="btn btn-default float-right"
                  style={{
                    backgroundColor: "#8CC152",
                    color: "#FFFFFF",
                  }}
                >
                  ยืนยัน
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info">
            <div
              className="card-header"
              style={{
                backgroundColor: "#8CC152",
                color: "#FFFFFF",
              }}
            >
              <h3 className="card-title">ตารางข้อมูล</h3>
            </div>
            <div className="card-body">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>
                      <center>#</center>
                    </th>
                    <th>ชื่อปุ๋ย (ชื่อภาษาอังกฤษ)</th>
                    <th>
                      <center>วันที่เริ่มต้น</center>
                    </th>
                    <th>
                      <center>วันที่สิ้นสุด</center>
                    </th>
                    <th>
                      <center>ปริมาณ</center>
                    </th>
                    <th>
                      <center>รูปภาพ</center>
                    </th>
                    <th>
                      <center>ลบ</center>
                    </th>
                  </tr>
                </thead>
                {ftilizerData.map((data, index) => (
                  <tbody key={index}>
                    <tr data-widget="expandable-table" aria-expanded="false">
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleShow();
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleShow();
                          setftilizerID(data.id);
                          setNameChemicalE(data.id_name_chemical);
                          setStartDateE(data.date_start);
                          setEndDateE(data.date_end);
                          setQuantityE(data.quantity);
                          setUnitE(data.unit_id);
                          setNoteE(data.note);
                          setimageE(data.path_img);
                        }}
                      >
                        {data.name_chemical +
                          " ( " +
                          data.name_chemical_eng +
                          " )"}
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleShow();
                          setftilizerID(data.id);
                          setNameChemicalE(data.id_name_chemical);
                          setStartDateE(data.date_start);
                          setEndDateE(data.date_end);
                          setQuantityE(data.quantity);
                          setUnitE(data.unit_id);
                          setNoteE(data.note);
                          setimageE(data.path_img);
                        }}
                      >
                        <center>{data.date_start}</center>
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleShow();
                          setftilizerID(data.id);
                          setNameChemicalE(data.id_name_chemical);
                          setStartDateE(data.date_start);
                          setEndDateE(data.date_end);
                          setQuantityE(data.quantity);
                          setUnitE(data.unit_id);
                          setNoteE(data.note);
                          setimageE(data.path_img);
                        }}
                      >
                        <center>{data.date_end}</center>
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleShow();
                          setftilizerID(data.id);
                          setNameChemicalE(data.id_name_chemical);
                          setStartDateE(data.date_start);
                          setEndDateE(data.date_end);
                          setQuantityE(data.quantity);
                          setUnitE(data.unit_id);
                          setNoteE(data.note);
                          setimageE(data.path_img);
                        }}
                      >
                        <center>{data.quantity + " " + data.unit}</center>
                      </td>
                      <td>
                        <center>
                          <Zoom>
                            <img
                              src={data.path_img}
                              className="img-fluid mb-2"
                              alt="white sample"
                              width="99"
                              height="99"
                            />
                          </Zoom>
                        </center>
                      </td>
                      <td>
                        <center>
                          <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={() => {
                              deleteFertilizer(data.id);
                            }}
                          >
                            <BsFillTrashFill />
                          </button>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </section>;

      {
        /* Edit fertilizer*/
      }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{
            backgroundColor: "rgb(140, 193, 82)",
            color: "#FFFFFF",
            fontSize: "24px",
          }}
        >
          <Modal.Title>แก้ไขรายการปุ๋ย</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-horizontal">
            {ftilizer_queryEdit.map((dataEdit, index) => {
              return (
                <div className="card-body" key={index}>
                  <div className="form-group row">
                    <Form.Label className="col-sm-4 col-form-label">
                      ชื่อปุ๋ย :
                    </Form.Label>
                    <div className="col-sm-8">
                      <select
                        className="custom-select form-control-border"
                        defaultValue={nameChemicalE}
                        onChange={(e) => {
                          getSelectEdit(e.target.value);
                          setNameChemicalE(e.target.value);
                        }}
                      >
                        <option>------กรุณาเลือกชนิดปุ๋ย------</option>
                        {ftilizer.map((data, index) => {
                          return (
                            <option key={index} value={data.id}>
                              {data.name_chemical}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <Form.Label className="col-sm-4 col-form-label">
                      วันที่เริ่มต้น :
                    </Form.Label>
                    <div className="col-sm-8">
                      <input
                        type="date"
                        className="form-control"
                        defaultValue={startdateE}
                        onChange={(e) => setStartDateE(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <Form.Label className="col-sm-4 col-form-label">
                      วันที่สิ้นสุด :
                    </Form.Label>
                    <div className="col-sm-8">
                      <input
                        type="date"
                        className="form-control"
                        defaultValue={enddateE}
                        onChange={(e) => setEndDateE(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      ปริมาณที่ใช้
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control form-control-border"
                        placeholder="ปริมาณที่ใช้"
                        defaultValue={quantityE}
                        onChange={(e) => setQuantityE(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">หน่วย</label>
                    <div className="col-sm-8">
                      <select
                        className="custom-select form-control-border"
                        defaultValue={unitE}
                        onChange={(e) => setUnitE(e.target.value)}
                      >
                        <option>--เลือกหน่วย--</option>
                        {ftilizerUnit.map((data_unit, index) => {
                          return (
                            <option key={index} value={data_unit.id}>
                              {data_unit.unit}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Note</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control form-control-border"
                        placeholder="Note"
                        defaultValue={noteE}
                        onChange={(e) => setNoteE(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">รูปภาพ</label>
                    <div className="col-sm-8">
                      <Zoom>
                        <img
                          src={dataEdit.path_img ? dataEdit.path_img : imageE}
                          width="100"
                          height="100"
                        />
                      </Zoom>
                    </div>
                  </div>
                </div>
              );
            })}
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
            onClick={UpdateFertilizerEdit}
          >
            บันทึก
          </button>
        </Modal.Footer>
      </Modal>;
    </div>
  );
};

export default Manage_plant_fertilizer;
