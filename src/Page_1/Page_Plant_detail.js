import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarRole from "../components/SidebarRole/SidebarRole";
import { useParams } from "react-router-dom";
import Plant_detail from "../components/Data_detail/Plant_detail";

const Page_Plant_detail = () => {
  let params = useParams();

  return (
    <>
      <Header />
      <SidebarRole />
      <Plant_detail id={params.id} />
      <Footer />
    </>
  );
};

export default Page_Plant_detail;
