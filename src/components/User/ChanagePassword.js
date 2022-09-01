import React,{ useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import {useNavigate,useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

const ChanagePassword = () => {
  const [listUsers, setListUsers] = useState([]);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const handleCloseUpdatePassword = () => setShowUpdatePassword(false);
  const handleShowUpdatePassword = () => setShowUpdatePassword(true);

  const {id} = useParams();
  const Nav = useNavigate();
  const [roleIDLogin, setRoleIDLogin] = useState();
  const [loginID, setLoginID] = useState();

  /* VAR MODAL */
  /********** update password **********/
  const [updateuserID, setUpdateUserID] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateconfirmPassword, setUpdateconfirmPassword] = useState("");
  /*************************************/

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
            setRoleIDLogin(decoded.role_id)
            setLoginID(decoded.userId);
            getListUser(decoded.userId);
        } catch (error) {
            if (error.response) {
                Nav("/");
            }
        }
        // eslint-disable-line react-hooks/exhaustive-deps
    };

    //List User
    const getListUser = async (id) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/User/getUsers/${id}`
        );
        setListUsers(response.data);
    };

    // Update Password
    const changePassword = async (id) => {
        if(id !== '' && updatePassword !== '' && updateconfirmPassword !== ''){
            try {
                await axios.patch(`${process.env.REACT_APP_API_URL}/User/updatePassword/${id}`, {
                    id: id,
                    password: updatePassword,
                    confirmPassword: updateconfirmPassword,
                })
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Update Success!",
                });
                Nav("/ChangePassword");
                getListUser(loginID);
                handleCloseUpdatePassword();
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.msg,
                    text: error,
                });
            }
        }else{
            Swal.fire({
                icon: "error",
                title: "กรุณากรอกข้อมูลให้ครบถ้วน",
                text: "Alert !",
              });
        }
    }

    useEffect(() => {
        refreshToken();
        getListUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                                  <th>เปลี่ยนรหัสผ่าน</th>
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
                                                          <Button
                                                              variant="info"
                                                              onClick={() => {
                                                                  handleShowUpdatePassword()
                                                                  setUpdateUserID(listUsers.id)
                                                                  setUpdateUsername(listUsers.username)
                                                              }}
                                                          >
                                                              เปลี่ยนรหัสผ่าน
                                                          </Button>
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

          {/* Modal Update Password */}
          <Modal show={showUpdatePassword} onHide={handleCloseUpdatePassword} >
              <Modal.Header
                  style={{
                      backgroundColor: "rgb(140, 193, 82)",
                      color: "#FFFFFF",
                      fontSize: "24px",
                  }}
              >
                  <Modal.Title>เปลี่ยน Password</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <Form className="form-horizontal">
                      <div className="card-body">
                          <div className="input-group mb-3">
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Username"
                                  value={updateUsername}
                                  disabled
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
                                  onChange={(e) => setUpdatePassword(e.target.value)}
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
                                  onChange={(e) => setUpdateconfirmPassword(e.target.value)}
                              />
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                      <span className="fas fa-lock" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Form>
              </Modal.Body>

              <Modal.Footer>
                  <button
                      className="btn btn-default"
                      style={{ float: "left" }}
                      onClick={handleCloseUpdatePassword}
                  >
                      ย้อนกลับ
                  </button>
                  &nbsp;
                  <button
                      type="button"
                      className="btn btn-success"
                      onClick={(e) => {
                          changePassword(updateuserID)
                      }}
                  >
                      บันทึก
                  </button>
              </Modal.Footer>
          </Modal>
      </div>
  )
}

export default ChanagePassword