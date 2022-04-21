import React from 'react'

const Login = () => {
  return (
      <div className="hold-transition login-page">
          <div className="login-box">
              <div className="login-logo">
                  <a href="#"><b>Login</b></a>
              </div>
              <div className="card">
                  <div className="card-body login-card-body">
                      <form action="#" method="post">
                          <div className="input-group mb-3">
                              <input type="text" className="form-control" placeholder="Username" />
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
                          <div className="row">
                              <div className="col-4">
                                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                              </div>
                              <div className="col-4">
                                  <a href='/Register'><button type="button" className="btn btn-info btn-block">Register</button></a>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Login