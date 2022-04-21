import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Detail from "../components/Detail";
import SidebarAdmin from "../components/SidebarAdmin";

const Page_1_2 = () => {
  return (
    <>
      <Header />
      <SidebarAdmin />
      <Detail />
      <Footer />
    </>
  );
};

export default Page_1_2;
