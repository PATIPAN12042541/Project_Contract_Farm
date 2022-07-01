import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarRole from "../components/SidebarRole/SidebarRole";
import { useParams } from "react-router-dom";
import Fertilizer_detail from "../components/Data_detail/Fertilizer_detail";

const Page_Plant_fertilizer = () => {
  let params = useParams();
  return (
    <>
      <Header />
      <SidebarRole />
      <Fertilizer_detail id={params.id} />
      <Footer />
    </>
  );
};

export default Page_Plant_fertilizer;
