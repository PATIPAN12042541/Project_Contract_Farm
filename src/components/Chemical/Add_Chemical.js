import React, { useState ,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Zoom from "react-medium-image-zoom"
import FileUpload from "@hawk-ui/file-upload"
import Image from 'react-bootstrap/Image'
import Swal from 'sweetalert2'

const Add_Chemical = () => {
    const [ListTypeChemical,setListTypeChemical] = useState([])
    const [checked, setChecked] = useState(false)
    const [nameChemicalThai,setNameChemicalThai] = useState("")
    const [nameChemicalEng,setNameChemicalEng] = useState("")
    const [eumrl,setEumrl] = useState("")
    const [typeChemicalID,setTypeChemicalID] = useState()
    const [image, setImage] = useState({ preview: "", data: "" })
    const [image_name, setImageName] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        getListTypeChemicals();
    },[])

    const getListTypeChemicals = async() => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chemical/getTypeChemical`);
        setListTypeChemical(response.data);
    }
    
    const AddChemical = async(e)=>{
        e.preventDefault();
        await axios
          .post(`${process.env.REACT_APP_API_URL}/getChemical/createChemical`, {
            name_chemical: nameChemicalThai,
            name_chemical_eng: nameChemicalEng,
            eu_mrl: eumrl,
            path_img:
              image_name == undefined
                ? "../dist/img/No_Image_Available.jpg"
                : "../dist/img/insecticide/" + image_name,
            type_chemical_id: typeChemicalID,
            status: checked,
          })
          .then(function (response) {
            uploadImg();
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Save OK !",
            });
            navigate("/ListChemical");
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: error,
              text: "Save Error!",
            });
          });
    }

    const uploadImg = async () => {
        let formData = new FormData();
        formData.append("file", image.data);
    
        await axios
          .post(`${process.env.REACT_APP_API_URL}/public/dist/img/insecticide`, formData)
          .then((res) => console.log(res.data))
          .catch((err) => console.error(err));
      };
  
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
                              <Form className="form-horizontal" onSubmit={AddChemical}>
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
                                                    placeholder="ชื่อสารเคมี (ไทย)"
                                                    onChange={(e)=>setNameChemicalThai(e.target.value)}/>
                                            </div>
                                      </div>
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-3 col-form-label">ชื่อสารเคมี (Eng)</Form.Label>
                                          <div className="col-sm-9">
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="ชื่อสารเคมี (Eng)"
                                                    onChange={(e)=>setNameChemicalEng(e.target.value)}/>
                                            </div>
                                      </div>
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-3 col-form-label">EU MRL</Form.Label>
                                          <div className="col-sm-9">
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="EU MRL"
                                                    pattern="[0-9]*"
                                                    onKeyPress={(e) => {
                                                        if (!/[0-9]/.test(e.key)) {
                                                          e.preventDefault();
                                                        }
                                                      }}
                                                    onChange={(e)=>setEumrl(e.target.value)}/>
                                            </div>
                                      </div>
                                      <div className="form-group row">
                                          <Form.Label className="col-sm-3 col-form-label">รูป</Form.Label>
                                          <div className="col-sm-9">
                                                <Zoom>
                                                    <Image
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
                                            <div className="col-sm-9 col-form-label">
                                                <input
                                                    type="checkbox"
                                                    onChange={(e)=>{
                                                        setChecked(!checked);
                                                    }}
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