import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarRole from "../components/SidebarRole/SidebarRole";
import Manage_plant from "../components/Manage_data/Manage_plant";
import { useParams } from "react-router-dom";
import Manage_plant_chemical from "../components/Manage_data/Manage_plant_chemical";

const Page_manage_data = () => {
  let params = useParams();

  return (
    <>
      <Header />
      <SidebarRole />
      <Manage_plant_chemical id={params.id} />
      <Footer />
    </>
  );
};

export default Page_manage_data;
