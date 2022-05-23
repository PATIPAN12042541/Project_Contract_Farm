/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const UpdateTypeUser = () => {
    const [typeUser,setTypeUser] = useState('');
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        getTypeUserById()
    },[])


    const getTypeUserById = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/role_group/getTypeUserByID/${id}`);
        setTypeUser(response.data.role_group_name);
        setChecked(response.data.status);
    }

    const updateTypeUsers = async (e) => {
        e.preventDefault();
        try{
            await axios.patch(`${process.env.REACT_APP_API_URL}/role_group/updateTypeUser/${id}`,{
                role_group_name: typeUser,
                status : checked,
            });

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Update Success!",
              });
            navigate("/ListTypeUser");
        }catch(error){
            Swal.fire({
                icon: "error",
                title: "Update Fail!",
                text: error,
              });
        }
    }
  
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12"></div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card card-info">
                                <div className="card-header"
                                    style={{ backgroundColor: "#8CC152" }}>
                                    <center>
                                        <h3 className="card-title">แก้ไขประเภทผู้ใช้ระบบ</h3>
                                    </center>
                                </div>
                                <Form className="form-horizontal" onSubmit={updateTypeUsers}>
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <Form.Label className="col-sm-4 col-form-label">ประเภทสารเคมี</Form.Label>
                                            <div className="col-sm-8">
                                                <Form.Control type="text"
                                                    className="form-control"
                                                    value={typeUser}
                                                    onChange={(e) => setTypeUser(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <Form.Label className="col-sm-4 col-form-label">Active Status</Form.Label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="checkbox"
                                                    id="custom-switch"
                                                    checked={checked}
                                                    onChange={() => setChecked(!checked)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info">บันทึก</button>&nbsp;
                                        <Link to={"/ListTypeUser"} className="btn btn-default">ย้อนกลับ</Link>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default UpdateTypeUser