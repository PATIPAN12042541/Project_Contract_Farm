import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Form,FormControl } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState();
    const Nav = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
        //await axios.post('http://localhost:4000/user/login', {
                username: username,
                password: password
            })
            .then(function (response){
                Nav('/contract_farm');
            })
            .catch(function (error){
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.msg,
                    text: 'Login Error!'
                  })
            });
    }

  
    return (
      <div className="hold-transition login-page">
          <div className="login-box">
              <div className="login-logo">
                  <a href="#"><b>Login</b></a>
              </div>
              <div className="card">
                  <div className="card-body login-card-body">
                      <Form onSubmit={Auth}>
                          <div className="input-group mb-3">
                              <Form.Control type="text" 
                                     className="form-control" 
                                     placeholder="Username"
                                     value={username} 
                                     onChange={(e)=>setUsername(e.target.value)}
                                     />
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                        <span className="fas fa-user" />
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <Form.Control type="password" 
                                     className="form-control" 
                                     placeholder="Password" 
                                     value={password} 
                                     onChange={(e)=>setPassword(e.target.value)} />
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                      <span className="fas fa-lock" />
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-4">
                                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                              </div>
                              <div className="col-4">
                                  <a href='/Register'><button type="button" className="btn btn-info btn-block">Register</button></a>
                              </div>
                          </div>
                      </Form>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Login