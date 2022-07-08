import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import "../CSS/Content.css"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Register = () => {
  const [rolegroup, setRoleGroup] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleID, setRoleID] = useState("");
  const Nav = useNavigate();
  // const [show, setShow] = useState(false);
  // const [checkpass, setCheckPass] = useState(false);

  // const [wordingPass, setwordingPass] = useState("");

  useEffect(() => {
    getRole();
  }, []);

  const getRole = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/role_group/roleRegister`
    );
    //const response = await axios.get("http://localhost:4000/role_group");
    setRoleGroup(response.data);
  };

  // const ShowandHide = (data) => {
  //   if (data.length < 8) {
  //     setShow(true);
  //     setUserName(data);
  //   } else {
  //     setShow(false);
  //     setUserName(data);
  //   }
  // };

  // const CheckPassworld = (data) => {
  //   let smallCount, numberCount, symbolCount;

  //   smallCount = (data.match(/[a-z]/g) || []).length;
  //   numberCount = (data.match(/[0-9]/g) || []).length;
  //   symbolCount = (data.match(/\W/g) || []).length;

  //   if (data.length < 8) {
  //     setCheckPass(true);
  //     setwordingPass("กรุณาตั้ง Passworld อย่างน้อย 8 ตัว");
  //   } else {
  //     setCheckPass(false);
  //     setwordingPass("");

  //     if (smallCount < 1) {
  //       setCheckPass(true);
  //       setwordingPass("กรุณาตั้งตัวหนังสือพิมพ์เล็ก อย่างน้อย 1 ตัว");
  //     } else {
  //       setCheckPass(false);
  //       setwordingPass("");

  //       if (numberCount < 1) {
  //         setCheckPass(true);
  //         setwordingPass("กรุณาตั้งตัวตัวเลข อย่างน้อย 1 ตัว");
  //       } else {
  //         setCheckPass(false);
  //         setwordingPass("");
  //         if (symbolCount < 1) {
  //           setCheckPass(true);
  //           setwordingPass("กรุณาตั้งอักษรพิเศษ อย่างน้อย 1 ตัว");
  //         } else {
  //           setCheckPass(false);
  //           setwordingPass("");
  //         }
  //       }
  //     }
  //   }
  //   setPassword(data);
  // };

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
          Nav("/");
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

  return (
    <div className="hold-transition register-page bg-img">
      <div className="register-box">
        <div className="register-logo">
          <b style={{ color: "#FFFF" }}>Register</b>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <form onSubmit={Register}>
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
                <div className="input-group-append">
                  <div className="input-group-text"></div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text"></div>
                </div>
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
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
                <div className="col-4">
                  <a href="/">
                    <button type="button" className="btn btn-info">
                      Back
                    </button>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register