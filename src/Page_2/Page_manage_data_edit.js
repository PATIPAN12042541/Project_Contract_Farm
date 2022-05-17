import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarRole from "../components/SidebarRole/SidebarRole";
import Manage_plant_edit from "../components/Manage_data/Manage_plant_edit";
import { useParams, useLocation } from "react-router-dom";

const Page_manage_data_edit = () => {
  let params = useParams();
  const location = useLocation();

  console.log(location);

  return (
    <>
      <Header />
      <SidebarRole />
      <Manage_plant_edit id={params.id} id_edit={location.state} />
      <Footer />
    </>
  );
};

export default Page_manage_data_edit;
