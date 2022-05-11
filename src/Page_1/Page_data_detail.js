import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarRole from "../components/SidebarRole/SidebarRole";
import Plant from "../components/Plant/Plant";
import { useParams } from "react-router-dom";

const Page_data_detail = () => {
  let params = useParams();

  return (
    <>
      <Header />
      <SidebarRole />
      <Plant id={params.id} />
      <Footer />
    </>
  );
};

export default Page_data_detail;
