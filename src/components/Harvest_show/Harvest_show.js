import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import axios from "axios";

const Harvest_show = () => {
  const [harvextData, setHarvextData] = useState([]);

  const getHarvetData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/History/getHarvestDetail/Harvest`
    );

    setHarvextData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getHarvetData();
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
                    <h3 className="card-title">ตรวจสอบการเก็บเกี่ยว</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>รหัสเเปลง</th>
                          <th>ชื่อแปลง</th>
                          <th>
                            <center>ผลงาน</center>
                          </th>
                          <th>
                            <center>จำนวน</center>
                          </th>
                          <th>ผู้รับผิดชอบ</th>
                          <th>
                            <center>วันที่ล่าสุด</center>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {harvextData.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.NAME_ZONE}</td>
                            <td>{data.plant_name}</td>
                            <td>
                              <center>
                                <Zoom>
                                  <img
                                    src={data.Path_img}
                                    className="img-fluid mb-2"
                                    alt="white sample"
                                    width="100"
                                    height="100"
                                  />
                                </Zoom>
                              </center>
                            </td>
                            <td>
                              <center>{data.quantity}</center>
                            </td>
                            <td>{data.NAME}</td>
                            <td>
                              <center>{data.lastDate}</center>
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

export default Harvest_show;
