import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import DataTable from "react-data-table-component";

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

  const columns = [
    {
      name: "โซนเพาะปลูก",
      selector: (row) => row.zone_id,
      sortable: true,
    },
    {
      name: "ชื่อเเปลง",
      selector: (row) => row.name_plant,
      sortable: true,
    },
    {
      name: "วันที่เริ่มต้น",
      selector: (row) => row.start_date_plant,
      sortable: true,
    },
    {
      name: "วันที่สิ้นสุด",
      selector: (row) => row.end_date_plant,
      sortable: true,
    },
    {
      name: "ผู้รับผิดชอบ",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "ชื่อสารเคมี/ปุ๋ย",
      selector: (row) => row.name_chemical,
      sortable: true,
    },
    {
      name: "ระยะเวลา",
      selector: (row) => row.days,
      sortable: true,
    },
    {
      name: "cc/L",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Note",
      selector: (row) => row.note,
      sortable: true,
    },
    {
      name: "วันที่เริ่มต้นสารเคมี",
      selector: (row) => row.date_start,
      sortable: true,
    },
    {
      name: "วันที่สิ้นสุดสารเคมี",
      selector: (row) => row.date_end,
      sortable: true,
    },
    {
      name: "สถานะ",
      selector: (row) => row.status_check,
      sortable: true,
    },
  ];

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
              <div className="card">
                <div className="card-body table-responsive p-0">
                  <DataTable
                    title="ข้อมูลทั้งหมด"
                    columns={columns}
                    data={Overview}
                    pagination  
                  />
                  {/* <table className="table table-head-fixed text-nowrap">
                    <thead>
                      <tr>
                        <th>โซนเพาะปลูก</th>
                        <th>ชื่อเเปลง</th>
                        <th>วันที่เริ่มต้น</th>
                        <th>วันที่สิ้นสุด</th>
                        <th>ผู้รับผิดชอบ</th>
                        <th>ชื่อสารเคมี/ปุ๋ย</th>
                        <th>ระยะเวลา</th>
                        <th>ปริมาณที่ใช้</th>
                        <th>Note</th>
                        <th>วันที่เริ่มต้นสารเคมี</th>
                        <th>วันที่สิ้นสุดสารเคมี</th>
                        <th>
                          <center>สถานะ</center>
                        </th>
                      </tr>
                    </thead>
                    {Overview.map((data, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>
                            {data.zone_name == "null" ? "" : data.zone_name}
                            {data.id_name_plant == "null" ? "" : " - "}
                            {data.id_name_plant == "null"
                              ? ""
                              : data.id_name_plant}
                          </td>
                          <td>
                            {data.name_plant == "null" ? "" : data.name_plant}
                          </td>
                          <td>
                            {data.start_date_plant == "null"
                              ? ""
                              : data.start_date_plant}
                          </td>
                          <td>
                            {data.end_date_plant == "null"
                              ? ""
                              : data.end_date_plant}
                          </td>
                          <td>
                            {data.name == "null" ? "" : data.name}{" "}
                            {data.last_name == "null" ? "" : data.last_name}
                          </td>
                          <td>
                            {data.name_chemical == "null"
                              ? ""
                              : data.name_chemical}
                            {data.name_chemical == "null" &&
                            data.name_chemical_eng == "null"
                              ? ""
                              : " ( "}
                            {data.name_chemical_eng == "null"
                              ? ""
                              : data.name_chemical_eng}
                            {data.name_chemical == "null" &&
                            data.name_chemical_eng == "null"
                              ? ""
                              : " ) "}
                          </td>
                          <td>{data.eu_mrl == "null" ? "" : data.eu_mrl}</td>
                          <td>
                            {data.time == "null" ? "" : data.time}{" "}
                            {data.unit == "null" ? "" : data.unit}
                          </td>
                          <td>
                            {data.cc == "null" ? "" : data.cc}
                            {data.cc == "null" && data.liter == "null"
                              ? ""
                              : " CC / "}
                            {data.liter == "null" ? "" : data.liter}
                            {" L"}
                          </td>
                          <td>{data.note == "null" ? "" : data.note}</td>
                          <td>
                            {data.date_start == "null" ? "" : data.date_start}
                          </td>
                          <td>
                            {data.date_end == "null" ? "" : data.date_end}
                          </td>
                          <td
                            style={{
                              color: "white",
                              backgroundColor:
                                data.status_check == "Success"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            <center>{data.status_check}</center>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default System_overview;
