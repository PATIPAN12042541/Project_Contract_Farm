import React, { useState ,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Zoom from "react-medium-image-zoom"
import FileUpload from "@hawk-ui/file-upload"
import Swal from 'sweetalert2'

const Add_Chemical = () => {
    const [ListTypeChemical,setListTypeChemical] = useState([])
    const [typeChemicalID,setTypeChemicalID] = useState()
    const [image, setImage] = useState({ preview: "", data: "" })
    const [image_name, setImageName] = useState()

    useEffect(() => {
        getListTypeChemicals();
    },[])

    const getListTypeChemicals = async() => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chemical/getTypeChemical`);
        setListTypeChemical(response.data);
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
                                      <h3 className="card-title">เพิ่มข้อมูลสารเคมี</h3>
                                  </center>
                              </div>
                              <Form className="form-horizontal">
                                  <div className="card-body">
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-3 col-form-label">ประเภทสารเคมี</Form.Label>
                                          <div className="col-sm-9">
                                              <select className="form-control"
                                                  onChange={(e) => { setTypeChemicalID(e.target.value) }}>
                                                  <option>--เลือกประเภทสารเคมี--</option>
                                                  {ListTypeChemical.map((item) => (
                                                      <option key={item.id}
                                                          value={item.id}>
                                                          {item.type_chemical}
                                                      </option>
                                                  ))}
                                              </select>             
                                          </div>
                                      </div>
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-3 col-form-label">ชื่อสารเคมี (ไทย)</Form.Label>
                                          <div className="col-sm-9">
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="ชื่อสารเคมี (ไทย)"/>
                                            </div>
                                      </div>
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-3 col-form-label">ชื่อสารเคมี (Eng)</Form.Label>
                                          <div className="col-sm-9">
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="ชื่อสารเคมี (Eng)"/>
                                            </div>
                                      </div>
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-3 col-form-label">รูป</Form.Label>
                                          <div className="col-sm-9">
                                                <Zoom>
                                                    <img
                                                        src={
                                                            image.preview
                                                                ? image.preview
                                                                : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                                                        }
                                                        className="img-fluid mb-2"
                                                        width="100"
                                                        height="100"
                                                    />
                                                </Zoom>

                                                <FileUpload
                                                    btnIcon="fas fa-upload"
                                                    multiple
                                                    accept="image/*"
                                                    onUpload={(file) => {
                                                        const filesArray = [].slice.call(file);
                                                        filesArray.forEach((e) => {
                                                            setImageName(e.name);
                                                        });

                                                        const img = {
                                                            preview: URL.createObjectURL(file[0]),
                                                            data: file[0],
                                                        };
                                                        setImage(img);
                                                    }}
                                />
                                            </div>
                                      </div>
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-3 col-form-label">Active Status</Form.Label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="checkbox"
                                                    id="custom-switch"
                                                />
                                            </div>
                                      </div>
                                  </div>
                                  <div className ="card-footer">
                                      <button type="submit" className="btn btn-info">บันทึก</button>&nbsp;
                                      <Link to={"/ListChemical"} className="btn btn-default">ย้อนกลับ</Link>
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