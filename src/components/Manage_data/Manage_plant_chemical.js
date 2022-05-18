import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";


const Manage_plant_chemical = (props) => {
  const [getChemical, setGetChemical] = useState([]);
  const [getselect, setSelect] = useState([
    {
      id: "",
      name_chemical: "",
      name_chemical_eng: "",
      path_img: "",
      eu_mrl: "",
    },
  ]);

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

  useEffect(() => {
    getChemicals();
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
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-sm-1 col-form-label">ชื่อสารเคมี</label>
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

                  {getselect.map((data, index) => {
                    return (
                      <div className="row" key={index}>
                        <label className="col-sm-1 col-form-label">
                          ชื่อภาษาอังกฤษ
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control form-control-border"
                            id="name_chemical_eng"
                            placeholder={data.name_chemical_eng}
                            defaultValue={data.name_chemical_eng}
                            readOnly
                          />
                        </div>
                        <label className="col-sm-1 col-form-label">
                          EU-MRL
                        </label>
                        <div className="col-sm-2">
                          <input
                            type="text"
                            className="form-control form-control-border"
                            id="eu_mrl"
                            placeholder={data.eu_mrl}
                            defaultValue={data.eu_mrl}
                            readOnly
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-info">
                  Sign in
                </button>
                <button type="submit" className="btn btn-default float-right">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* <div className="row">
        <div className="col-12 col-sm-8">
          <div className="form-group">
            <label>ชื่อสารเคมีที่ใช้</label>
            <select
              className="form-control"
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
        </div>
      </div>
      {getselect.map((data, index) => {
        return (
          <div className="row" key={index}>
            <div className="col-12 col-sm-2">
              <div className="form-group">
                <label>ชื่อไทย</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={data.name_chemical}
                  defaultValue={data.name_chemical}
                />
              </div>
            </div>
            <div className="col-12 col-sm-2">
              <div className="form-group">
                <label>ชื่ออังกฤษ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={data.name_chemical_eng}
                  defaultValue={data.name_chemical_eng}
                />
              </div>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default Manage_plant_chemical;
