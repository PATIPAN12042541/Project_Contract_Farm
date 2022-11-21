import React,{ useState, useEffect ,useMemo} from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import '../Pagination/style.scss';
import { AiFillEdit } from "react-icons/ai";
import Pagination from "../Pagination/Pagination.js";
import Image from "react-bootstrap/Image";
import { Link, useNavigate,useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

let PageSize = 5;
let PageSizeSubMenu = 5;

const SettingMenu = () => {

    const {id} = useParams();
    const {idSubRole} = useParams();
  
    const [rolegroup, setRoleGroup] = useState([]);
    const [selectRole, setSelectRole] = useState([]);
    const [selectRole2, setSelectRole2] = useState([]);
    const [roleMenuMainID, setRoleMenuMainID] = useState();
    const [roleMenuMain, setRoleMenuMain] = useState([]);
    const [roleMenuMainInDropDown, setRoleMenuMainInDropDown] = useState([]);
    const [roleMenuParentID, setRoleMenuParentID] = useState();
    const [roleMenuParent, setRoleMenuParent] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSubMenu, setCurrentPageSubMenu] = useState(1);
    const Nav = useNavigate();

    /*********** refresh token ***********/
    const [token, setToken] = useState("");
    /*************************************/

    // refresh token
    const refreshToken = async () => {
        try {
            //const response = await axios.get('http://node30998-env-3297740.th1.proen.cloud:4000/user/token');

            // const response = await axios.get("http://localhost:4000/user/token");
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/user/token`
            );
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
        } catch (error) {
            if (error.response) {
                Nav("/");
            }
        }
        // eslint-disable-line react-hooks/exhaustive-deps
    };

    //Drop Down Role
    const getRole = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/role_group/roleAll`
          );
          setRoleGroup(response.data);
      };

    //Load Menu By Role
    const getMenu = async (id) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/menu/main/${id}`
          );
          setRoleMenuMain(response.data);
      };

    //Load Menu By Role in Drop Down
    const getMenuInDropDown = async (id) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/menu/main/${id}`
          );
          setRoleMenuMainInDropDown(response.data);
      };

    //Load Sub Menu By Role
    const getSubMenuByRole = async (idSubRole) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/menu/sublv1/${idSubRole}`
          );
          setRoleMenuParent(response.data);
      };

    // Pageing
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return roleMenuMain.slice(firstPageIndex, lastPageIndex);
      }, [currentPage,roleMenuMain]);// eslint-disable-line react-hooks/exhaustive-deps

      useEffect(() => {
        refreshToken();
        getRole();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

      // Pageing SubMenu
    const currentTableDataSubMenu = useMemo(() => {
        const firstPageIndex = (currentPageSubMenu - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return roleMenuParent.slice(firstPageIndex, lastPageIndex);
      }, [currentPageSubMenu,roleMenuParent]);// eslint-disable-line react-hooks/exhaustive-deps

      useEffect(() => {
        refreshToken();
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
                                      <label className="col-form-label col-md-3">
                                            เลือก Role
                                      </label>
                                      <select
                                          className="form-control col-md-9"
                                          onChange={(e) => {
                                            setSelectRole(e.target.value);
                                            getMenu(e.target.value);
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
                                              {currentTableData.map((roleMenuMain, index) => (
                                                  <tr key={roleMenuMain.id}>
                                                      <td>{index + 1}</td>
                                                      <td>{roleMenuMain.menu_name}</td>
                                                      <td>{roleMenuMain.index_menu}</td>
                                                      <td>{roleMenuMain.link}</td>
                                                      <td>
                                                          <center>
                                                              <Link
                                                                  to={`#`}
                                                              >
                                                                  <Button
                                                                      variant="warning"
                                                                      style={{ color: "#ffff" }}
                                                                  >
                                                                      <AiFillEdit /> แก้ไขข้อมูล
                                                                  </Button>
                                                              </Link>
                                                          </center>
                                                      </td>
                                                      <td>
                                                          <center>
                                                              {roleMenuMain.status === 1 ? (
                                                                  <Image
                                                                      src="../dist/img/symbol_true.png"
                                                                      className="img-fluid mb-2"
                                                                      alt="white sample"
                                                                      width="100"
                                                                      height="100"
                                                                      thumbnail
                                                                  />
                                                              ) : (
                                                                  <Image
                                                                      src="../dist/img/symbol_false.png"
                                                                      className="img-fluid mb-2"
                                                                      alt="white sample"
                                                                      width="100"
                                                                      height="100"
                                                                      thumbnail
                                                                  />
                                                              )}
                                                          </center>
                                                      </td>
                                                  </tr>
                                              ))}
                                          </tbody>
                                      </Table>
                                      <Pagination
                                          className="pagination-bar"
                                          currentPage={currentPage}
                                          totalCount={roleMenuMain.length}
                                          pageSize={PageSize}
                                          onPageChange={(page) => setCurrentPage(page)}
                                      />
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
                                      <label className="col-form-label col-md-3">
                                          เลือก Role
                                      </label>
                                      <select
                                          className="form-control col-md-9"
                                          onChange={(e) => {
                                              setSelectRole2(e.target.value);
                                              getMenuInDropDown(e.target.value);
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
                                  <div className="row">
                                      <label className="col-form-label col-md-3">
                                          เลือกเมนูหลัก
                                      </label>
                                      <select
                                          className="form-control col-md-9"
                                          onChange={(e)=>{
                                            getSubMenuByRole(e.target.value)
                                          }}
                                      >
                                          <option>--เลือกเมนูหลักตาม Role--</option>
                                          {roleMenuMainInDropDown.map((item) => (
                                              <option key={item.id} value={item.id}>
                                                  {item.menu_name}
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
                                              {/* {currentTableDataSubMenu.map((roleMenuParent, index) => (
                                                  <tr key={roleMenuParent.id}>
                                                      <td>{index + 1}</td>
                                                      <td>{roleMenuParent.menu_name}</td>
                                                      <td>{roleMenuParent.index_menu}</td>
                                                      <td>{roleMenuParent.link}</td>
                                                      <td>
                                                          <center>
                                                              <Link
                                                                  to={`#`}
                                                              >
                                                                  <Button
                                                                      variant="warning"
                                                                      style={{ color: "#ffff" }}
                                                                  >
                                                                      <AiFillEdit /> แก้ไขข้อมูล
                                                                  </Button>
                                                              </Link>
                                                          </center>
                                                      </td>
                                                      <td>
                                                          <center>
                                                              {roleMenuParent.status === 1 ? (
                                                                  <Image
                                                                      src="../dist/img/symbol_true.png"
                                                                      className="img-fluid mb-2"
                                                                      alt="white sample"
                                                                      width="100"
                                                                      height="100"
                                                                      thumbnail
                                                                  />
                                                              ) : (
                                                                  <Image
                                                                      src="../dist/img/symbol_false.png"
                                                                      className="img-fluid mb-2"
                                                                      alt="white sample"
                                                                      width="100"
                                                                      height="100"
                                                                      thumbnail
                                                                  />
                                                              )}
                                                          </center>
                                                      </td>
                                                  </tr>
                                              ))} */}
                                          </tbody>
                                      </Table>
                                      {/* <Pagination
                                          className="pagination-bar"
                                          currentPage={currentPageSubMenu}
                                          totalCount={roleMenuParent.length}
                                          pageSize={PageSizeSubMenu}
                                          onPageChange={(page) => setCurrentPageSubMenu(page)}
                                      /> */}
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