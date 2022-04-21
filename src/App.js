import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SidebarAdmin from "./components/SidebarAdmin";
import Footer from "./components/Footer";
import Page_1_1 from "./Page_1/Page_1_1";
import Page_1_2 from "./Page_2/Page_1_2";
import First_Page from "./components/First_Page";
import Data_detail from "./components/Data_detail/Data_detail";

function App() {
  return (
    <div class="wrapper">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <SidebarAdmin />
                <First_Page />
                <Footer />
              </>
            }
          ></Route>
          <Route exact path="/Home" element={<Page_1_1 />} />
          <Route exact path="/Detail" element={<Page_1_2 />} />
          <Route
            exact
            path="/Data_detail"
            element={
              <>
                <Header />
                <SidebarAdmin />
                <Data_detail />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
