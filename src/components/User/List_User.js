import React,{ useState, useEffect ,useMemo} from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Pagination from "../Pagination/Pagination.js";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
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
  const [rolegroup, setRoleGroup] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleID, setRoleID] = useState("");

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
            })
            .then(function (response) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Save OK !",
              });
              Nav("/ListUser");
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

    //Drop Down Role
    const getRole = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/role_group/roleAll`
        );
        //const response = await axios.get("http://localhost:4000/role_group");
        setRoleGroup(response.data);
      };

      const getUserById = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getUsers/${id}`);
        setName(response.data.name)
        setLastName(response.data.last_name)
        setRoleID(response.data.group_id)
    }

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
    else{
        setListUsers(listUsers);
        console.log(listUsers);
    }
}
  
  // Pageing
  const currentTableData = useMemo(() => {
    console.log(currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    if (searchInput.length > 1){
      return filteredResults.slice(firstPageIndex, lastPageIndex);
    }
    else
    {
      return listUsers.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage,searchInput.length > 1 ? filteredResults : listUsers]); // eslint-disable-line react-hooks/exhaustive-deps

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
                                                  <th>ลบข้อมูล</th>
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
                                                                  <Button onClick={handleShowUpdate}
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
                                                              <Button
                                                                  variant="danger"
                                                              >
                                                                <BsTrashFill />
                                                              </Button>
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

          <Modal show={showUpdate} onHide={handleCloseUpdate}>
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
                  >
                      บันทึก
                  </button>
              </Modal.Footer>
          </Modal>
      </div>
  )
}
