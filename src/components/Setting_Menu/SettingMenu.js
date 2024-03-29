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
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";
import Swal from "sweetalert2";

let PageSize = 5;
let PageSizeSubMenu = 5;

const SettingMenu = () => {

    const {id} = useParams();
    const {idSubRole} = useParams();
    const {main_menu_id} = useParams();
  
    const [rolegroup, setRoleGroup] = useState([]);
    const [selectRoleMainMenu, setSelectRoleMainMenu] = useState([]);
    const [selectRoleSubMenu, setSelectRoleSubMenu] = useState([]);
    const [updateMainMenuID, setUpdateMainMenuID] = useState("");
    const [updateRoleMainMenu, setUpdateRoleMainMenu] = useState("");
    
    const [roleMenuMain, setRoleMenuMain] = useState([]);
    const [roleMenuMainInDropDown, setRoleMenuMainInDropDown] = useState([]);
    
    const [roleMenuParentID, setRoleMenuParentID] = useState();
    const [roleMenuParent, setRoleMenuParent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSubMenu, setCurrentPageSubMenu] = useState(1);
    const Nav = useNavigate();

    /*********** refresh token ***********/
    const [token, setToken] = useState("");
    /*************************************/

    /* VAR MODAL */
    /********** insert Main Menu ***************/
    const [showInsertMainMenu, setShowInsertMainMenu] = useState(false);
    const [insertMainMenuName, setInsertMainMenuName] = useState("");
    const [insertIndexMainMenu, setInsertIndexMainMenu] = useState("");
    const [insertMainParentId, setInsertMainParentId] = useState("");
    const [insertMainLink, setInsertMainLink] = useState("");
    const [insertMainRoleId, setInsertMainRoleId] = useState("");
    const [checkedAddMainMenu, setCheckedAddMainMenu] = useState(false);
    const handleCloseInsertMainMenu = () => setShowInsertMainMenu(false);
    const handleShowInsertMainMenu = () => setShowInsertMainMenu(true);
    /******************************************/

    /* VAR MODAL */
    /********** Update Main Menu ***************/
    const [updateMainMenuName, setUpdateMainMenuName] = useState("");
    const [updateIndexMainMenu, setUpdateIndexMainMenu] = useState("");
    const [updateLinkMainMenu, setUpdateLinkMainMenu] = useState("");
    const [checkedUpdateMainMenu, setCheckedUpdateMainMenu] = useState(false);
    const [showUpdateMainMenu, setShowUpdateMainMenu] = useState(false);
    const handleCloseUpdateMainMenu = () => setShowUpdateMainMenu(false);
    const handleShowUpdateMainMenu = () => setShowUpdateMainMenu(true);
    /******************************************/

    /* VAR MODAL */
    /********** insert Sub Menu ***************/
    const [selectRoleInPopupInsertMainMenu, setSelectRoleInPopupInsertMainMenu] = useState([]);
    const [rolegroupPopupAddMainMenu, setRoleGroupPopupAddMainMenu] = useState([]);
    const [roleMenuMainInDropDownAddSubMenu, setRoleMenuMainInDropDownAddSubMenu] = useState([]);
    const [showInsertSubMenu, setShowInsertSubMenu] = useState(false);

    const [insertSubMenuName, setInsertSubMenuName] = useState("");
    const [insertIndexSubMenu, setInsertIndexSubMenu] = useState("");
    const [insertSubParentID, setInsertSubParentID] = useState("");
    const [insertSubLink, setInsertSubLink] = useState("");
    const [insertSubRoleId, setInsertSubRoleId] = useState("");
    const [checkedAddSubMenu, setCheckedAddSubMainMenu] = useState(false);
    const handleCloseInsertSubMenu = () => setShowInsertSubMenu(false);
    const handleShowInsertSubMenu = () => setShowInsertSubMenu(true);
    /******************************************/

    /* VAR MODAL */
    /********** Update Sub Menu ***************/
    const [selectRoleInPopupUpdateMainMenu, setSelectRoleInPopupUpdateMainMenu] = useState([]);
    const [updateSubMenuID, setUpdateSubMenuID] = useState("");
    const [updateSubMenuName, setUpdateSubMenuName] = useState("");
    const [updateIndexSubMenu, setUpdateIndexSubMenu] = useState("");
    const [updateSubParentID, setUpdateSubParentID] = useState("");
    const [updateSubRoleID, setUpdateSubRoleID] = useState("");
    const [updateLinkMainMenuID, setUpdateLinkMainMenuID] = useState("");
    const [updateLinkSubMenu, setUpdateLinkSubMenu] = useState("");
    const [checkedUpdateSubMainMenu, setCheckedUpdateSubMainMenu] = useState(false);
    const [rolegroupPopupUpdateMainMenu, setRoleGroupPopupUpdateMainMenu] = useState([]);
    const [roleMenuMainInDropDownUpdateSubMenu, setRoleMenuMainInDropDownUpdateSubMenu] = useState([]);
    const [showUpdateSubMenu, setShowUpdateSubMenu] = useState(false);
    const handleCloseUpdateSubMenu = () => setShowUpdateSubMenu(false);
    const handleShowUpdateSubMenu = () => setShowUpdateSubMenu(true);
    /******************************************/

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

    //Drop Down Role Popup Insert Sub Menu
    const getRoleInPopupAddMainMenu = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/role_group/roleAll`
          );
          setRoleGroupPopupAddMainMenu(response.data);
      };

    //Drop Down Role Popup Update Sub Menu
    const getRoleInPopupUpdateMainMenu = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/role_group/roleAll`
          );
          setRoleGroupPopupUpdateMainMenu(response.data);
      };

    //Load Menu By Role
    const getMenu = async (id) => {
        const response = await axios.get(
            // `${process.env.REACT_APP_API_URL}/menu/main/show/${id}`
            `${process.env.REACT_APP_API_URL}/menu/main/show/${id}`
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

    //Load Menu By Role in Drop Down Popup Add SubMenu
    const getMenuInDropDownAddSubMenu = async (id) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/menu/main/${id}`
          );
          setRoleMenuMainInDropDownAddSubMenu(response.data);
      };

    //Load Menu By Role in Drop Down Popup Update SubMenu
    const getMenuInDropDownUpdateSubMenu = async (id) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/menu/main/${id}`
          );
          setRoleMenuMainInDropDownUpdateSubMenu(response.data);
      };

    //Load Sub Menu By Role
    const getSubMenuByRole = async (idSubRole,main_menu_id) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/menu/main/${idSubRole}/sublv1/${main_menu_id}`
          );
          setRoleMenuParent(response.data);
      };

    // Pageing
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return roleMenuMain.slice(firstPageIndex, lastPageIndex);
      }, [currentPage,roleMenuMain]);// eslint-disable-line react-hooks/exhaustive-deps

    // Pageing SubMenu
    const currentTableDataSubMenu = useMemo(() => {
        const firstPageIndex = (currentPageSubMenu - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return roleMenuParent.slice(firstPageIndex, lastPageIndex);
      }, [currentPageSubMenu,roleMenuParent]);// eslint-disable-line react-hooks/exhaustive-deps

    // Add New Main Menu
    const AddMainMenu = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post(`${process.env.REACT_APP_API_URL}/menu/createMainMenu`, {
                    menu_name : insertMainMenuName,
                    index_menu : insertIndexMainMenu,
                    parent_id : 0,
                    link : insertMainLink,
                    status : checkedAddMainMenu,
                    role_id : insertMainRoleId
                })
                .then(function (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Save OK !",
                    });
                    window.location.reload();
                    handleCloseInsertMainMenu();
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: "error",
                        title: error.response.data.msg,
                        text: "Save Error!",
                    });
                });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response.data.msg,
                text: "Save Error!",
            });
        }
    };

    // Update Main Menu
    const updateMainMenu = async (id) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/menu/updateMainMenu/${id}`, {
                id : updateMainMenuID,
                menu_name : updateMainMenuName,
                index_menu : updateIndexMainMenu,
                parent_id : 0,
                link : updateLinkMainMenu,
                status : checkedUpdateMainMenu,
                role_id : updateRoleMainMenu
            })
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Update Success!",
            });
            window.location.reload();
            handleCloseUpdateMainMenu();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Update Fail!",
                text: error,
            });
        }
    }

    // Add New Sub Main Menu
    const AddSubMenu = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post(`${process.env.REACT_APP_API_URL}/menu/createSubMenu`, {
                    menu_name : insertSubMenuName,
                    index_menu : insertIndexSubMenu,
                    parent_id : insertSubParentID,
                    link : insertSubLink,
                    status : checkedAddSubMenu,
                    role_id : insertSubRoleId
                })
                .then(function (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Save OK !",
                    });
                    window.location.reload();
                    handleCloseInsertSubMenu();
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: "error",
                        title: error.response.data.msg,
                        text: "Save Error!",
                    });
                });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response.data.msg,
                text: "Save Error!",
            });
        }
    };

    // Update Sub Menu
    const updateSubMenu = async (id) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/menu/updateSubMenu/${id}`, {
                id : updateSubMenuID,
                menu_name : updateSubMenuName,
                index_menu : updateIndexSubMenu,
                parent_id : updateSubParentID == ""?roleMenuParentID:updateSubParentID,
                link : updateLinkSubMenu,
                status : checkedUpdateSubMainMenu,
                role_id : updateSubRoleID
            })
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Update Success!",
            });
            window.location.reload();
            handleCloseInsertSubMenu();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Update Fail!",
                text: error,
            });
        }
    }

      useEffect(() => {
        refreshToken();
        getRole();
        getRoleInPopupAddMainMenu();
        getRoleInPopupUpdateMainMenu();
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
                                            setSelectRoleMainMenu(e.target.value);
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
                                      <Button variant="success" onClick={handleShowInsertMainMenu}>
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
                                                                  to={``}
                                                              >
                                                                  <Button
                                                                      variant="warning"
                                                                      style={{ color: "#ffff" }}
                                                                      onClick={(e)=>{
                                                                        handleShowUpdateMainMenu();
                                                                        setUpdateMainMenuID(roleMenuMain.id);
                                                                        setUpdateMainMenuName(roleMenuMain.menu_name);
                                                                        setUpdateIndexMainMenu(roleMenuMain.index_menu);
                                                                        setUpdateLinkMainMenu(roleMenuMain.link);
                                                                        setUpdateRoleMainMenu(roleMenuMain.role_id);
                                                                        setCheckedUpdateMainMenu(roleMenuMain.status);
                                                                      }}
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
                                              setSelectRoleSubMenu(e.target.value);
                                              getMenuInDropDown(e.target.value);
                                              getSubMenuByRole(0,0)
                                              getMenuInDropDownUpdateSubMenu(e.target.value);
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
                                  <div className="row">
                                      <label className="col-form-label col-md-3">
                                          เลือกเมนูหลัก
                                      </label>
                                      <select
                                          className="form-control col-md-9"
                                          onChange={(e)=>{
                                            getSubMenuByRole(selectRoleSubMenu,e.target.value);
                                            setRoleMenuParentID(e.target.value);
                                          }}
                                      >
                                          <option value={0}>--เลือกเมนูหลักตาม Role--</option>
                                          {roleMenuMainInDropDown.map((item) => (
                                              <option key={item.id} value={item.id}>
                                                  {item.menu_name}
                                              </option>
                                          ))}
                                      </select>
                                  </div>   
                                  <br />
                                  <div>                              
                                      <Button variant="success" onClick={handleShowInsertSubMenu}>
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
                                              {currentTableDataSubMenu.map((roleMenuParent, index) => (
                                                  <tr key={roleMenuParent.id}>
                                                      <td>{index + 1}</td>
                                                      <td>{roleMenuParent.menu_name}</td>
                                                      <td>{roleMenuParent.index_menu}</td>
                                                      <td>{roleMenuParent.link}</td>
                                                      <td>
                                                          <center>
                                                              <Link
                                                                  to={``}
                                                              >
                                                                  <Button
                                                                      variant="warning"
                                                                      style={{ color: "#ffff" }}
                                                                      onClick={(e)=>{
                                                                        handleShowUpdateSubMenu();
                                                                        setUpdateSubMenuID(roleMenuParent.id);
                                                                        setUpdateSubMenuName(roleMenuParent.menu_name);
                                                                        setUpdateIndexSubMenu(roleMenuParent.index_menu);
                                                                        setUpdateSubRoleID(roleMenuParent.role_id);
                                                                        setUpdateLinkMainMenuID(roleMenuParent.parent_id);  
                                                                        setUpdateLinkSubMenu(roleMenuParent.link);                                                              
                                                                        setCheckedUpdateSubMainMenu(roleMenuParent.status);
                                                                      }}
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
                                              ))}
                                          </tbody>
                                      </Table>
                                      <Pagination
                                          className="pagination-bar"
                                          currentPage={currentPageSubMenu}
                                          totalCount={roleMenuParent.length}
                                          pageSize={PageSizeSubMenu}
                                          onPageChange={(page) => setCurrentPageSubMenu(page)}
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          {/* Modal Insert Main Menu */}
          <Modal show={showInsertMainMenu} onHide={handleCloseInsertMainMenu}>
              <Modal.Header
                  style={{
                      backgroundColor: "rgb(140, 193, 82)",
                      color: "#FFFFFF",
                      fontSize: "24px",
                  }}
              >
                  <Modal.Title>เพิ่มเมนูหลัก</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <Form className="form-horizontal">
                      <div className="card-body">
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  ชื่อเมนู
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      placeholder='ชื่อเมนู'
                                      onChange={(e)=>{
                                        setInsertMainMenuName(e.target.value);
                                      }}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  ลำดับของเมนู
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      placeholder='ลำดับของเมนู'
                                      onChange={(e)=>{
                                        setInsertIndexMainMenu(e.target.value);
                                      }}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Role
                              </Form.Label>
                              <div className="col-sm-7">
                                  <select
                                      className="form-control"
                                      onChange={(e)=>{
                                        setInsertMainRoleId(e.target.value);
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
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Link
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      placeholder='Link'
                                      onChange={(e)=>{
                                        setInsertMainLink(e.target.value);
                                      }}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Active Status
                              </Form.Label>
                              <div className="col-sm-7 col-form-label">
                                  <Switch
                                      onChange={(e) => {
                                        setCheckedAddMainMenu(!checkedAddMainMenu);
                                      }}
                                      checked={checkedAddMainMenu}
                                      className="react-switch"
                                  />
                              </div>
                          </div>
                      </div>
                  </Form>
              </Modal.Body>

              <Modal.Footer>
                  <button
                      onClick={handleCloseInsertMainMenu}
                      className="btn btn-default"
                      style={{ float: "left" }}
                  >
                      ย้อนกลับ
                  </button>
                  &nbsp;
                  <button
                      type="button"
                      className="btn btn-success"
                      onClick={AddMainMenu}
                  >
                      บันทึก
                  </button>
              </Modal.Footer>
          </Modal>

          {/* Modal Update Main Menu */}
          <Modal show={showUpdateMainMenu} onHide={handleCloseUpdateMainMenu}>
              <Modal.Header
                  style={{
                      backgroundColor: "rgb(140, 193, 82)",
                      color: "#FFFFFF",
                      fontSize: "24px",
                  }}
              >
                  <Modal.Title>แก้ไขเมนูหลัก</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <Form className="form-horizontal">
                      <div className="card-body">
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  ชื่อเมนู
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      placeholder='ชื่อเมนู'
                                      value={updateMainMenuName}
                                      onChange={(e) => setUpdateMainMenuName(e.target.value)}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  ลำดับของเมนู
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      placeholder='ลำดับของเมนู'
                                      value={updateIndexMainMenu}
                                      onChange={(e) => setUpdateIndexMainMenu(e.target.value)}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Role
                              </Form.Label>
                              <div className="col-sm-7">
                                  <select
                                      className="form-control"
                                      defaultValue={updateRoleMainMenu}
                                  >
                                      <option value={0}>--เลือก Role--</option>
                                      {rolegroup.map((item) => (
                                          <option key={item.id} value={item.id}>
                                              {item.role_group_name}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Link
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      placeholder='Link'
                                      value={updateLinkMainMenu}
                                      onChange={(e) => setUpdateLinkMainMenu(e.target.value)}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Active Status
                              </Form.Label>
                              <div className="col-sm-7 col-form-label">
                                  <Switch
                                      onChange={(e) => {
                                        setCheckedUpdateMainMenu(!checkedUpdateMainMenu);
                                      }}
                                      checked={checkedUpdateMainMenu}
                                      className="react-switch"
                                  />
                              </div>
                          </div>
                      </div>
                  </Form>
              </Modal.Body>

              <Modal.Footer>
                  <button
                      onClick={handleCloseUpdateMainMenu}
                      className="btn btn-default"
                      style={{ float: "left" }}
                  >
                      ย้อนกลับ
                  </button>
                  &nbsp;
                  <button
                      type="button"
                      className="btn btn-success"
                      onClick={()=>{
                        updateMainMenu(updateMainMenuID)
                      }}
                  >
                      บันทึก
                  </button>
              </Modal.Footer>
          </Modal>

          {/* Modal Insert Sub Menu */}
          <Modal show={showInsertSubMenu} onHide={handleCloseInsertSubMenu}>
              <Modal.Header
                  style={{
                      backgroundColor: "rgb(140, 193, 82)",
                      color: "#FFFFFF",
                      fontSize: "24px",
                  }}
              >
                  <Modal.Title>เพิ่มเมนูย่อย</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <Form className="form-horizontal">
                      <div className="card-body">
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  ชื่อเมนู
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      placeholder='ชื่อเมนู'
                                      onChange={(e)=>{
                                        setInsertSubMenuName(e.target.value);
                                      }}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  ลำดับของเมนู
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      placeholder='ลำดับของเมนู'
                                      onChange={(e)=>{
                                        setInsertIndexSubMenu(e.target.value);
                                      }}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Role
                              </Form.Label>
                              <div className="col-sm-7">
                                  <select
                                      className="form-control"
                                      onChange={(e)=>{
                                        setSelectRoleInPopupInsertMainMenu(e.target.value);
                                        setInsertSubRoleId(e.target.value);
                                        getMenuInDropDownAddSubMenu(e.target.value);
                                      }}
                                  >
                                      <option value={0}>--เลือก Role--</option>
                                      {rolegroupPopupAddMainMenu.map((item) => (
                                          <option key={item.id} value={item.id}>
                                              {item.role_group_name}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                    เลือกเมนูหลัก
                              </Form.Label>
                              <div className="col-sm-7">
                                  <select
                                      className="form-control"
                                      onChange={(e)=>{
                                        setInsertSubParentID(e.target.value);
                                      }}
                                  >
                                      <option value={0}>--เลือกเมนูหลักตาม Role--</option>
                                      {roleMenuMainInDropDownAddSubMenu.map((item) => (
                                          <option key={item.id} value={item.id}>
                                              {item.menu_name}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Link
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      placeholder='Link'
                                      onChange={(e)=>{
                                        setInsertSubLink(e.target.value);
                                      }}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Active Status
                              </Form.Label>
                              <div className="col-sm-7 col-form-label">
                                  <Switch
                                      onChange={(e) => {
                                        setCheckedAddSubMainMenu(!checkedAddSubMenu);
                                      }}
                                      checked={checkedAddSubMenu}
                                      className="react-switch"
                                  />
                              </div>
                          </div>
                      </div>
                  </Form>
              </Modal.Body>

              <Modal.Footer>
                  <button
                      onClick={handleCloseInsertSubMenu}
                      className="btn btn-default"
                      style={{ float: "left" }}
                  >
                      ย้อนกลับ
                  </button>
                  &nbsp;
                  <button
                      type="button"
                      className="btn btn-success"
                      onClick={AddSubMenu}
                  >
                      บันทึก
                  </button>
              </Modal.Footer>
          </Modal>

          {/* Modal Update Sub Menu */}
          <Modal show={showUpdateSubMenu} onHide={handleCloseUpdateSubMenu}>
              <Modal.Header
                  style={{
                      backgroundColor: "rgb(140, 193, 82)",
                      color: "#FFFFFF",
                      fontSize: "24px",
                  }}
              >
                  <Modal.Title>แก้ไขเมนูย่อย</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <Form className="form-horizontal">
                      <div className="card-body">
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  ชื่อเมนู
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      value={updateSubMenuName}
                                      onChange={(e)=>{
                                        setUpdateSubMenuName(e.target.value);
                                      }}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  ลำดับของเมนู
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      placeholder='ลำดับของเมนู'
                                      value={updateIndexSubMenu}
                                      onChange={(e)=>{
                                        setUpdateIndexSubMenu(e.target.value);
                                      }}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Role
                              </Form.Label>
                              <div className="col-sm-7">
                                  <select
                                      className="form-control"
                                      defaultValue={updateSubRoleID}
                                      onChange={(e)=>{
                                        setUpdateSubRoleID(e.target.value);
                                      }}
                                  >
                                      <option value={0}>--เลือก Role--</option>
                                      {rolegroupPopupUpdateMainMenu.map((item) => (
                                          <option key={item.id} value={item.id}>
                                              {item.role_group_name}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                    เลือกเมนูหลัก
                              </Form.Label>
                              <div className="col-sm-7">
                                  <select
                                      className="form-control"
                                      defaultValue={roleMenuParentID}
                                      onChange={(e)=>{
                                        setUpdateSubParentID(e.target.value);
                                      }}
                                  >
                                      <option value={0}>--เลือกเมนูหลักตาม Role--</option>
                                      {roleMenuMainInDropDownUpdateSubMenu.map((item) => (
                                          <option key={item.id} value={item.id}>
                                              {item.menu_name}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Link
                              </Form.Label>
                              <div className="col-sm-7">
                                  <Form.Control
                                      type="text"
                                      className="form-control"
                                      placeholder='Link'
                                      value={updateLinkSubMenu}
                                      onChange={(e)=>{
                                        setUpdateLinkSubMenu(e.target.value);
                                      }}
                                  />
                              </div>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-5 col-form-label">
                                  Active Status
                              </Form.Label>
                              <div className="col-sm-7 col-form-label">
                                  <Switch
                                      onChange={(e) => {
                                        setCheckedUpdateSubMainMenu(!checkedUpdateSubMainMenu);
                                      }}
                                      checked={checkedUpdateSubMainMenu}
                                      className="react-switch"
                                  />
                              </div>
                          </div>
                      </div>
                  </Form>
              </Modal.Body>

              <Modal.Footer>
                  <button
                      onClick={handleCloseUpdateSubMenu}
                      className="btn btn-default"
                      style={{ float: "left" }}
                  >
                      ย้อนกลับ
                  </button>
                  &nbsp;
                  <button
                      type="button"
                      className="btn btn-success"
                      onClick={()=>{
                        updateSubMenu(updateSubMenuID);
                      }}
                  >
                      บันทึก
                  </button>
              </Modal.Footer>
          </Modal>
      </div>
  )
}
export default SettingMenu