import React from "react";
import { Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

function refreshPage() {
  setTimeout(() => {
    window.location.reload(false);
  }, 500);
  console.log("page to reload");
}

const Manage_plant = (props) => {

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      detail: [
        {
          name_chemical: "",
          quantity_chemical: "",
          unit: "",
          note: "",
          path_image: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "detail",
  });

  const onSubmit = async (e) => {
    //console.log(e.detail);
    const detail_array = [];
    try {
      for (let i = 0; i < e.detail.length; i++) {
        detail_array
          .push(
            await axios.post(
              `${process.env.REACT_APP_API_URL}/getplant/ManagePlant/${props.id}`,
              {
                name_chemical: e.detail[i].name_chemical,
                quantity_chemical: e.detail[i].quantity_chemical,
                unit: e.detail[i].unit,
                note: e.detail[i].note,
              }
            )
          )
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Save OK !",
            });
          });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Save Error!",
      });
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid"></div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 ">
              <div className="card card-primary">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#8CC152",
                    color: "#FFFFFF",
                  }}
                >
                  <h3 className="card-title">จัดการรายละเอียดข้อมูล</h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="card-body">
                    <button
                      type="button"
                      className="btn  btn-outline-success"
                      onClick={() => {
                        append();
                      }}
                    >
                      เพิ่มข้อมูล (+)
                    </button>
                    <hr />
                    <ul>
                      {fields.map((data, index) => (
                        <li key={data.id}>
                          <div className="callout callout-info">
                            <div className="row">
                              <div className="col-12 col-sm-8">
                                <div className="form-group">
                                  <label>ชื่อสารเคมีที่ใช้</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ปริมาณสารเคมีที่ใช้"
                                    {...register(
                                      `detail.${index}.name_chemical`
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-3">
                                <div className="form-group">
                                  <label>ปริมาณที่ใช้</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ปริมาณที่ใช้"
                                    {...register(
                                      `detail.${index}.quantity_chemical`
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-1">
                                <div className="form-group">
                                  <label>หน่วย</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="หน่วยนับ"
                                    {...register(`detail.${index}.unit`)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 col-sm-8">
                                <div className="form-group">
                                  <label>Note.</label>
                                  <textarea
                                    rows="3"
                                    className="form-control"
                                    placeholder="Note"
                                    {...register(`detail.${index}.note`)}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-4">
                                <div className="form-group">
                                  <label>File input</label>
                                  <div className="input-group">
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        {...register(
                                          `detail.${index}.path_image`
                                        )}
                                      />
                                      <label className="custom-file-label">
                                        Choose file
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => remove(index)}
                              className="btn btn-outline-danger"
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-footer">
                    <Link to="/Edit_data">
                      <button type="button" className="btn btn-default">
                        ย้อนกลับ
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-default float-right"
                      style={{
                        backgroundColor: "#8CC152",
                        color: "#FFFFFF",
                      }}
                    >
                      ยืนยัน
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manage_plant;
