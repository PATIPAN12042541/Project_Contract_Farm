import React from "react";
import "../CSS/ReportDefect.css";

const Report_Defect = () => {
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>รายงานปัญหา</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-body row">
            <div className="col-5 text-center d-flex align-items-center justify-content-center">
              <div className="">
                <h1>
                  Contract<strong>Farming</strong>
                </h1>
                <p className="lead mb-5">report an issue</p>
              </div>
            </div>
            <div className="col-7">
              <div className="form-group">
                <label className="inputName">ชื่อแปลง</label>
                <input className="text" id="inputName" class="form-control" />
              </div>
              <div className="form-group">
                <label for="inputEmail">หัวข้อปัญหา</label>
                <input type="email" id="inputEmail" className="form-control" />
              </div>
              {/* <div class="form-group">
                <label for="inputSubject">Subject</label>
                <input type="text" id="inputSubject" className="form-control" />
              </div> */}
              <div className="form-group">
                <label for="inputMessage">ปัญหาที่พบ</label>
                <textarea
                  id="inputMessage"
                  className="form-control"
                  rows="4"
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Send message"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Report_Defect;
    