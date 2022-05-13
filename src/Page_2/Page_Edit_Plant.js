import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarRole from "../components/SidebarRole/SidebarRole";
import Edit_data from "../components/Manage_data/Edit_data";
import { useParams } from "react-router-dom";

const Page_Edit_Plant = () => {
  let params = useParams();

  return (
    <>
      <Header />
      <SidebarRole />
      <Edit_data id={params.id} />
      <Footer />
    </>
  );
};

export default Page_Edit_Plant;
