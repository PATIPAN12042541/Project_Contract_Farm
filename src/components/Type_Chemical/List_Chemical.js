import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import axios from 'axios'

const List_Chemical = () => {
    const [listChemicals,setListChemicals] = useState([]);

    useEffect(()=>{
        getListChemical();
    },[])

    const getListChemical = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chemical/getTypeChemical`);
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
                                      <Link to={"/Add_Chemical"}>
                                          <Button variant="success">เพิ่มประเภทสารเคมี</Button>
                                      </Link>
                                  </div>
                                  <hr />
                                  <div className="row">
                                      <Table responsive="md">
                                          <thead>
                                              <tr>
                                                  <th>ลำดับ</th>
                                                  <th>ประเภทสารเคมี</th>
                                                  <th>แก้ไขข้อมูล</th>
                                                  <th>ลบข้อมูล</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                                {listChemicals.map((listChemical, index) => (
                                                    <tr key={listChemical.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{listChemical.type_chemical}</td>
                                                        <td>
                                                            <Link to={`/editChemical/${listChemical.id}`} className="button is-small is-info">แก้ไขข้อมูล</Link>
                                                        </td>
                                                        <td>
                                                            <button className="button is-small is-danger">ลบข้อมูล</button>
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