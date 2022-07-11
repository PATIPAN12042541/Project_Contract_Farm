import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Plant_detail.css";
import Swal from "sweetalert2";

const Plant_detail = (props) => {
  const [plantdetail, setPlantDetail] = useState([]);

  const getPlantData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/zoneplant/plant_detail/${props.id}`
    );
    setPlantDetail(response.data);
    // console.log(response.data);
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
          // Swal.fire({
          //   icon: "success",
          //   title: "Success",
          //   text: "Save OK !",
          // });
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
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}/getplant/update/PlantStatusUpdate/${props.id}`,
          {
            harvest_status: status,
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
                            <div style={"--i:1"}>กำ</div>
                            <div style={"--i:2"}>ลั</div>
                            <div style={"--i:3"}>ง</div>
                            <div style={{ "--i": "4" }}>ดำ</div>
                            <div style={{ "--i": "5" }}>เ</div>
                            <div style={{ "--i": "6" }}>นิ</div>
                            <div style={{ "--i": "7" }}>น</div>
                            <div style={{ "--i": "8" }}>ก</div>
                            <div style={{ "--i": "9" }}>า</div>
                            <div style={{ "--i": "10" }}>ร</div>
                          </div>
                          {/* <div id="text-word">
                            <center>กำลังดำเนินการ...</center>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <img
                            className="ima-size card-img-top"
                            src="../dist/img/harvest-veggies.jpg"
                          />
                          <div id="text-word">
                            <center>กำลังดำเนินการ...</center>
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
};

export default Plant_detail;
