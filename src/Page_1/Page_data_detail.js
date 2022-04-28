import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarAdmin from "../components/SidebarAdmin";
import Data_detail from "../components/Data_detail/Data_detail";
import { useParams } from "react-router-dom";

const Page_data_detail = () => {
  function Invoice() {
    let params = useParams();
    return params.id;
  }
  return (
    <>
      <Header />
      <SidebarAdmin />
      <Data_detail id={Invoice} />
      <Footer />
    </>
  );
};

export default Page_data_detail;
