import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarRole from "../components/SidebarRole/SidebarRole";
import Edit_chemical from "../components/Chemical/Edit_chemical";

const Page_Edit_chemical = () => {
  return (
    <>
      <Header />
      <SidebarRole />
      <Edit_chemical />
      <Footer />
    </>
  );
};

export default Page_Edit_chemical;
