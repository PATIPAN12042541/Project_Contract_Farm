import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Image from 'react-bootstrap/Image'

const List_Chemical = () => {

    const [listChemicals,setListChemicals] = useState([]);

    useEffect(()=>{
        getListChemical();
    },[])

    const getListChemical = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getChemical`);
        setListChemicals(response.data);
    }

    const deleteChemical = async (id) => {
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
                await axios.delete(`${process.env.REACT_APP_API_URL}/getChemical/deleteChemical/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Delete Success!",
                        });

                        getListChemical();
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
                                    <h3 className="card-title">ข้อมูลสารเคมี</h3>
                                </center>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <Link to={"/AddChemical"}>
                                        <Button variant="success">เพิ่มข้อมูลสารเคมี</Button>
                                    </Link>
                                </div>
                                <hr />
                                <div className="row">
                                    <Table className = "table table-bordered table-hover dataTable dtr-inline" responsive>
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
                                                <th>ประเภทสารเคมี</th>
                                                <th>ชื่อสารเคมี (ไทย)</th>
                                                <th>ชื่อสารเคมี (Eng)</th>
                                                <th>ER MUL</th>
                                                <th>รูปภาพ</th>
                                                <th>แก้ไขข้อมูล</th>
                                                <th>ลบข้อมูล</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                              {listChemicals.map((listChemical, index) => (
                                                  <tr key={listChemical.id}>
                                                      <td>{index + 1}</td>
                                                      <td>{listChemical.type_chemical}</td>
                                                      <td>{listChemical.name_chemical}</td>
                                                      <td>{listChemical.name_chemical_eng}</td>
                                                      <td>{listChemical.eu_mrl}</td>
                                                      <td>
                                                          <center>
                                                              <Zoom>
                                                                  <Image 
                                                                      src={listChemical.path_img}
                                                                      className="img-fluid mb-2"
                                                                      alt="white sample"
                                                                      width="100"
                                                                      height="100"
                                                                      thumbnail 
                                                                  />
                                                              </Zoom>
                                                          </center>
                                                      </td>
                                                      <td>
                                                          <Link to={`/UpdateChemical/${listChemical.id}`}><Button variant="info">แก้ไขข้อมูล</Button></Link>
                                                      </td>
                                                      <td>
                                                          <Button variant="danger" onClick={deleteChemical(listChemical.id)}>ลบข้อมูล</Button>
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

export default List_Chemical