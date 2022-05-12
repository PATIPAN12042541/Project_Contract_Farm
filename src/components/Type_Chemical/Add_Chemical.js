import React from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

const Add_Chemical = () => {
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
                          <div className="card card-info">
                              <div className="card-header"
                                   style={{ backgroundColor: "#8CC152" }}>
                                  <center>
                                      <h3 className="card-title">เพิ่มประเภทข้อมูลสารเคมี</h3>
                                  </center>
                              </div>
                              <Form className="form-horizontal">
                                  <div className="card-body">
                                      <div className="form-group row">
                                          <Form.Label className="col-5 col-form-label">ประเภทสารเคมี</Form.Label>
                                          <div className="col-7">
                                              <Form.Control type="text" className="form-control" />
                                          </div>
                                      </div>
                                      <button type="button" className="btn btn-info">บันทึก</button>&nbsp;
                                          <Link to={"/Type_Chemical"} className="btn btn-default">ย้อนกลับ</Link>
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