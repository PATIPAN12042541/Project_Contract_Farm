import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarRole from "../components/SidebarRole/SidebarRole";
import System_overview from "../components/System_overview/System_overview";

const Page_System_overview = () => {
  return (
    <>
      <Header />
      <SidebarRole />
      <System_overview />
      <Footer />
    </>
  );
};

export default Page_System_overview;
