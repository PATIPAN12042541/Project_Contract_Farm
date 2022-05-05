import React from "react";
import Zoom from "react-medium-image-zoom";
import { BsFillPencilFill } from "react-icons/bs";

const Manage_plant_edit = () => {
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid"></div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 ">
              <div className="card card-primary">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#8CC152",
                    color: "#FFFFFF",
                  }}
                >
                  <h3 className="card-title">แก้ไขรายรายละเอียดข้อมูล</h3>
                </div>
                <div className="card-body">
                  <div className="col-12">
                    <table className="table table-hover">
                      <thead>
                        <th>#</th>
                        <th>ชื่อสารเคมีที่ใช้</th>
                        <th>ปริมาณสารเคมีที่ใช้</th>
                        <th>หน่วย</th>
                        <th>Note.</th>
                        <th>upload</th>
                        <th>ลบ/เเก้ไขข้อมูล</th>
                      </thead>
                      <tbody>
                        <tr
                          data-widget="expandable-table"
                          aria-expanded="false"
                        >
                          <td>1</td>
                          <td>พรีวาทอน</td>
                          <td>20</td>
                          <td>ml.</td>
                          <td>-</td>
                          <td>
                            <center>
                              <Zoom>
                                <img
                                  src="../dist/img/insecticide/Pic_1.png"
                                  className="img-fluid mb-2"
                                  alt="white sample"
                                  width="100"
                                  height="100"
                                ></img>
                              </Zoom>
                            </center>
                          </td>
                          <td>
                            <center>
                              <button
                                type="submit"
                                className="expandable-table-caret btn btn-warning"
                                style={{ color: "#FFFFFF" }}
                              >
                                <BsFillPencilFill />
                              </button>
                            </center>
                          </td>
                        </tr>
                        <tr className="expandable-body">
                          <td colSpan={8}>
                            <div className="p-0">
                              <table className="table table-hover">
                                <tbody>
                                  <tr
                                    data-widget="expandable-table"
                                    aria-expanded="true"
                                  >
                                    <td>ทดสอบระบบ</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <Link to="/Edit_data">
                    <button type="button" className="btn btn-default">
                      ย้อนกลับ
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manage_plant_edit;
