import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BsTrashFill } from "react-icons/bs";

const TimeChemical = () => {
  const [TimeChemical, setTimeChemical] = useState([]);
  /* ---------------------------------------------------------*/
  const getTimeChemical = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/TimeChemical`
    );
    setTimeChemical(response.data);
    console.log(response.data);
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
                              <input
                                className="form-control"
                                type="text"
                                defaultValue={data.time}
                                style={{ display: "none" }}
                              />
                            </td>
                            <td>{data.unit}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                // onClick={(e) => deleteChemical(listChemical.id)}
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
    </div>
  );
};

export default TimeChemical;
