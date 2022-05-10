import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Header from "./components/Header";
import SidebarRole from "./components/SidebarRole/SidebarRole";
import Footer from "./components/Footer";
import Page_1_1 from "./Page_1/Page_1_1";
import Page_1_2 from "./Page_2/Page_1_2";
import Page_Login from "./Page_Login/Page_Login";
import Register from "./components/Register/Register";
import First_Page from "./components/First_Page";
import Edit_data from "./components/Manage_data/Edit_data";
import Page_data_detail from "./Page_1/Page_data_detail";
import Page_manage_data from "./Page_2/Page_manage_data";
import Page_manage_data_edit from "./Page_2/Page_manage_data_edit";
import Page_Edit_chemical from "./Page_2/Page_Edit_chemical";
import Weather from "./components/Weather/Weather";

function App() {
  let params = useParams();

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/contract_farm"
            element={
              <>
                <Header />
                <SidebarRole />
                <First_Page />
                <Footer />
              </>
            }
          ></Route>
          <Route index element={<Page_Login />} />
          <Route exact path="/Weather" element={<Weather />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Home" element={<Page_1_1 />} />
          <Route exact path="/Detail" element={<Page_1_2 />} />
          <Route exact path="/Data_detail/:id" element={<Page_data_detail />} />
          <Route
            exact
            path="/Edit_data"
            element={
              <>
                <Header />
                <SidebarRole />
                <Edit_data />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/Manage_plant/:id"
            element={<Page_manage_data />}
          />
          <Route
            exact
            path="/Manage_plant_edit/:id"
            element={<Page_manage_data_edit />}
          />
          <Route exact path="/Edit_chemical" element={<Page_Edit_chemical />} />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
