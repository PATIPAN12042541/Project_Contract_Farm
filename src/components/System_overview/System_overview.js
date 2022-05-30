import React, { useState, useEffect } from "react";
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

  // header columns
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
