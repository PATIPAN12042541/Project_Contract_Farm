import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SidebarAdmin from "./components/SidebarAdmin";
import Footer from "./components/Footer";
import Page_1_1 from "./Page_1/Page_1_1";
import Page_1_2 from "./Page_2/Page_1_2";
import Page_Login from "./Page_Login/Page_Login";
import Register from "./components/Register/Register";
import First_Page from "./components/First_Page";
import Data_detail from "./components/Data_detail/Data_detail";
import Edit_data from "./components/Manage_data/Edit_data";
import Manage_plant from "./components/Manage_data/Manage_plant";

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
          <Route exact path="/Login" element={<Page_Login />} />
          <Route exact path="/Register" element={<Register />} />
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
          <Route
            exact
            path="/Edit_data"
            element={
              <>
                <Header />
                <SidebarAdmin />
                <Edit_data />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/Manage_plant/:id"
            element={
              <>
                <Header />
                <SidebarAdmin />
                <Manage_plant />
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
