import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../CSS/System_overview.css";
import { CSVLink } from "react-csv";
import { BsFillPrinterFill } from "react-icons/bs";

const System_overview = () => {
  const [Overview, setOverview] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const getOverview = async () => {
    const overview = await axios.get(
      `${process.env.REACT_APP_API_URL}/OverView`
    );
    setOverview(overview.data);
    // console.log(overview.data);
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
    { label: "โซนเพาะปลูก", key: "zone_name" },
    { label: "ชื่อเเปลง", key: "plant_name" },
    { label: "วันที่เริ่มต้น", key: "start_plant" },
    { label: "วันที่สิ้นสุด", key: "end_plant" },
    { label: "ผู้รับผิดชอบ", key: "username" },
    { label: "ชื่อสารเคมี/ปุ๋ย", key: "name_chemical" },
    { label: "ชื่อสารเคมี/ปุ๋ย ภาษาอังกฤษ", key: "name_chemical_eng" },
    { label: "EU_MRL", key: "eu_mrl" },
    { label: "ระยะเวลา : วัน", key: "time" },
    { label: "ระยะเวลา : หน่วย", key: "unit" },
    { label: "cc", key: "chemical_cc" },
    { label: "Liter", key: "chemical_liter" },
    { label: "Note", key: "chemical_note" },
    { label: "โรค", key: "disease" },
    { label: "แมลง", key: "bug" },
    { label: "วัชพืช", key: "weed" },
    { label: "หมายเหตุ", key: "remark" },
    { label: "วันที่เริ่มต้นสารเคมี", key: "chemical_date_start" },
    { label: "วันที่สิ้นสุดสารเคมี", key: "chemical_date_end" },
    { label: "จำนวนที่เก็บเกี่ยว", key: "qty" },
    // { label: "ระยะเวลาเก็บเกี่ยว", key: "diff_date" },
    { label: "สถานะ", key: "status_name" },
    { label: "วงรอบ", key: "plant_circle" },
  ];

  //////////////////// End Search /////////////////////////////////

  // header columns
  const columns = [
    {
      name: "โซนเพาะปลูก",
      id: "zone_name",
      selector: (row) => row.zone_name,
      sortable: true,
      grow: 4,
    },
    {
      name: "ชื่อเเปลง",
      id: "plant_name",
      selector: (row) => row.plant_name,
      sortable: true,
      grow: 4,
    },
    {
      name: "วันที่เริ่มต้น",
      id: "start_plant",
      selector: (row) => row.start_plant,
      sortable: true,
      grow: 3,
    },
    {
      name: "วันที่สิ้นสุด",
      id: "end_plant",
      selector: (row) => row.end_plant,
      sortable: true,
      grow: 3,
    },
    {
      name: "ผู้รับผิดชอบ",
      id: "username",
      selector: (row) => row.username,
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
      name: "ชื่อสารเคมี/ปุ๋ย ภาษาอังกฤษ",
      id: "name_chemical_eng",
      selector: (row) => row.name_chemical_eng,
      sortable: true,
      grow: 5,
    },
    {
      name: "EU_MRL",
      id: "eu_mrl",
      selector: (row) => row.eu_mrl,
      sortable: true,
      grow: 5,
    },
    {
      name: "ระยะเวลา : วัน",
      id: "time",
      selector: (row) => row.time,
      sortable: true,
      grow: 2,
    },
    {
      name: "ระยะเวลา : หน่วย",
      id: "unit",
      selector: (row) => row.unit,
      sortable: true,
      grow: 2,
    },
    {
      name: "CC",
      id: "chemical_cc",
      selector: (row) => row.chemical_cc,
      sortable: true,
    },
    {
      name: "Liter",
      id: "chemical_liter",
      selector: (row) => row.chemical_liter,
      sortable: true,
    },
    {
      name: "Note",
      id: "chemical_note",
      selector: (row) => row.chemical_note,
      sortable: true,
      grow: 5,
    },
    {
      name: "Note",
      id: "chemical_note",
      selector: (row) => row.chemical_note,
      sortable: true,
      grow: 5,
    },
    {
      name: "โรค",
      id: "disease",
      selector: (row) => row.disease,
      sortable: true,
      grow: 5,
    },
    {
      name: "แมลง",
      id: "bug",
      selector: (row) => row.bug,
      sortable: true,
      grow: 5,
    },
    {
      name: "วัชพืช",
      id: "weed",
      selector: (row) => row.weed,
      sortable: true,
      grow: 5,
    },
    {
      name: "หมายเหตุ",
      id: "remark",
      selector: (row) => row.remark,
      sortable: true,
      grow: 5,
    },
    {
      name: "วันที่เริ่มต้นสารเคมี",
      id: "chemical_date_start",
      selector: (row) => row.chemical_date_start,
      sortable: true,
      grow: 5,
    },
    {
      name: "วันที่สิ้นสุดสารเคมี",
      id: "chemical_date_end",
      selector: (row) => row.chemical_date_end,
      sortable: true,
      grow: 5,
    },
    {
      name: "จำนวนที่เก็บเกี่ยว",
      id: "qty",
      selector: (row) => row.qty,
      sortable: true,
      grow: 5,
    },
    // {
    //   name: "ระยะเวลาเก็บเกี่ยว",
    //   id: "diff_date",
    //   selector: (row) => row.diff_date,
    //   sortable: true,
    //   grow: 5,
    // },
    {
      name: "สถานะ",
      id: "status_name",
      selector: (row) => row.status_name,
      sortable: true,
      grow: 5,
    },
    {
      name: "วงรอบ",
      id: "plant_circle",
      selector: (row) => row.plant_circle,
      sortable: true,
      grow: 5,
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
                      {searchInput.length > 1 ? (
                        <CSVLink
                          data={filteredResults}
                          headers={headers}
                          filename="Contract_Farming.csv"
                          target="_blank"
                          style={{ color: "#ffffff" }}
                        >
                          <BsFillPrinterFill /> Export CSV
                        </CSVLink>
                      ) : (
                        <CSVLink
                          data={Overview}
                          headers={headers}
                          filename="Contract_Farming.csv"
                          target="_blank"
                          style={{ color: "#ffffff" }}
                        >
                          <BsFillPrinterFill /> Export CSV
                        </CSVLink>
                      )}
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
                      data={Overview}
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
