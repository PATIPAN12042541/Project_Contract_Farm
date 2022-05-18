import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
      <section className="content-header">
        <div className="container-fluid"></div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div class="card card-info">
            <div
              class="card-header"
              style={{
                backgroundColor: "#8CC152",
                color: "#FFFFFF",
              }}
            >
              <h3 class="card-title">จัดการข้อมูลสารเคมี</h3>
            </div>
            <Form className="form-horizontal">
              <div className="card-body">
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="selecttype">
                    <Form.Label>ชื่อสารเคมี</Form.Label>
                    <Form.Select
                      defaultValue=""
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
                    </Form.Select>
                  </Form.Group>
                  {getselect.map((data, index) => {
                    return (
                      <>
                        <Form.Group as={Col} controlId="nameeng">
                          <Form.Label>ชื่อภาษาอังกฤษ</Form.Label>
                          <Form.Control
                            placeholder={data.name_chemical_eng}
                            defaultValue={data.name_chemical_eng}
                            readOnly
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="EUMRL">
                          <Form.Label>EU-MRL</Form.Label>
                          <Form.Control
                            placeholder={data.eu_mrl}
                            defaultValue={data.eu_mrl}
                            readOnly
                          />
                        </Form.Group>
                      </>
                    );
                  })}
                </Row>
              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-info">
                  Sign in
                </button>
                <button type="submit" className="btn btn-default float-right">
                  Cancel
                </button>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manage_plant_chemical;
