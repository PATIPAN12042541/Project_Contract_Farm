import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Zoom from "react-medium-image-zoom";

// function refreshPage() {
//   setTimeout(() => {
//     window.location.reload(false);
//   }, 500);
// }

const Manage_plant = (props) => {
  const [getChemical, setGetChemical] = useState([]);
  const [image, setImage] = useState({ preview: "", data: "" });

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("/Edit_data", { replace: true }),
    [navigate]
  );

  const getChemicals = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getChemical`
    );
    setGetChemical(response.data);
  };

  useEffect(() => {
    getChemicals();
  }, []);

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

  const onSubmit = async (data) => {
    console.log(data);
    // Swal.fire({
    //   icon: "success",
    //   title: "Are you sure Confirm?",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "OK",
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     const detail_array = [];
    //     let formData = new FormData();

    //     try {
    //       for (let i = 0; i < data.detail.length; i++) {
    //         const uuid = uuidv4();
    //         detail_array.push(
    //           await axios.post(
    //             `${process.env.REACT_APP_API_URL}/getplant/ManagePlant/${props.id}`,
    //             {
    //               auto_id: uuid,
    //               name_chemical: data.detail[i].name_chemical,
    //               quantity_chemical: data.detail[i].quantity_chemical,
    //               unit: data.detail[i].unit,
    //               note: data.detail[i].note,
    //               path_image: data.detail[i].path_image[0].name,
    //             }
    //           ),
    //           formData.append("file", data.detail[i].path_image[0]),
    //           await axios
    //             .post(
    //               `${process.env.REACT_APP_API_URL}/public/dist/img/insecticide`,
    //               formData
    //             )
    //             .then((res) => console.log(res.data))
    //             .catch((err) => console.error(err))
    //         );
    //       }
    //       Swal.fire("Success", "success");
    //       handleOnClick(); //callback page
    //     } catch (error) {
    //       Swal.fire({
    //         icon: "error",
    //         title: "error",
    //         text: "Save Error!",
    //       });
    //     }
    //   }
    // });
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
                          {index + 1}
                          <div className="callout callout-info">
                            <div className="row">
                              <div className="col-12 col-sm-8">
                                <div className="form-group">
                                  <label>ชื่อสารเคมีที่ใช้</label>
                                  <select
                                    className="select2 form-control"
                                    {...register(
                                      `detail.${index}.name_chemical`
                                    )}
                                  >
                                    {getChemical.map((Chemical, index) => {
                                      return (
                                        <option key={index}>
                                          {Chemical.name_chemical}
                                        </option>
                                      );
                                    })}
                                  </select>
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
                                        accept="image/*"
                                        className="custom-file-input"
                                        {...register(
                                          `detail.${index}.path_image`
                                        )}
                                        onUpload={(file) => {
                                          const img = {
                                            preview: URL.createObjectURL(
                                              file[0]
                                            ),
                                            data: file[0],
                                          };
                                          setImage(img);
                                        }}
                                      />
                                      <label className="custom-file-label">
                                        Choose file
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-1">
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
