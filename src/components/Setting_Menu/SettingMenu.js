import React,{ useState, useEffect ,useMemo} from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import '../Pagination/style.scss';

const SettingMenu = () => {
  
    const [rolegroup, setRoleGroup] = useState([]);
    const [roleMenuMainID, setRoleMenuMainID] = useState();
    const [roleMenuMain, setRoleMenuMain] = useState();
    const [roleMenuParentID, setRoleMenuParentID] = useState();

    //Drop Down Role
    const getRole = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/role_group/roleAll`
          );
          setRoleGroup(response.data);
      };

    //Load Menu By Role
    const getMenu = async (rold_id) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/menu/main/role_id`
          );
          setRoleMenuMain(response.data);
          console.log("rold_id : "+rold_id)
      };

      useEffect(() => {
        getRole();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

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
                                  <center>
                                      <h3 className="card-title">ตั้งค่าเมนูหลัก</h3>
                                  </center>
                              </div>
                              <div className="card-body">
                                  <div className="row">
                                      <select
                                          className="form-control"
                                          onChange={(e) => {
                                            getMenu(e.target.value)
                                          }}
                                      >
                                          <option value={0}>--เลือก Role--</option>
                                          {rolegroup.map((item) => (
                                              <option key={item.id} value={item.id}>
                                                  {item.role_group_name}
                                              </option>
                                          ))}
                                      </select>
                                  </div>   
                                  <br />
                                  <div>                              
                                      <Button variant="success">
                                          เพิ่มเมนูหลัก
                                      </Button>
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
                                                  <th>ชื่อเมนู</th>
                                                  <th>ลำดับของเมนู</th>
                                                  <th>Link</th>
                                                  <th>
                                                      <center>แก้ไขข้อมูล</center>
                                                  </th>
                                                  <th>Active</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                          </tbody>
                                      </Table>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                          <div className="card card-success">
                              <div
                                  className="card-header"
                                  style={{ backgroundColor: "#8CC152" }}
                              >
                                  <center>
                                      <h3 className="card-title">ตั้งค่าเมนูย่อย</h3>
                                  </center>
                              </div>
                              <div className="card-body">
                                  <div className="row">
                                      <select
                                          className="form-control"
                                          onChange={(e) => {
                                            setRoleMenuParentID(e.target.value);
                                          }}
                                      >
                                          <option>--เลือก Role--</option>
                                          {rolegroup.map((item) => (
                                              <option key={item.id} value={item.id}>
                                                  {item.role_group_name}
                                              </option>
                                          ))}
                                      </select>
                                  </div>   
                                  <br />
                                  <div>                              
                                      <Button variant="success">
                                          เพิ่มเมนูย่อย
                                      </Button>
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
                                                  <th>ชื่อเมนู</th>
                                                  <th>ลำดับของเมนู</th>
                                                  <th>Link</th>
                                                  <th>
                                                      <center>แก้ไขข้อมูล</center>
                                                  </th>
                                                  <th>Active</th>
                                              </tr>
                                          </thead>
                                          <tbody>
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
export default SettingMenu