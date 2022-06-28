import React, { useState, useEffect } from "react";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import moment from "moment";
import Swal from "sweetalert2";

const Manage_plant_fertilizer = (props) => {

  const [ftilizer, setFtilizer] = useState([]);
  const [ftilizerUnit, setFtilizerUnit] = useState([]);
  const [ftilizer_query, setFtilizerQuery] = useState([
    {
      id: "",
      name_chemical: "",
      name_chemical_eng: "",
      eu_mrl: "",
      path_img: "",
    },
  ]);

  const getFtilizer = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/Fertilizer`
    );
    setFtilizer(response.data);
  };

  const getFtilizerUnit = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/FertilizerUnit`
    );
    setFtilizerUnit(response.data);
  };

  const getSelect = async (data) => {
    if (data !== "------กรุณาเลือกชนิดปุ๋ย------") {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/getChemical/Fertilizer2/${data}`
      );
      setFtilizerQuery(res.data);
    } else {
      setFtilizerQuery([
        {
          id: "",
          name_chemical: "",
          name_chemical_eng: "",
          eu_mrl: "",
          path_img: "",
        },
      ]);
    }
  };

  useEffect(() => {
    getFtilizer();
    getFtilizerUnit();
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
              <h3 className="card-title">จัดการข้อมูลปุ๋ย</h3>
            </div>
            <form className="form-horizontal">
              {ftilizer_query.map((dataSelect, index) => {
                return (
                  <div className="card-body" key={index}>
                    <div className="form-group row">
                      <label className="col-sm-1 col-form-label">
                        ชื่อปุ๋ย
                      </label>
                      <div className="col-sm-5">
                        <select
                          className="custom-select form-control-border"
                          onChange={(e) => getSelect(e.target.value)}
                        >
                          <option>------กรุณาเลือกชนิดปุ๋ย------</option>
                          {ftilizer.map((data, index) => {
                            return (
                              <option key={index} value={data.id}>
                                {data.name_chemical}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <label className="col-sm-1 col-form-label">
                        ชื่อภาษาอังกฤษ
                      </label>
                      <div className="col-sm-5">
                        <input
                          type="text"
                          className="form-control form-control-border"
                          placeholder={dataSelect.name_chemical_eng}
                          defaultValue={dataSelect.name_chemical_eng}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-1 col-form-label">
                        วันที่เริ่มต้น
                      </label>
                      <div
                        className="col-sm-3 input-group date"
                        data-target-input="nearest"
                      >
                        <input
                          type="date"
                          className="form-control form-control-border"
                          placeholder="วันที่เริ่มต้น"
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">
                        วันที่สิ้นสุด
                      </label>
                      <div
                        className="col-sm-3 input-group date"
                        data-target-input="nearest"
                      >
                        <input
                          type="date"
                          className="form-control form-control-border"
                          placeholder="วันที่สิ้นสุด"
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">ปริมาณ</label>
                      <div className="col-sm-1">
                        <input
                          type="number"
                          className="form-control form-control-border"
                          defaultValue="ปริมาณที่ใช้"
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">หน่วย</label>
                      <div className="col-sm-1">
                        <select className="custom-select form-control-border">
                          {ftilizerUnit.map((data_unit, index) => {
                            return (
                              <option key={index} value={data_unit.id}>
                                {data_unit.unit}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-1 col-form-label">Note</label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control form-control-border"
                          placeholder="-"
                        />
                      </div>
                      <label className="col-sm-1 col-form-label">รูปภาพ</label>
                      <div className="col-sm-2">
                        <Zoom>
                          <img
                            src={
                              dataSelect.path_img
                                ? dataSelect.path_img
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
                  type="submit"
                  className="btn btn-default float-right"
                  style={{
                    backgroundColor: "#8CC152",
                    color: "#FFFFFF",
                  }}
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

export default Manage_plant_fertilizer;
