import React,{ useState, useEffect ,useMemo } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const List_User = () => {
  const [listUsers, setListUsers] = useState([]);
  const navigate = useNavigate();

  const getListUserDev = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/User/getUsersByDev`
    );
    setListUsers(response.data);

    console.log(listUsers)
  };

  useEffect(() => {
    getListUserDev();
  },[]);
  return (
      <div className="content-wrapper">
          <section className="content">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="card card-success">
                              <div
                                  className="card-header"
                                  style={{ backgroundColor: "#8CC152" }}
                              >
                                  <center>
                                      <h3 className="card-title">ข้อมูลผู้ใช้งานระบบ</h3>
                                  </center>
                              </div>
                              <div className="card-body">
                                  <div className="row">
                                      <div className="col-md-6">
                                          <Button variant="success">
                                              เพิ่มข้อมูลผู้ใช้งานระบบ
                                          </Button>
                                      </div>
                                      <div className="col-md-6">
                                          <input
                                              type="text"
                                              className="form-control"
                                              placeholder="ค้นหา"
                                          />
                                      </div>
                                  </div>
                                  <hr />
                                  <div className="row">
                                      <Table
                                          className="table table-bordered table-hover dataTable dtr-inline"
                                          responsive
                                      >
                                          <thead>
                                              <tr>
                                                  <th>ลำดับ</th>
                                                  <th>ประเภท User</th>
                                                  <th>ชื่อ</th>
                                                  <th>นามสกุล</th>
                                                  <th>แก้ไขข้อมูล</th>
                                                  <th>ลบข้อมูล</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              {listUsers.map((listUsers, index) => (
                                                  <tr key={listUsers.id}>
                                                      <td>{index + 1}</td>
                                                      <td>{listUsers.group_name}</td>
                                                      <td>{listUsers.name}</td>
                                                      <td>{listUsers.last_name}</td>
                                                      <td>
                                                          <center>
                                                              <Link to={``}>
                                                                  <Button
                                                                      variant="warning"
                                                                      style={{ color: "#ffff" }}
                                                                  >
                                                                  </Button>
                                                              </Link>
                                                          </center>
                                                      </td>
                                                      <td>
                                                          <center>
                                                              <Button
                                                                  variant="danger"
                                                              >
                                                              </Button>
                                                          </center>
                                                      </td>
                                                  </tr>
                                              ))}
                                          </tbody>
                                      </Table>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
}
