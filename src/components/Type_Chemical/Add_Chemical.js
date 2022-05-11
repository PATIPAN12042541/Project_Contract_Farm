import React from 'react'
import Form from 'react-bootstrap/Form'

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
                          <div className="card card-success">
                              <div className="card-header"
                                   style={{ backgroundColor: "#8CC152" }}>
                                  <center>
                                      <h3 className="card-title">เพิ่มประเภทข้อมูลสารเคมี</h3>
                                  </center>
                              </div>
                              <form class="form-horizontal">
                                  <div className="card-body">
                                      <div className="row">
                                          <div class="form-group row">
                                              <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                              <div class="col-sm-10">
                                                  <input type="email" class="form-control" id="inputEmail3" placeholder="Email" />
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
}

export default Add_Chemical