import React, { useState, useEffect } from "react";



function refreshPage() {
  setTimeout(() => {
    window.location.reload(false);
  }, 500);
}

const First_Page = () => {
  // useEffect(() => {
  //   refreshPage();
  // }, []);

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
                <img src="./First_page.png"></img>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First_Page;
