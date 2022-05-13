import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


const Add_Chemical = () => {
    const [typeChemical,setTypeChemical] = useState("");
    const [checkStatus,setCheckStatus] = useState(0);

    const AddChemical = async(e)=>{
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_URL}/chemical/addTypeChemical`,{
            type_chemical: typeChemical
        })
        .then(function (response) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Save OK !",
              });
            window.location.reload();
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
                                      <h3 className="card-title">เพิ่มประเภทข้อมูลสารเคมี</h3>
                                  </center>
                              </div>
                              <Form className="form-horizontal" onSubmit={AddChemical}>
                                  <div className="card-body">
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-2 col-form-label">ประเภทสารเคมี</Form.Label>
                                          <div className="col-sm-10">
                                              <Form.Control type="text" 
                                                            className="form-control" 
                                                            onChange={(e)=>setTypeChemical(e.target.value)}/>
                                          </div>
                                      </div>
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-2 col-form-label">Status</Form.Label>
                                            <div className="col-sm-10">
                                                111111
                                                <Form.Check
                                                    type="checkbox"
                                                    id="custom-switch"
                                                    label="Active"
                                                    defaultChecked={true}
                                                    onChange={(e)=>{
                                                        if(checkStatus === 0){
                                                            setCheckStatus(1);
                                                            console.log("Check : "+checkStatus);
                                                        }else{
                                                            setCheckStatus(0);
                                                            console.log("Check : "+checkStatus);
                                                        }
                                                    }}
                                                />
                                            </div>
                                      </div>
                                  </div>
                                  <div className ="card-footer">
                                      <button type="submit" className="btn btn-info">บันทึก</button>&nbsp;
                                      <Link to={"/TypeChemical"} className="btn btn-default">ย้อนกลับ</Link>
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

export default Add_Chemical