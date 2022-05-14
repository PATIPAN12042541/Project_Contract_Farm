import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const List_Chemical = () => {

    const [listChemicals,setListChemicals] = useState([]);

    useEffect(()=>{
        getListChemical();
    },[])

    const getListChemical = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getChemical`);
        setListChemicals(response.data);
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
                                    <h3 className="card-title">ประเภทข้อมูลสารเคมี</h3>
                                </center>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <Link to={"#"}>
                                        <Button variant="success">เพิ่มประเภทสารเคมี</Button>
                                    </Link>
                                </div>
                                <hr />
                                <div className="row">
                                    <Table responsive="md">
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
                                                <th>ชื่อสารเคมี (ไทย)</th>
                                                <th>ชื่อสารเคมี (Eng)</th>
                                                <th>ER MUL</th>
                                                <th>รูปภาพ</th>
                                                <th>แก้ไขข้อมูล</th>
                                                <th>Status Active</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                              {listChemicals.map((listChemical, index) => (
                                                  <tr key={listChemical.id}>
                                                      <td>{index + 1}</td>
                                                      <td>{listChemical.name_chemical}</td>
                                                      <td>{listChemical.name_chemical_eng}</td>
                                                      <td>{listChemical.eu_mrl}</td>
                                                      <td>
                                                          <center>
                                                              <Zoom>
                                                                  <img
                                                                      src={listChemical.path_img}
                                                                      className="img-fluid mb-2"
                                                                      alt="white sample"
                                                                      width="100"
                                                                      height="100"
                                                                  />
                                                              </Zoom>
                                                          </center>
                                                      </td>
                                                      <td>
                                                          <Link to={`#`}><Button variant="info">แก้ไขข้อมูล</Button></Link>
                                                      </td>
                                                      <td>
                                                      <Button variant="danger">ลบข้อมูล</Button>
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