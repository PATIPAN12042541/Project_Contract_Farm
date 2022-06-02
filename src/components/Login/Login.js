import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Form } from 'react-bootstrap';
import "./Login.css";

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
    <div className="hold-transition login-page login-style">
      <div className="login-box">
        <div className="login-logo">
          <a href="#">
            <b>Login</b>
          </a>
        </div>
        <div className="card body-color">
          <div className="card-body login-card-body">
            <Form onSubmit={Auth}>
              <Form.Group className="input-group mb-3">
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Group className="input-group-append">
                  <Form.Group className="input-group-text">
                    <span className="fas fa-user" />
                  </Form.Group>
                </Form.Group>
              </Form.Group>
              <Form.Group className="input-group mb-3">
                <Form.Control
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Group className="input-group-append">
                  <Form.Group className="input-group-text">
                    <span className="fas fa-lock" />
                  </Form.Group>
                </Form.Group>
              </Form.Group>
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </div>
                <div className="col-4">
                  <a href="/Register">
                    <button type="button" className="btn btn-info btn-block">
                      Register
                    </button>
                  </a>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login