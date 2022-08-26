import React from "react";

const MonitorStatus = () => {
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
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}
                >
                  <h3 className="card-title">DashBoard</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3 col-sm-6 col-12">
                      <div className="info-box bg-success">
                        <span className="info-box-icon">
                          <i className="far fa-thumbs-up"></i>
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">Likes</span>
                          <span className="info-box-number">41,410</span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                          <span className="progress-description">
                            70% Increase in 30 Days
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Task</th>
                          <th>Progress</th>
                          <th style={{ width: "40px" }}>Label</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1.</td>
                          <td>Update software</td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar progress-bar-danger"
                                style={{ width: "55%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-danger">55%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2.</td>
                          <td>Clean database</td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: "70%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-warning">70%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3.</td>
                          <td>Cron job running</td>
                          <td>
                            <div className="progress progress-xs progress-striped active">
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: "30%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-primary">30%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>4.</td>
                          <td>Fix and squish bugs</td>
                          <td>
                            <div claclassNamess="progress progress-xs progress-striped active">
                              <div
                                className="progress-bar bg-success"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-success">90%</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MonitorStatus;
