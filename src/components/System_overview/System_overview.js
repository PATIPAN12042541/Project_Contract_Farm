import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../CSS/System_overview.css";
import { BsSearch } from "react-icons/bs";
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

  const datatest = [
    {
      zone_id: "A1-1",
      name_plant: "แปลงกระเพรา",
      start_date_plant: "2022-05-01",
      end_date_plant: "2022-06-01",
      name: "นาย A นามสกุล B",
      name_chemical: "โพวาธอท",
      days: "31 วัน",
      quantity: "1cc : 8L",
      note: "-",
      date_start: "2022-05-01",
      date_end: "2022-06-01",
      status_check: "Success",
    },
    {
      zone_id: "A1-2",
      name_plant: "แปลงมะเขือ",
      start_date_plant: "2022-05-01",
      end_date_plant: "2022-06-01",
      name: "นาย C นามสกุล B",
      name_chemical: "โพวาธอท",
      days: "31 วัน",
      quantity: "2cc : 4L",
      note: "-",
      date_start: "2022-05-01",
      date_end: "2022-06-01",
      status_check: "Not Success",
    },
    {
      zone_id: "A1-3",
      name_plant: "",
      start_date_plant: "",
      end_date_plant: "",
      name: "",
      name_chemical: "",
      days: "",
      quantity: "",
      note: "",
      date_start: "",
      date_end: "",
      status_check: "Not Found",
    },
  ];

  //////////////////// End Search /////////////////////////////////

  // header columns
  const columns = [
    {
      name: "โซนเพาะปลูก",
      id: "zone_id",
      selector: (row) => row.zone_id,
      sortable: true,
      grow: 4,
    },
    {
      name: "ชื่อเเปลง",
      id: "name_plant",
      selector: (row) => row.name_plant,
      sortable: true,
      grow: 4,
    },
    {
      name: "วันที่เริ่มต้น",
      id: "start_date_plant",
      selector: (row) => row.start_date_plant,
      sortable: true,
      grow: 3,
    },
    {
      name: "วันที่สิ้นสุด",
      id: "end_date_plant",
      selector: (row) => row.end_date_plant,
      sortable: true,
      grow: 3,
    },
    {
      name: "ผู้รับผิดชอบ",
      id: "name",
      selector: (row) => row.name,
      sortable: true,
      grow: 3,
    },
    {
      name: "ชื่อสารเคมี/ปุ๋ย",
      id: "name_chemical",
      selector: (row) => row.name_chemical,
      sortable: true,
      grow: 5,
    },
    {
      name: "ระยะเวลา",
      id: "days",
      selector: (row) => row.days,
      sortable: true,
      grow: 2,
    },
    {
      name: "CC:L",
      id: "quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Note",
      id: "note",
      selector: (row) => row.note,
      sortable: true,
      grow: 5,
    },
    {
      name: "วันที่เริ่มต้นสารเคมี",
      id: "date_start",
      selector: (row) => row.date_start,
      sortable: true,
      grow: 5,
    },
    {
      name: "วันที่สิ้นสุดสารเคมี",
      id: "date_end",
      selector: (row) => row.date_end,
      sortable: true,
      grow: 5,
    },
    {
      name: "สถานะ",
      id: "status_check",
      selector: (row) => row.status_check,
      sortable: true,
      grow: 5,
      cell: (row) => (
        <div
          data-tag="allowRowEvents"
          variant="outlined"
          className={
            row.status_check === "Success"
              ? "Success"
              : row.status_check === "Not Found"
              ? "NotFound"
              : "NotSuccess"
          }
        >
          {row.status_check}
        </div>
      ),
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
                <div className="card-body">
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
                        data={datatest}
                        headers={headers}
                        filename="Contract_Farmming.csv"
                        target="_blank"
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
                      highlightOnHover
                    />
                  ) : (
                    <DataTable
                      columns={columns}
                      data={datatest}
                      fixedHeader
                      pagination
                      highlightOnHover
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
