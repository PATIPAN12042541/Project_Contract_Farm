import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Form } from 'react-bootstrap';
import "./Login.css";
import { BiSpa } from "react-icons/bi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Nav = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, {
        //await axios.post('http://localhost:4000/user/login', {
        username: username,
        password: password,
      })
      .then(function (response) {
        Nav("/contract_farm");
        window.location.reload();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: error,
          text: "Login Error!",
        });
      });
  };

  return (
    // <div className="hold-transition login-page login-style">
    //   <div className="login-box">
    //     <div className="login-logo">
    //       <a href="#">
    //         <b>Login</b>
    //       </a>
    //     </div>
    //     <div className="card body-color">
    //       <div className="card-body login-card-body">
    //         <Form onSubmit={Auth}>
    //           <Form.Group className="input-group mb-3">
    //             <Form.Control
    //               type="text"
    //               className="form-control"
    //               placeholder="Username"
    //               value={username}
    //               onChange={(e) => setUsername(e.target.value)}
    //             />
    //             <Form.Group className="input-group-append">
    //               <Form.Group className="input-group-text">
    //                 <span className="fas fa-user" />
    //               </Form.Group>
    //             </Form.Group>
    //           </Form.Group>
    //           <Form.Group className="input-group mb-3">
    //             <Form.Control
    //               type="password"
    //               className="form-control"
    //               placeholder="Password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //             />
    //             <Form.Group className="input-group-append">
    //               <Form.Group className="input-group-text">
    //                 <span className="fas fa-lock" />
    //               </Form.Group>
    //             </Form.Group>
    //           </Form.Group>
    //           <div className="row">
    //             <div className="col-4">
    //               <button type="submit" className="btn btn-primary btn-block">
    //                 Login
    //               </button>
    //             </div>
    //             <div className="col-4">
    //               <a href="/Register">
    //                 <button type="button" className="btn btn-info btn-block">
    //                   Register
    //                 </button>
    //               </a>
    //             </div>
    //           </div>
    //         </Form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src="./dist/img/login.jpg"
              alt="Login image"
              className="w-100 vh-100"
            />
          </div>
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4">
              <i
                className="fas fa-seedling fa-2x me-3 pt-5 mt-xl-4"
                style={{ color: "green" }}
              ></i>
              <span className="h1 fw-bold mb-0"> Contract Farming</span>
            </div>
            <div className="d-flex align-items-center h-custom-2 px-5  ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: "23rem" }} onSubmit={Auth}>
                <h3 className="fw-normal mb-3 pb-3 letter">Log in</h3>
                <div className="form-outline mb-4">
                  <label className="form-label">Username : </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Password : </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg btn-block"
                    type="button"
                  >
                    Login
                  </button>
                </div>
                <p>
                  Don't have an account?{" "}
                  <a className="link-info" href="/Register">
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;  