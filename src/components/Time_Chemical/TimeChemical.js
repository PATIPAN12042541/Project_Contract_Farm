import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BsTrashFill } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import form from "react-bootstrap/Form";

const TimeChemical = () => {
  const [TimeChemical, setTimeChemical] = useState([]);
  /* ---------------------------------------------------------*/
  const [time, setTime] = useState([]);
  const [newtime, setNewtime] = useState([]);
  /*-------------------------- Modal ---------------------------*/

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*-------------------------------------------------------------*/
  const ChangeOpen = async (e, id) => {
    if (e == 1) {
      if (time == "") {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/getChemical/TimeChemical/updateStatus/${id}`,
          {
            status: e,
          }
        );
      } else {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/getChemical/TimeChemical/updateStatus/${id}`,
          {
            status: e,
            time: time,
          }
        );
        // Swal.fire("Completed!", "บันทึกสำเร็จ", "success");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "บันทึกสำเร็จ",
        });
      }
    } else {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/getChemical/TimeChemical/updateStatus/${id}`,
        {
          status: e,
        }
      );
    }
    getTimeChemical();
  };
  /*---------------------------------------------------------**/
  const getTimeChemical = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/TimeChemical`
    );
    setTimeChemical(response.data);
  };

  const PostTimeChemical = async (e) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/getChemical/TimeChemical/insertTimeChemical`,
        {
          time: newtime,
          unit: "วัน",
        }
      )
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Save OK !",
        });
        handleClose();
        getTimeChemical();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: error,
          text: "Save Error!",
        });
      });
  };

  const deleteTimeChemical = async (id) => {
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
            `${process.env.REACT_APP_API_URL}/getChemical/TimeChemical/deleteTimeChemical/${id}`
          );
          getTimeChemical();
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
    getTimeChemical();
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
                    <h3 className="card-title">จัดการระยะเวลาตกค้าง</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <button className="btn btn-success" onClick={handleShow}>
                      เพิ่มข้อมูล
                    </button>
                  </div>
                  <hr />
                  <div className="row">
                    <table className="table table-bordered table-hover dataTable dtr-inline">
                      <thead>
                        <tr>
                          <th>ลำดับ</th>
                          <th>เวลา</th>
                          <th>หน่วย</th>
                          <th>ลบข้อมูล</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TimeChemical.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="form-group row">
                                <input
                                  className="form-control col-sm-10 col-form-label"
                                  type="number"
                                  defaultValue={data.time}
                                  onChange={(e) => {
                                    setTime(e.target.value);
                                  }}
                                  disabled={data.status}
                                />
                                &nbsp;
                                {data.status == 1 ? (
                                  <button
                                    className="btn btn-warning toastrDefaultWarning"
                                    style={{ color: "#fff" }}
                                    onClick={() => ChangeOpen(0, data.id)}
                                  >
                                    <BiEditAlt />
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-success toastrDefaultSuccess"
                                    onClick={() => ChangeOpen(1, data.id)}
                                  >
                                    <BiCheck />
                                  </button>
                                )}
                              </div>
                            </td>
                            <td>{data.unit}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteTimeChemical(data.id)}
                              >
                                <center>
                                  <BsTrashFill />
                                </center>
                              </button>
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
        </div>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}>
          <Modal.Title>ระยะเวลาสารเคมี</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal">
            <div className="card-body">
              <div className="form-group row">
                <form.Label className="col-sm-4 col-form-label">
                  เวลา :
                </form.Label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="เวลา"
                    defaultValue={newtime}
                    onChange={(e) => setNewtime(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <form.Label className="col-sm-4 col-form-label">
                  หน่วย :
                </form.Label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="วัน"
                    disabled
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-success" onClick={PostTimeChemical}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};;

export default TimeChemical;
