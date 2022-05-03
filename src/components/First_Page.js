import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const First_Page = () => {
  const [data, setData] = [];
  const { control } = useForm();

  const append = () => {
    setData([...data, { id: uuidv4() }]);
  };
  console.log(uuidv4());

  const remove = (index) => {
    setData([...data.slice(0, index), ...data.slice(index + 1)]);
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <form>
                <h1 className="m-0">
                  ยินดีต้อนรับเข้าสู่ระบบ Contract Farming
                </h1>
                <ul>
                  {/* {data.map((item, index) => (
                    <li key={item.id}>
                      <Controller
                        as={<input />}
                        name={`field${item.id}`}
                        control={control}
                      />
                      <button onClick={() => remove(index)}>Delete</button>
                    </li>
                  ))} */}
                </ul>
                <section>
                  <button
                    type="button"
                    onClick={() => {
                      append();
                    }}
                  >
                    append
                  </button>
                </section>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First_Page;
