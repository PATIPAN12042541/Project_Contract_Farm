import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "./System_overview.css";
import { CSVLink } from "react-csv";
import styled from "styled-components";

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
      grow: 3,
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
      grow: 3,
    },
    {
      name: "CC/L",
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
      grow: 2,
      cell: (row) => (
        <StyledCell className={getCssClass(row.status_check)}>
          {row.status_check}
        </StyledCell>
      ),
      // style: {
      //   backgroundColor: "#8CC152",
      //   color: "white",
      //   "&:hover": {
      //     cursor: "pointer",
      //   },
      // },
    },
    // cell : (row) => (
    //   <StyledCell className={conditionalRowStyles}>
    //     {row.AdditionalNewCases}
    //   </StyledCell>
    //)
    //},
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.status_check.includes("Success"),
      columns: "status_check",
      style: {
        backgroundColor: "#8CC152",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    // You can also pass a callback to style for additional customization
    {
      when: (row) => row.status_check.includes("Not Success"),
      columns: "status_check",
      style: {
        backgroundColor: "pink",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status_check.includes("Not Found"),
      columns: "status_check",
      style: {
        backgroundColor: "gray",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const StyledCell = styled.div`
    &.Success {
      color: green;
    }
    &.NotSuccess {
      color: red;
    }
    &.NotFound {
      color: gray;
    }
  `;

  function getCssClass(value) {
    if (value === "Success") return "Success";
    else if (value === "Not Success") return "NotSuccess";
    return "NotFound";
  }

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
                      highlightOnHover
                      //conditionalRowStyles={conditionalRowStyles}
                    />
                  ) : (
                    <DataTable
                      columns={columns}
                      data={Overview}
                      fixedHeader
                      pagination
                      highlightOnHover
                      // conditionalRowStyles={conditionalRowStyles}
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
