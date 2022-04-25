import React,{useState} from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState();
    const Nav = Navigate;

    const Auth = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/user/login', {
                username: username,
                password: password
            })
            .then(function (response){
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Login Success !'
                  })
                  Nav('/');
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
                      <form onSubmit={Auth}>
                          <div className="input-group mb-3">
                              <input type="text" 
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
                              <input type="password" 
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
                      </form>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Login