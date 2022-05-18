import React, { useState, useEffect } from "react";
import axios from "axios";


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
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical/Select/${data}`
    );
    setSelect(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getChemicals();
  }, []);

  return (
    <div className="content-wrapper">
      <div class="card card-info">
        <div class="card-header">
          <h3 class="card-title">Horizontal Form</h3>
        </div>
        <form className="form-horizontal">
          <div className="card-body">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="offset-sm-2 col-sm-10">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" />
                  <label className="form-check-label">Remember me</label>
                </div>
              </div>
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
