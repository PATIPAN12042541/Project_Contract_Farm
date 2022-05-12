import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Manage_zone from "../components/Plant/Manage_zone";
import SidebarRole from "../components/SidebarRole/SidebarRole";

const Page_manage_zone = () => {
  return (
    <>
      <Header />
      <SidebarRole />
      <Manage_zone />
      <Footer />
    </>
  );
};

export default Page_manage_zone;
