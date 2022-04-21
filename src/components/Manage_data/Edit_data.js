import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Edit_data = () => {
  return (
    <div className="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-12">
              {/* <center>
                <h1>คิดออกค่อยใส่อีกที</h1>
              </center> */}
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152", color: "#FFFFFF" }}
                >
                  <h3 className="card-title">รายละเอียดข้อมูล</h3>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="col-1">หมายเลขเเปลงผัก</th>
                        <th className="col-5">
                          <center>ชื่อแปลงผัก</center>
                        </th>
                        <th className="col-1">
                          <center>วันที่เริ่มต้น</center>
                        </th>
                        <th className="col-1">
                          <center>วันที่สิ้นสุด</center>
                        </th>
                        <th className="col-2">
                          <center>รูปภาพ</center>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>A1</td>
                        <td>ปลูกกระเพรา</td>
                        <td>01-01-2022</td>
                        <td>01-04-2022</td>
                        <td>
                          <center>
                            <Zoom>
                              <img
                                src="../dist/img/holy_basil.jpg"
                                class="img-fluid mb-2"
                                alt="white sample"
                                width="100"
                                height="100"
                              />
                            </Zoom>
                          </center>
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>แก้ไขข้อมูล</p>
                        </td>
                      </tr>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>A2</td>
                        <td>ปลูกพริก</td>
                        <td>11-07-2022</td>
                        <td>11-12-2022</td>
                        <td>
                          <center>
                            <Zoom>
                              <img
                                src="../dist/img/cili.jpg"
                                class="img-fluid mb-2"
                                alt="white sample"
                                width="100"
                                height="100"
                              />
                            </Zoom>
                          </center>
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>แก้ไขข้อมูล</p>
                        </td>
                      </tr>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>A3</td>
                        <td>ปลูกเขือ</td>
                        <td>11-07-2022</td>
                        <td>11-08-2022</td>
                        <td>
                          <center>
                            <Zoom>
                              <img
                                src="../dist/img/Thai-Eggplant-2.jpg"
                                class="img-fluid mb-2"
                                alt="white sample"
                                width="100"
                                height="100"
                              />
                            </Zoom>
                          </center>
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>แก้ไขข้อมูล</p>
                        </td>
                      </tr>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>A4</td>
                        <td>ปลูกแตงกวา</td>
                        <td>02-03-2022</td>
                        <td>02-09-2022</td>
                        <td>
                          <center>
                            <Zoom>
                              <img
                                src="../dist/img/images2.jpg"
                                class="img-fluid mb-2"
                                alt="white sample"
                                width="100"
                                height="100"
                              />
                            </Zoom>
                          </center>
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>แก้ไขข้อมูล</p>
                        </td>
                      </tr>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>A5</td>
                        <td>ปลูกผักกาดขาว</td>
                        <td>04-01-2022</td>
                        <td>04-03-2022</td>
                        <td>
                          <center>
                            <Zoom>
                              <img
                                src="../dist/img/images.jpg"
                                class="img-fluid mb-2"
                                alt="white sample"
                                width="100"
                                height="100"
                              />
                            </Zoom>
                          </center>
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>แก้ไขข้อมูล</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Edit_data;
