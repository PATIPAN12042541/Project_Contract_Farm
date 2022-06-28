import React, { useState, useEffect } from "react";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import moment from "moment";
import Swal from "sweetalert2";

const Manage_plant_fertilizer = (props) => {
  console.log(props.id);
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid"></div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info">
            <div
              className="card-header"
              style={{
                backgroundColor: "#8CC152",
                color: "#FFFFFF",
              }}
            >
              <h3 className="card-title">จัดการข้อมูลปุ๋ย</h3>
            </div>
            <form className="form-horizontal"></form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manage_plant_fertilizer;
