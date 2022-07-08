import React from "react";

const TimeChemical = () => {
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
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <div className="row">
                    <div className="col-md-11">
                      <h1 className="card-title">จัดการโซนเพาะปลูก</h1>
                    </div>
                    <div className="col-md-1">
                      <button
                        type="submit"
                        className="btn btn-success"
                        // onClick={handleShow}
                      >
                        เพิ่มข้อมูล
                      </button>
                    </div>
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

export default TimeChemical;
