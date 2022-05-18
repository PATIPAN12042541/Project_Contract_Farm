import React, { useState, useEffect } from "react";
import axios from "axios";


const Manage_plant_chemical = (props) => {
  const [getChemical, setGetChemical] = useState([]);
  const [getselect, setSelect] = useState([]);

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
      <div className="row">
        <div className="col-12 col-sm-8">
          <div className="form-group">
            <label>ชื่อสารเคมีที่ใช้งาน</label>
            <select
              className="form-control"
              onChange={(e) => getSelect(e.target.value)}
            >
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
      })}
    </div>
  );
};

export default Manage_plant_chemical;
