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
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div>ยินดีต้องรับสู่ระบบ Contract Farming</div>
    </div>
  );
};

export default First_Page;
