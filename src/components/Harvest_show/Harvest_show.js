import React, { useState, useEffect } from "react";
import axios from "axios";

const Harvest_show = () => {
  const [harvextData, setHarvextData] = useState([]);

  const getHarvetData = async () => {
    const response = await axios
      .get
      // `${process.env.REACT_APP_API_URL} /zoneplant/statusPlant`
      ();
    setHarvextData(response.data);
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
                          <th>ผลงาน</th>
                          <th>จำนวน</th>
                          <th>ผู้รับผิดชอบ</th>
                        </tr>
                      </thead>
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
