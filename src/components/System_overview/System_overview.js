import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "./System_overview.css";
import { CSVLink } from "react-csv";

const System_overview = () => {
  const [Overview, setOverview] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

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

  //////////////////// Start Search /////////////////////////////////
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = Overview.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Overview);
    }
  };
  
  
  
  const headers = [
    { label: "โซนเพาะปลูก", key: "zone_id" },
    { label: "ชื่อเเปลง", key: "name_plant" },
    { label: "วันที่เริ่มต้น", key: "start_date_plant" },
    { label: "วันที่สิ้นสุด", key: "end_date_plant" },
    { label: "ผู้รับผิดชอบ", key: "name" },
    { label: "ชื่อสารเคมี/ปุ๋ย", key: "name_chemical" },
    { label: "ระยะเวลา", key: "days" },
    { label: "cc/L", key: "quantity" },
    { label: "Note", key: "note" },
    { label: "วันที่เริ่มต้นสารเคมี", key: "date_start" },
    { label: "วันที่สิ้นสุดสารเคมี", key: "date_end" },
    { label: "สถานะ", key: "status_check" },
  ];

  //////////////////// End Search /////////////////////////////////

  // header columns
  const columns = [
    {
      name: "โซนเพาะปลูก",
      selector: (row) => row.zone_id,
      sortable: true,
      grow: 2,
    },
    {
      name: "ชื่อเเปลง",
      selector: (row) => row.name_plant,
      sortable: true,
      grow: 3,
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
      grow: 3,
    },
    {
      name: "ชื่อสารเคมี/ปุ๋ย",
      selector: (row) => row.name_chemical,
      sortable: true,
      grow: 5,
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
      grow: 5,
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
      grow: 2,
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
                  <div className="row right">
                    <input
                      className="input-css"
                      icon="search"
                      placeholder="Search..."
                      onChange={(e) => searchItems(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn btn-secondary set-position"
                    >
                      <CSVLink
                        data={Overview}
                        headers={headers}
                        style={{ color: "#ffffff" }}
                      >
                        Download CSV
                      </CSVLink>
                    </button>
                  </div>
                  {searchInput.length > 1 ? (
                    <DataTable
                      columns={columns}
                      data={filteredResults}
                      fixedHeader
                      pagination
                      dense
                    />
                  ) : (
                    <DataTable
                      columns={columns}
                      data={Overview}
                      fixedHeader
                      pagination
                      dense
                    />
                  )}
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
