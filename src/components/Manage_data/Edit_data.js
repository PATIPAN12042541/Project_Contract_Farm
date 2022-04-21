import React from "react";

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
                <div className="card-header">
                  <h3 className="card-title">รายละเอียดข้อมูล</h3>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="col-1">#</th>
                        <th className="col-5">ชื่อแปลงผัก</th>
                        <th className="col-1">วันที่เริ่มต้น</th>
                        <th className="col-1">วันที่สิ้นสุด</th>
                        <th className="col-2">
                          <center>รูปภาพ</center>
                        </th>
                        <th className="col-2">เเก้ไขรายละเอียด</th>
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
                            <img
                              src="../dist/img/holy_basil.jpg"
                              class="img-fluid mb-2"
                              alt="white sample"
                              width="100"
                              height="100"
                            />
                          </center>
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
                        </td>
                      </tr>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>A2</td>
                        <td>ปลูกพริก</td>
                        <td>11-7-2022</td>
                        <td>11-12-2022</td>
                        <td>
                          <center>
                            <img
                              src="../dist/img/cili.jpg"
                              class="img-fluid mb-2"
                              alt="white sample"
                              width="100"
                              height="100"
                            />
                          </center>
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
                        </td>
                      </tr>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>657</td>
                        <td>Alexander Pierce</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
                        </td>
                      </tr>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>175</td>
                        <td>Mike Doe</td>
                        <td>11-7-2014</td>
                        <td>Denied</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
                        </td>
                      </tr>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>134</td>
                        <td>Jim Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
                        </td>
                      </tr>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>494</td>
                        <td>Victoria Doe</td>
                        <td>11-7-2014</td>
                        <td>Pending</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
                        </td>
                      </tr>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>832</td>
                        <td>Michael Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
                        </td>
                      </tr>
                      <tr data-widget="expandable-table" aria-expanded="false">
                        <td>982</td>
                        <td>Rocky Doe</td>
                        <td>11-7-2014</td>
                        <td>Denied</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr className="expandable-body d-none">
                        <td colSpan={5}>
                          <p style={{ display: "none" }}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
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
