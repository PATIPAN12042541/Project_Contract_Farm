import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import "../CSS/Content.css"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Register = () => {
    const [rolegroup,setRoleGroup] = useState([]);
    const [username,setUserName] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    const [name,setName] = useState();
    const [lastName,setLastName] = useState();
    const [roleID,setRoleID] = useState();
    const Nav = useNavigate();

    useEffect(() => {
        getRole();
    },[])

    const getRole = async() => {
        const response = await axios.get('http://node31023-env-2823146.th1.proen.cloud:4000/role_group');
        //const response = await axios.get(process.env.REACT_APP_API_URL+"/role_group");
        setRoleGroup(response.data);
    }

    const Register = async(e) =>{
        e.preventDefault();
        try{
            await axios.post(process.env.REACT_APP_API_URL+"/user",{
                username : username,
                password : password,
                name : name,
                last_name : lastName,
                role_id : roleID
            })
            Swal.fire({
                icon: 'success',
                title: 'OK',
                text: 'Save OK !'
              })
        }catch(error){
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Save Error!'
                  })
            }
        }
    }
    return (
      <div className="hold-transition register-page">
          <div className="register-box">
              <div className="register-logo">
                  <b>Register</b>
              </div>
              <div className="card">
                  <div className="card-body register-card-body">
                      <form onSubmit={Register}>
                          <div className="input-group mb-3">
                              <input type="text" 
                                     className="form-control" 
                                     placeholder="Username"
                                     value={username} 
                                     onChange={(e)=>setUserName(e.target.value)}/>
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
                                     onChange={(e)=>setPassword(e.target.value)}/>
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                      <span className="fas fa-lock" />
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <input type="password" 
                                     className="form-control" 
                                     placeholder="Confirm password" 
                                     value={confirmPassword} 
                                     onChange={(e)=>setConfirmPassword(e.target.value)}/>
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                      <span className="fas fa-lock" />
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <input type="text" 
                                     className="form-control" 
                                     placeholder="Name" 
                                     value={name} 
                                     onChange={(e)=>setName(e.target.value)}/>
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <input type="text" 
                                     className="form-control" 
                                     placeholder="Last Name" 
                                     value={lastName} 
                                     onChange={(e)=>setLastName(e.target.value)}/>
                              <div className="input-group-append">
                                  <div className="input-group-text">
                                  </div>
                              </div>
                          </div>
                          <div className="input-group mb-3">
                              <select className="form-control select2">
                                  <option selected="selected">--เลือก Role--</option>
                                  {rolegroup.map((item, index) => (
                                    <option key={ item.id } 
                                            value={item.id}
                                            onSelect={(e)=>setRoleID(item.id)}>
                                            {item.role_group_name}
                                    </option>                                        
                                  ))}
                              </select>                             
                          </div>
                          <div className="row">
                              <div className="col-4">
                                  <button type="submit" className="btn btn-primary btn-block">Register</button>
                              </div>
                              <div className="col-4">
                                  <a href='/Login'><button type="button" className="btn btn-info btn-block">Back</button></a>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Register