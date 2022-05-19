import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Zoom from "react-medium-image-zoom";
import Swal from "sweetalert2";

const Manage_plant_chemical = (props) => {
  const [getChemical, setGetChemical] = useState([]);
  const [endDate, setEndDate] = useState([""]);
  const [startDate, setStartDate] = useState([""]);
  const [expired, setExpired] = useState([]);
  const [checkinput, setCheckInput] = useState(true);
  const [getselect, setSelect] = useState([
    {
      id: "",
      name_chemical: "",
      name_chemical_eng: "",
      path_img: "",
      eu_mrl: "",
    },
  ]);
  const [IdExpired, setIDExpired] = useState([]);
  const [ratiocc, setRatiocc] = useState([]);
  const [ratioL, setratioL] = useState([]);
  const [note, setNote] = useState([]);

  const Checkdata = async () => {
    console.log("id_page ", props.id);
    console.log("getselect ", getselect[0].id);
    console.log("IdExpired ", IdExpired);
    console.log("ratiocc ", ratiocc);
    console.log("ratioL ", ratioL);
    console.log("note ", note);
    console.log("startDate ", startDate);
    console.log("endDate ", endDate);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/getChemical/ManageChemical/${props.id}`,
          {
            id_name_chemical: getselect[0].id,
            id_residual_period: IdExpired,
            cc: ratiocc,
            liter: ratioL,
            note: note,
            date_start: startDate,
            date_end: endDate,
          }
        )
        .then(function (response) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Save OK !",
          });
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: error.response.data.msg,
            text: "Save Error!",
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.msg,
        text: "Save Error!",
      });
    }
  };

  const getExpired = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/getExpired`
    );
    setExpired(response.data);
  };

  const getChemicals = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical`
    );
    setGetChemical(response.data);
  };

  const getSelect = async (data) => {
    if (data !== "------กรุณาเลือกสารเคมี------") {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/getChemical/Select/${data}`
      );
      setSelect(response.data);
    } else {
      setSelect([
        {
          id: "",
          name_chemical: "",
          name_chemical_eng: "",
          path_img: "",
          eu_mrl: "",
        },
      ]);
    }
  };

  const setEnddate = async (date) => {
    var new_date = moment(date, "YYYY-MM-DD").add("days", 4);

    var day = new_date.format("DD");
    var month = new_date.format("MM");
    var year = new_date.format("YYYY");

    setEndDate(year + "-" + month + "-" + day);
    setCheckInput(false);
  };

  const setEnddate2 = async (data) => {
    setEndDate("");

    const index = data.target.selectedIndex;
    const el = data.target.childNodes[index];
    const date = el.getAttribute("value");
    const IdExpired = el.getAttribute("id");
    setIDExpired(IdExpired);

    var new_date = moment(startDate, "YYYY-MM-DD").add("days", date);
    var day = new_date.format("DD");
    var month = new_date.format("MM");
    var year = new_date.format("YYYY");
    setEndDate(year + "-" + month + "-" + day);
  };

  useEffect(() => {
    getChemicals();
    getExpired();
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid"></div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info">
            <div
              className="card-header"
              style={{
                backgroundColor: "#8CC152",
                color: "#FFFFFF",
              }}
            >
              <h3 className="card-title">จัดการข้อมูลสารเคมี</h3>
            </div>
            <form className="form-horizontal">
              {getselect.map((data, index) => {
                return (
                  <div className="card-body" key={index}>
                    <div className="form-group row">
                      <label className="col-sm-1 col-form-label">
                        ชื่อสารเคมี
                      </label>
                      <div className="col-sm-4">
                        <select
                          className="custom-select form-control-border"
                          onChange={(e) => getSelect(e.target.value)}
                        >
                          <option>------กรุณาเลือกสารเคมี------</option>
                          {getChemical.map((Chemical, index) => {
                            return (
                              <option key={index} value={Chemical.id}>
                                {Chemical.name_chemical}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <label className="col-sm-1 col-form-label">
                        ชื่อภาษาอังกฤษ
                      </label>
                      <div className="col-sm-4">
                        <input
                          type="text"
                          className="form-control form-control-border"
                          placeholder={data.name_chemical_eng}
                          defaultValue={data.name_chemical_eng}
                          readOnly
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">EU-MRL</label>
                      <div className="col-sm-1">
                        <input
                          type="text"
                          className="form-control form-control-border"
                          placeholder={data.eu_mrl}
                          defaultValue={data.eu_mrl}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-1 col-form-label">
                        วันที่เริ่มต้น
                      </label>
                      <div
                        className="col-sm-2 input-group date"
                        data-target-input="nearest"
                      >
                        <input
                          type="date"
                          className="form-control form-control-border"
                          placeholder="วันที่เริ่มต้น"
                          defaultValue=""
                          onChange={(e) => (
                            setEnddate(e.target.value),
                            setStartDate(e.target.value)
                          )}
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">
                        วันที่สิ้นสุด
                      </label>
                      <div
                        className="col-sm-2 input-group date"
                        data-target-input="nearest"
                      >
                        <input
                          type="date"
                          className="form-control form-control-border"
                          placeholder="วันที่สิ้นสุด"
                          defaultValue={endDate}
                          readOnly
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">
                        ระยะเวลาตกค้าง
                      </label>
                      <div className="col-sm-2 input-group date">
                        <select
                          className="custom-select form-control-border"
                          defaultValue=""
                          disabled={checkinput}
                          onChange={setEnddate2}
                        >
                          <option id="0" value="0">
                            ----ระยะเวลาตกค้าง----
                          </option>
                          {expired.map((expired, index2) => {
                            return (
                              <option
                                key={index2}
                                id={expired.id}
                                value={expired.time}
                              >
                                {expired.time + " " + expired.unit}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <label className="col-sm-1 col-form-label">
                        อัตรา (cc : L.)
                      </label>
                      <div className="col-sm-1">
                        <input
                          type="text"
                          className="form-control form-control-border"
                          placeholder="CC"
                          defaultValue={ratiocc}
                          onChange={(e) => setRatiocc(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-1">
                        <input
                          type="text"
                          className="form-control form-control-border"
                          placeholder="L"
                          defaultValue={ratioL}
                          onChange={(e) => setratioL(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-1 col-form-label">Note</label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control form-control-border"
                          placeholder="-"
                          defaultValue={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">รูปภาพ</label>
                      <div className="col-sm-2">
                        <Zoom>
                          <img
                            src={
                              data.path_img
                                ? data.path_img
                                : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                            }
                            width="100"
                            height="100"
                          />
                        </Zoom>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-default float-right"
                  style={{
                    backgroundColor: "#8CC152",
                    color: "#FFFFFF",
                  }}
                  onClick={Checkdata}
                >
                  ยืนยัน
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manage_plant_chemical;
