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
          <div className="row">
            <div
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/First_page.png"
                })`,
              }}
            >
              Hello World
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First_Page;
