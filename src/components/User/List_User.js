import React,{ useState, useEffect ,useMemo} from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import Pagination from "../Pagination/Pagination.js";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import Image from "react-bootstrap/Image";
import '../Pagination/style.scss';

let PageSize = 5;

export const List_User = () => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showInsert, setShowInsert] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseInsert = () => setShowInsert(false);
  const handleShowInsert = () => setShowInsert(true);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const {id} = useParams();
  const Nav = useNavigate();

  /* VAR MODAL */
  /********** insert data ***************/
  const [rolegroup, setRoleGroup] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleID, setRoleID] = useState();
  const [roleName, setRoleName] = useState();
  /*************************************/

  /********** update data **********/
  const [updateuserID, setUpdateUserID] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateLastName, setUpdateLastName] = useState("");
  const [updateRoleID, setUpdateRoleID] = useState();
  const [updateRoleName, setUpdateRoleName] = useState();
  const [updateChecked, setUpdateChecked] = useState(false);
  /*********************************/

    //List User
    const getListUser = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/User/getUsersByDev`
        );
        setListUsers(response.data);
    };

    // Register User
    const Register = async (e) => {
        e.preventDefault();

        try {
            await axios
                .post(`${process.env.REACT_APP_API_URL}/user/register`, {
                    //await axios.post("http://localhost:4000/user/register",{
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword,
                    name: name,
                    last_name: lastName,
                    role_id: roleID,
                    status: 1
                })
                .then(function (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Save OK !",
                    });
                    Nav("/ListUser");
                    getListUser();
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

    // Update User
    const updateUser = async (id) => {
        if(id !== ''){
            console.log("id 2: "+id);
            try {
                console.log("name : "+updateName)
                console.log("lastName : "+updateLastName)
                console.log("roleID : "+updateRoleID)
                console.log("roleName : "+updateRoleName)
                console.log("status : "+updateChecked)
                /*await axios.patch(`${process.env.REACT_APP_API_URL}/User/updateUsers/${id}`, {
                    id: id,
                    name: updateName,
                    lastName: updateLastName,
                    roleID: updateRoleID,
                    status: updateChecked,
                })*/
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Update Success!",
                });
                Nav("/ListUser");
                /*getListUser();*/
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Update Fail!",
                    text: error,
                });
            }
        }
    }

    //Drop Down Role
    const getRole = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/role_group/roleAll`
        );
        //const response = await axios.get("http://localhost:4000/role_group");
        setRoleGroup(response.data);
      };

    // Search Item
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = listUsers.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData);
            setCurrentPage(1);
            console.log(filteredData);
        }
        else {
            setListUsers(listUsers);
            console.log(listUsers);
        }
}
  
  // Pageing
    const currentTableData = useMemo(() => {
        console.log(currentPage);
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;

        if (searchInput.length > 1) {
            return filteredResults.slice(firstPageIndex, lastPageIndex);
        }
        else {
            return listUsers.slice(firstPageIndex, lastPageIndex);
        }
    }, [currentPage, searchInput.length > 1 ? filteredResults : listUsers]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getListUser();
    getRole();
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
                                          <Button variant="success" onClick={handleShowInsert}>
                                              เพิ่มข้อมูลผู้ใช้งานระบบ
                                          </Button>
                                      </div>
                                      <div className="col-md-6">
                                          <input
                                              type="text"
                                              className="form-control"
                                              placeholder="ค้นหา"
                                              onChange={(e) => searchItems(e.target.value)}
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
                                                  <th>Active</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              {currentTableData.map((listUsers, index) => (
                                                  <tr key={listUsers.id}>
                                                      <td>{index + 1}</td>
                                                      <td>{listUsers.group_name}</td>
                                                      <td>{listUsers.name}</td>
                                                      <td>{listUsers.last_name}</td>
                                                      <td>
                                                          <center>
                                                              <Link to={``}>
                                                                  <Button onClick={()=>{
                                                                    handleShowUpdate()
                                                                    setUpdateUserID(listUsers.id)
                                                                    setUpdateName(listUsers.name)
                                                                    setUpdateLastName(listUsers.last_name)
                                                                    setUpdateRoleID(listUsers.group_id)
                                                                    setUpdateRoleName(listUsers.group_name)
                                                                    setUpdateChecked(listUsers.status)
                                                                  }}
                                                                      variant="warning"
                                                                      style={{ color: "#ffff" }}
                                                                  >
                                                                    <AiFillEdit />
                                                                  </Button>
                                                              </Link>
                                                          </center>
                                                      </td>
                                                      <td>
                                                          <center>
                                                              {listUsers.status === 1 ? (
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
                                          totalCount={
                                              searchInput.length > 1
                                                  ? filteredResults.length
                                                  : listUsers.length
                                          }
                                          pageSize={PageSize}
                                          onPageChange={(page) => setCurrentPage(page)}
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <Modal show={showInsert} onHide={handleCloseInsert}>
              <Modal.Header
                  style={{
                      backgroundColor: "rgb(140, 193, 82)",
                      color: "#FFFFFF",
                      fontSize: "24px",
                  }}
              >
                  <Modal.Title>เพิ่มข้อมูลผู้ใช้งานระบบ</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <Form className="form-horizontal">
                      <div className="card-body">
                          <div className="input-group mb-3">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Username"
                                  value={username}
                                  onChange={(e) => setUserName(e.target.value)}
                              />
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                      <span className="fas fa-user" />
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                      <span className="fas fa-lock" />
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3 ">
                              <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Confirm password"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                              />
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                      <span className="fas fa-lock" />
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                              />
                          </div>
                          <div className="input-group mb-3">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Last Name"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                              />
                          </div>
                          <div className="form-group mb-3">
                              <select
                                  className="form-control"
                                  onChange={(e) => {
                                      setRoleID(e.target.value);
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
                      </div>
                  </Form>
              </Modal.Body>

              <Modal.Footer>
                  <button
                      onClick={handleCloseInsert}
                      className="btn btn-default"
                      style={{ float: "left" }}
                  >
                      ย้อนกลับ
                  </button>
                  &nbsp;
                  <button
                      type="button"
                      className="btn btn-success"
                      onClick={Register}
                  >
                      บันทึก
                  </button>
              </Modal.Footer>
          </Modal>

          <Modal show={showUpdate} onHide={handleCloseUpdate} >
              <Modal.Header
                  style={{
                      backgroundColor: "rgb(140, 193, 82)",
                      color: "#FFFFFF",
                      fontSize: "24px",
                  }}
              >
                  <Modal.Title>แก้ไขข้อมูลผู้ใช้งานระบบ</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <Form className="form-horizontal">
                      <div className="card-body">             
                          <div className="input-group mb-3">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Name"
                                  Value={updateName}
                                  onChange={(e) => setUpdateName(e.target.value)}
                              />
                          </div>
                          <div className="input-group mb-3">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Last Name"
                                  Value={updateLastName}
                                  onChange={(e) => setUpdateLastName(e.target.value)}
                              />
                          </div>
                          <div className="form-group mb-3">
                              <select
                                  className="form-control"
                                  defaultValue={updateRoleName}
                                  onChange={(e) => {
                                      setUpdateRoleName(e.target.value);
                                  }}
                              >
                                  <option>--เลือก Role--</option>
                                  {rolegroup.map((item) => (
                                      <option key={item.id}>
                                              {item.role_group_name}
                                      </option>
                                  ))}
                              </select>
                          </div>
                          <div className="form-group row">
                              <Form.Label className="col-sm-4 col-form-label">Active Status</Form.Label>
                              <div className="col-sm-8 col-form-label">
                                  <input
                                      type="checkbox"
                                      id="custom-switch"
                                      checked={updateChecked}
                                      onChange={(e) => {
                                          setUpdateChecked(!updateChecked);
                                      }}
                                  />
                              </div>
                          </div>
                      </div>
                  </Form>
              </Modal.Body>

              <Modal.Footer>
                  <button
                      onClick={handleCloseUpdate}
                      className="btn btn-default"
                      style={{ float: "left"}}
                  >
                      ย้อนกลับ
                  </button>
                  &nbsp;
                  <button
                      type="button"
                      className="btn btn-success"
                      onClick={()=>{
                        updateUser(updateuserID)
                      }}
                  >
                      บันทึก
                  </button>
              </Modal.Footer>
          </Modal>
      </div>
  )
}
