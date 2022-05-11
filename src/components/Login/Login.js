import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Form } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState();
    const Nav = useNavigate();

    (function(d, s, id) {
        if (d.getElementById(id)) {
            if (window.__TOMORROW__) {
                window.__TOMORROW__.renderWidget();
            }
            return;
        }
        const fjs = d.getElementsByTagName(s)[0];
        const js = d.createElement(s);
        js.id = id;
        js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";

        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'tomorrow-sdk');

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
      <>

<div class="tomorrow"
           data-location-id="106646"
           data-language="TH"
           data-unit-system="METRIC"
           data-skin="light"
           data-widget-type="aqiPollutant"
           style="padding-bottom:22px;position:relative;"
        >
          <a
            href="https://www.tomorrow.io/weather/"
            rel="nofollow noopener noreferrer"
            target="_blank"
            style="position: absolute; bottom: 0; transform: translateX(-50%); left: 50%;"
          >
            <img
              alt="Powered by Tomorrow.io"
              src="https://weather-website-client.tomorrow.io/img/powered-by-tomorrow.svg"
              width="140"
              height="15"
            />
          </a>
        </div>


      <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="#"><b>Login</b></a>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <Form onSubmit={Auth}>
                            <Form.Group className="input-group mb-3">
                                <Form.Control type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                                <Form.Group className="input-group-append">
                                    <Form.Group className="input-group-text">
                                        <span className="fas fa-user" />
                                    </Form.Group>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group className="input-group mb-3">
                                <Form.Control type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <Form.Group className="input-group-append">
                                    <Form.Group className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </Form.Group>
                                </Form.Group>
                            </Form.Group>
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
        
        </>
  )
}

export default Login