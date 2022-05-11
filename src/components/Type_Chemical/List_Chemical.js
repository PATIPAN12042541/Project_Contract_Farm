import React from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

const List_Chemical = () => {
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
                          <div className="card card-success">
                              <div className="card-header"
                                   style={{ backgroundColor: "#8CC152" }}>
                                  <center>
                                      <h3 className="card-title">ประเภทข้อมูลสารเคมี</h3>
                                  </center>
                              </div>
                              <div className="card-body">
                                  <div className="row">
                                      <Link to={"/Add_Chemical"}>
                                          <Button variant="success">เพิ่มประเภทสารเคมี</Button>
                                      </Link>
                                  </div>
                                  <hr />
                                  <div className="row">
                                      <Table responsive="md">
                                          <thead>
                                              <tr>
                                                  <th>ลำดับ</th>
                                                  <th>ประเภทสารเคมี</th>
                                                  <th>แก้ไข</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                          </tbody>
                                      </Table>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
}

export default List_Chemical