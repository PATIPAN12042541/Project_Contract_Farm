import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";
import SidebarAdmin from "../components/SidebarAdmin";

const Page_1_1 = () => {
  return (
    <>
      <Header />
      <SidebarAdmin />
      <Content />
      <Footer />
    </>
  );
};

export default Page_1_1;
