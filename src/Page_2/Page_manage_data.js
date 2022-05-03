import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarRole from "../components/SidebarRole/SidebarRole";
import Manage_plant from "../components/Manage_data/Manage_plant";
import { useParams } from "react-router-dom";

const Page_manage_data = () => {
  let params = useParams();

  return (
    <>
      <Header />
      <SidebarRole />
      <Manage_plant id={params.id} />
      <Footer />
    </>
  );
};

export default Page_manage_data;
