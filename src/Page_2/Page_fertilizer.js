import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarRole from "../components/SidebarRole/SidebarRole";
import Manage_plant_fertilizer from "../components/Manage_data/Manage_plant_fertilizer";
import { useParams } from "react-router-dom";

const Page_fertilizer = () => {
  let params = useParams();
  return (
    <>
      <Header />
      <SidebarRole />
      <Manage_plant_fertilizer id={params.id} />
      <Footer />
    </>
  );
};

export default Page_fertilizer;
