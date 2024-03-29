import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Plant_detail.css";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";

const Plant_detail = (props) => {
  const [plantdetail, setPlantDetail] = useState([]);
  const [files, setFiles] = useState([]);
  const [quantity, setQuantity] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles2) => {
      setFiles(
        acceptedFiles2.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
  });

  const acceptedFileItems = files.map((file) => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img
          src={file.preview}
          className="img"
          name="image"
          style={{ width: "500px", height: "300px" }}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  // post image
  const uploadImg = async () => {
    let formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    
    console.log("accep :" + acceptedFiles[0]);
    console.log(formData);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/public/dist/img/UploadWorking`,
        formData
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  const getPlantData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant/plant_detail/${props.id}`
    );
    setPlantDetail(response.data);
  };

  const changeStatusPlant = async (status) => {
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}/getplant/update/PlantStatusUpdate/${props.id}`,
          {
            plant_status: status,
          }
        )
        .then(function (response) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "บันทึกสำเร็จ",
          });
          getPlantData();
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: error.response.data.msg,
            text: "Save Error!",
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.msg,
        text: "Save Error!",
      });
    }
  };

  const changeStatusHavest = async (status) => {
    const path_img = acceptedFiles.map((file) => file.path);

    if (status == 1) {
      try {
        await axios
          .patch(
            `${process.env.REACT_APP_API_URL}/getplant/update/PlantStatusUpdate/${props.id}`,
            {
              harvest_status: status,
              Path_img: "",
              quantity: 0,
            }
          )
          .then(function (response) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "บันทึกสำเร็จ",
            });
            uploadImg();
            //  getPlantData();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: error.response.data.msg,
              text: "Save Error!",
            });
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error.response.data.msg,
          text: "Save Error!",
        });
      }
    } else {
      try {
        await axios
          .patch(
            `${process.env.REACT_APP_API_URL}/getplant/update/PlantStatusUpdate/${props.id}`,
            {
              harvest_status: status,
              Path_img: "../dist/img/UploadWorking/" + path_img,
              quantity: quantity,
            }
          )
          .then(function (response) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "บันทึกสำเร็จ",
            });
            uploadImg();
            // getPlantData();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: error.response.data.msg,
              text: "Save Error!",
            });
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error.response.data.msg,
          text: "Save Error!",
        });
      }
    }
  };

  useEffect(() => {
    getPlantData();
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-12" />
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {plantdetail.map((data, index) => (
                <div className="card card-success" key={index}>
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#8CC152" }}
                  >
                    <center>
                      {data.status_plant == "1" ? (
                        <h3 className="card-title">
                          ปลูกผัก : {data.name_plant}
                        </h3>
                      ) : (
                        <h3 className="card-title">
                          ตัดผัก : {data.name_plant}
                        </h3>
                      )}
                    </center>
                  </div>
                  {data.status_plant == "1" ? (
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <img
                            className="ima-size card-img-top"
                            src="../dist/img/plant-garden.jpg"
                          />
                          <div className="waviy">
                            <span style={{ "--i": "1" }}>กำ</span>
                            <span style={{ "--i": "2" }}>ลั</span>
                            <span style={{ "--i": "3" }}>ง</span>
                            <span style={{ "--i": "4" }}>ดำ</span>
                            <span style={{ "--i": "5" }}>เ</span>
                            <span style={{ "--i": "6" }}>นิ</span>
                            <span style={{ "--i": "7" }}>น</span>
                            <span style={{ "--i": "8" }}>ก</span> 
                            <span style={{ "--i": "9" }}>า</span>
                            <span style={{ "--i": "10" }}>ร</span>
                            <span style={{ "--i": "11" }}>.</span>
                            <span style={{ "--i": "12" }}>.</span>
                            <span style={{ "--i": "13" }}>.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()}/>
                            <img
                              className="ima-size card-img-top"
                              src="../dist/img/Uploadfile.png"
                            />
                          </div>
                          <div className="waviy2">
                            <span style={{ "--i": "1" }}>U</span>
                            <span style={{ "--i": "2" }}>p</span>
                            <span style={{ "--i": "3" }}>l</span>
                            <span style={{ "--i": "4" }}>o</span>
                            <span style={{ "--i": "5" }}>a</span>
                            <span style={{ "--i": "6" }}>d</span>
                            <span style={{ "--i": "7" }}>&nbsp;</span>
                            <span style={{ "--i": "8" }}>รู</span>
                            <span style={{ "--i": "9" }}>ป</span>
                            <span style={{ "--i": "10" }}>ภ</span>
                            <span style={{ "--i": "11" }}>า</span>
                            <span style={{ "--i": "12" }}>พ</span>
                            <span style={{ "--i": "13" }}>.</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <em>
                            (Only *.jpeg and *.png images will be accepted)
                          </em>
                          <pre>
                            <aside className="thumbsContainer">
                              <h4>Filename Upload</h4>
                              <ul>{acceptedFileItems}</ul>
                            </aside>
                          </pre>
                        </div>
                        <div className="col-md-12">
                          <h4>ปริมาณการเก็บเกี่ยว</h4>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                ผลผลิตที่ได้
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              style={{ textAlign: "right" }}
                              onChange={(e) => setQuantity(e.target.value)}
                            />
                            <div className="input-group-append">
                              <span className="input-group-text">Kg</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {data.status_plant == "1" ? (
                    data.plant_status == "1" ? (
                      <div className="card-footer">
                        <button
                          type="submit"
                          className="btn btn-success float-right"
                          onClick={() => changeStatusPlant(0)}
                        >
                          ยืนยัน
                        </button>
                      </div>
                    ) : (
                      <div className="card-footer">
                        <button
                          type="submit"
                          className="btn btn-default float-right"
                          onClick={() => changeStatusPlant(1)}
                        >
                          ยกเลิก
                        </button>
                      </div>
                    )
                  ) : data.harvest_status == "1" ? (
                    <div className="card-footer">
                      <button
                        type="submit"
                        className="btn btn-success float-right"
                        onClick={() => changeStatusHavest(0)}
                      >
                        ยืนยัน
                      </button>
                    </div>
                  ) : (
                    <div className="card-footer">
                      <button
                        type="submit"
                        className="btn btn-default float-right"
                        onClick={() => changeStatusHavest(1)}
                      >
                        ยกเลิก
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};;;;;

export default Plant_detail;
