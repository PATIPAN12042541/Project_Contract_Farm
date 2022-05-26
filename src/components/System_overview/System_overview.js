import React, { useState, useEffect } from "react";
import axios from "axios";

const System_overview = () => {
  const [Overview, setOverview] = useState([]);

  const getOverview = async () => {
    const overview = await axios.get(
      `${process.env.REACT_APP_API_URL}/OverView`
    );
    setOverview(overview.data);
    console.log(overview.data);
  };

  useEffect(() => {
    getOverview();
  }, []);

  return <div className="content-wrapper">ทดสอบระบบ</div>;
};

export default System_overview;
