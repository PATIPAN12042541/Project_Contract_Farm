import React, { useState, useEffect } from "react";
import axios from "axios";

const System_overview = () => {
  const [Overview, setOverview] = useState([]);

  const getOverview = async () => {
    const overview = await axios.get(
      `${process.env.REACT_APP_API_URL}/OverView`
    );
    setOverview(overview.data);
    console.log(overview.data);
  };

  useEffect(() => {
    getOverview();
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
              <table>
                <thead className="table table-head-fixed text-nowrap">
                  <tr>
                    <th>#</th>
                    <th>ชื่อเเปลง</th>
                    <th>วันที่เริ่มต้น</th>
                    <th>วันที่สิ้นสุด</th>
                    <th>ผู้รับผิดชอบ</th>
                    <th>ชื่อสารเคมี/ปุ๋ย</th>
                    <th>EU MRL</th>
                    <th>ระยะเวลา</th>
                    <th>ปริมาณที่ใช้</th>
                    <th>Note</th>
                    <th>วันที่เริ่มต้นสารเคมี</th>
                    <th>วันที่สิ้นสุดสารเคมี</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default System_overview;
