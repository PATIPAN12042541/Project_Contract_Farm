import React, { useState ,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Add_Chemical = () => {
    const [ListTypeChemical,setListTypeChemical] = useState([])
    const [typeChemicalID,setTypeChemicalID] = useState()

    useEffect(() => {
        getListTypeChemicals();
    },[])

    const getListTypeChemicals = async() => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chemical/getTypeChemical`);
        //const response = await axios.get("http://localhost:4000/role_group");
        setListTypeChemical(response.data);
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
                      <div className="col-md-6">
                          <div className="card card-info">
                              <div className="card-header"
                                   style={{ backgroundColor: "#8CC152" }}>
                                  <center>
                                      <h3 className="card-title">เพิ่มข้อมูลสารเคมี</h3>
                                  </center>
                              </div>
                              <Form className="form-horizontal">
                                  <div className="card-body">
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-2 col-form-label">ประเภทสารเคมี</Form.Label>
                                          <div className="col-sm-10">
                                              <select className="form-control"
                                                  onChange={(e) => { setTypeChemicalID(e.target.value) }}>
                                                  <option>--เลือกประเภทสารเคมี--</option>
                                                  {ListTypeChemical.map((item) => (
                                                      <option key={item.id}
                                                          value={item.id}>
                                                          {item.type_chemical}
                                                      </option>
                                                  ))}
                                              </select>             
                                          </div>
                                      </div>
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-2 col-form-label">Active Status</Form.Label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="checkbox"
                                                    id="custom-switch"
                                                />
                                            </div>
                                      </div>
                                  </div>
                                  <div className ="card-footer">
                                      <button type="submit" className="btn btn-info">บันทึก</button>&nbsp;
                                      <Link to={"/ListChemical"} className="btn btn-default">ย้อนกลับ</Link>
                                  </div>
                              </Form>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
}

export default Add_Chemical