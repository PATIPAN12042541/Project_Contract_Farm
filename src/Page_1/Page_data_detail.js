import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarAdmin from "../components/SidebarAdmin";
import Data_detail from "../components/Data_detail/Data_detail";

const Page_data_detail = (props) => {
  console.log(props);
  return (
    <>
      <Header />
      <SidebarAdmin />
      <Data_detail />
      <Footer />
    </>
  );
};

export default Page_data_detail;
