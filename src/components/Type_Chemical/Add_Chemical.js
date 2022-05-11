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
                              <div className="card-body">
                              <Form inline>
  <Form.Group>
    <Form.Label htmlFor="inputPassword6">Password</Form.Label>
    <Form.Control
      type="password"
      className="mx-sm-3"
      id="inputPassword6"
      aria-describedby="passwordHelpInline"
    />
    <Form.Text id="passwordHelpInline" muted>
      Must be 8-20 characters long.
    </Form.Text>
  </Form.Group>
</Form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
}

export default Add_Chemical