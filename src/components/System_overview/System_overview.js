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

  //////////////////  Start filter /////////////////////////

  const TextField = styled.input`
    height: 32px;
    width: 200px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;

    &:hover {
      cursor: pointer;
    }
  `;

  const ClearButton = styled(Button)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <TextField
        id="search"
        type="text"
        placeholder="Filter By Name"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <ClearButton type="button" onClick={onClear}>
        X
      </ClearButton>
    </>
  );
  //////////////////  End filter /////////////////////////

  //////////////////  Start header colums /////////////////////////
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

  //////////////////  End header colums /////////////////////////
  const Filtering = () => {
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] =
      React.useState(false);
    const filteredItems = Overview.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponentMemo = useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText("");
        }
      };

      return (
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      );
    }, [filterText, resetPaginationToggle]);
  };

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
                    data={filteredItems}
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    selectableRows
                    persistTableHead
                    fixedHeader
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

export default {
  System_overview,
  component: Filtering,
};
