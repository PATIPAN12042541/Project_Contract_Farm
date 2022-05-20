import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const ListTypeUser = () => {
    const [listTypeUser,setListTypeUser] = useState([]);

    useEffect(()=>{
        getListTypeUser();
    },[])

    const getListTypeUser = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/role_group`);
        setListTypeUser(response.data);
    }

    const deleteTypeUser = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want Delete !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK !'
        }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/role_group/deleteTypeUser/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Delete Success!",
                        });

                        getListTypeUser();
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: "error",
                            title: "Delete Fail!",
                            text: error,
                        });
                    });
            }
        })
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
                        <div className="col-md-12">
                            <div className="card card-success">
                                <div className="card-header"
                                    style={{ backgroundColor: "#8CC152" }}>
                                    <center>
                                        <h3 className="card-title">ประเภทผู้ใช้งานระบบ</h3>
                                    </center>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <Link to={"/addTypeChemical"}>
                                            <Button variant="success">เพิ่มประเภทผู้ใช้งานระบบ</Button>
                                        </Link>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <Table className="table table-bordered table-hover dataTable dtr-inline" responsive>
                                            <thead>
                                                <tr>
                                                    <th>ลำดับ</th>
                                                    <th>ประเภทผู้ใช้งานระบบ</th>
                                                    <th>แก้ไขข้อมูล</th>
                                                    <th>ลบข้อมูล</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listTypeUser.map((listTypeUser, index) => (
                                                    <tr key={listTypeUser.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{listTypeUser.role_group_name}</td>
                                                        <td>
                                                            {/* <Link to={`/editTypeChemical/${listChemical.id}`}><Button variant="info">แก้ไขข้อมูล</Button></Link> */}
                                                            <Button variant="info">แก้ไขข้อมูล</Button>
                                                        </td>
                                                        <td>
                                                            <Button variant="danger" onClick={(e) => deleteTypeUser(listChemical.id)}>ลบข้อมูล</Button>
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
        </div>
  )
}

export default ListTypeUser