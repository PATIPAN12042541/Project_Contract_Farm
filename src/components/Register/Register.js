import React from 'react'
import "../CSS/Content.css"

const Register = () => {
  return (
      <div className="hold-transition register-page">
          <div className="register-box">
              <div className="register-logo">
                  <b>Register</b>
              </div>
              <div className="card">
                  <div className="card-body register-card-body">
                      <form action="#" method="post">
                          <div className="input-group mb-3">
                              <input type="text" className="form-control" placeholder="Full name" />
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                      <span className="fas fa-user" />
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <input type="password" className="form-control" placeholder="Password" />
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                      <span className="fas fa-lock" />
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <input type="password" className="form-control" placeholder="Confirm password" />
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                      <span className="fas fa-lock" />
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <input type="text" className="form-control" placeholder="Name" />
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <input type="text" className="form-control" placeholder="Last Name" />
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <select className="form-control select2">
                                  <option selected="selected">--เลือก Role--</option>
                                  <option>Alabama</option>
                                  <option>Alaska</option>
                                  <option>California</option>
                                  <option>Delaware</option>
                                  <option>Tennessee</option>
                                  <option>Texas</option>
                                  <option>Washington</option>
                              </select>                             
                          </div>
                          <div className="row">
                              <div className="col-4">
                                  <button type="submit" className="btn btn-primary btn-block">Register</button>
                              </div>
                              <div className="col-4">
                                  <a href='/Login'><button type="button" className="btn btn-info btn-block">Back</button></a>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>

  )
}

export default Register