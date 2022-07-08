import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BsTrashFill } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";

const TimeChemical = () => {
  const [TimeChemical, setTimeChemical] = useState([]);
  /* ---------------------------------------------------------*/
  const [time, setTime] = useState([]);

  const ChangeOpen = async (e, id) => {
    console.log(time);
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
        Swal.fire("Completed!", "บันทึกสำเร็จ", "success");
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
                    <button className="btn btn-success">เพิ่มข้อมูล</button>
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
                              <button className="btn btn-danger">
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
    </div>
  );
};;

export default TimeChemical;
