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
    <div
      className="content-wrapper"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/First_page.png"})`,
      }}
    ></div>
  );
};

export default First_Page;
