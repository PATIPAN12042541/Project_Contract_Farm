import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarRole from "../components/SidebarRole/SidebarRole";
import Manage_plant_edit from "../components/Manage_data/Manage_plant_edit";
import { useParams } from "react-router-dom";

const Page_manage_data_edit = () => {
  let params = useParams();

  return (
    <>
      <Header />
      <SidebarRole />
      <Manage_plant_edit id={params.id} />
      <Footer />
    </>
  );
};

export default Page_manage_data_edit;
