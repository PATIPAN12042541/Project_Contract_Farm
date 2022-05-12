/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Update_Chemical = () => {
    const [typeChemical,setTypeChemical] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        getTypeChemicalById()
    },[])


    const getTypeChemicalById = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chemical/getTypeChemical/${id}`);
        setTypeChemical(response.data.typeChemical);

        console.log(response.data.typeChemical);
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
                                        <h3 className="card-title">แก้ไขประเภทข้อมูลสารเคมี</h3>
                                    </center>
                                </div>
                                <Form className="form-horizontal">
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <Form.Label className="col-sm-2 col-form-label">ประเภทสารเคมี</Form.Label>
                                            <div className="col-sm-10">
                                                <Form.Control type="text" 
                                                                className="form-control" 
                                                                value={typeChemical}
                                                                onChange={(e)=>setTypeChemical(e.target.value)}/>
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

export default Update_Chemical