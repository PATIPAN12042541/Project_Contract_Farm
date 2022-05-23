import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const AddTypeUser = () => {
    const [typeUser,setTypeUser] = useState("");
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const AddTypeUser = async(e)=>{
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_URL}/role_group/createTypeRole`,{
            role_group_name: typeUser,
            status : checked,
        })
        .then(function (response) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Save OK !",
              });
              navigate("/ListTypeUser")
        })
        .catch(function (error) {
            Swal.fire({
                icon: "error",
                title: error,
                text: "Save Error!",
              });
        });
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
                                        <h3 className="card-title">เพิ่มประเภทผู้ใช้งานระบบ</h3>
                                    </center>
                                </div>
                                <Form className="form-horizontal" onSubmit={AddTypeUser}>
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <Form.Label className="col-sm-4 col-form-label">ประเภทผู้ใช้งานระบบ</Form.Label>
                                            <div className="col-sm-8">
                                                <Form.Control type="text"
                                                    className="form-control"
                                                    onChange={(e) => setTypeUser(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <Form.Label className="col-sm-4 col-form-label">Active Status</Form.Label>
                                            <div className="col-sm-8 col-form-label">
                                                <input
                                                    type="checkbox"
                                                    id="custom-switch"
                                                    onChange={(e) => {
                                                        setChecked(!checked);
                                                    }}
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

export default AddTypeUser