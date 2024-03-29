import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SidebarRole from "./components/SidebarRole/SidebarRole";
import Footer from "./components/Footer";
import Page_1_1 from "./Page_1/Page_1_1";
import Page_1_2 from "./Page_2/Page_1_2";
import Page_Login from "./Page_Login/Page_Login";
import Register from "./components/Register/Register";
import First_Page from "./components/First_Page";
import Home from "./components/Home";
import Page_Edit_Plant from "./Page_2/Page_Edit_Plant";
import Page_data_detail from "./Page_1/Page_data_detail";
import Page_manage_data from "./Page_2/Page_manage_data";
import Page_manage_data_edit from "./Page_2/Page_manage_data_edit";
import Page_System_overview from "./Page_2/Page_System_overview";
import List_TypeChemical from "./components/TypeChemical/List_TypeChemical.js";
import Add_TypeChemical from "./components/TypeChemical/Add_TypeChemical.js";
import Update_TypeChemical from "./components/TypeChemical/Update_TypeChemical.js";
import Page_chemical from "./Page_1/Page_chemical";
import Page_manage_zone from "./Page_2/Page_manage_zone";
import List_Chemical from "./components/Chemical/List_Chemical.js";
import Add_Chemical from "./components/Chemical/Add_Chemical.js";
import Update_Chemical from "./components/Chemical/Update_Chemical.js";
import ListTypeUser from "./components/TypeUser/ListTypeUser.js";
import AddTypeUser from "./components/TypeUser/AddTypeUser.js";
import UpdateTypeUser from "./components/TypeUser/UpdateTypeUser.js";
import Content from "./components/Content";
import "./App.css";
import Page_Plant_detail from "./Page_1/Page_Plant_detail";
import Plant_master from "./components/Plant_Master/Plant_master";
import Page_fertilizer from "./Page_2/Page_fertilizer";
import Page_Plant_fertilizer from "./Page_1/Page_Plant_fertilizer";
import FertilizerUnit from "./components/FertilizerUnit/FertilizerUnit.js";
import TimeChemical from "./components/Time_Chemical/TimeChemical.js";
import { List_User } from "./components/User/List_User.js";
import Plant_master_type from "./components/Plant_Master/Plant_master_type";
import MonitorStatus from "./components/System_overview/MonitorStatus";
import ChanagePassword from "./components/User/ChanagePassword";
import Report_Defect from "./components/Report_Defect/Report_Defect";
import SettingMenu from "./components/Setting_Menu/SettingMenu";
import Harvest_show from "./components/Harvest_show/Harvest_show";

function App() {
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
                <Home />
                <Footer />
              </>
            }
          ></Route>
          <Route index element={<Page_Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Home" element={<Page_1_1 />} />
          <Route
            exact
            path="/weather"
            element={
              <>
                <Header />
                <SidebarRole />
                <First_Page />
                <Footer />
              </>
            }
          />
          <Route exact path="/Detail" element={<Page_1_2 />} />
          <Route exact path="/Data_detail/:id" element={<Page_data_detail />} />
          <Route exact path="/Edit_data/:id" element={<Page_Edit_Plant />} />
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
          <Route
            exact
            path="/System_overview"
            element={<Page_System_overview />}
          />
          <Route
            exact
            path="/TypeChemical"
            element={
              <>
                <Header />
                <SidebarRole />
                <List_TypeChemical />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/addTypeChemical"
            element={
              <>
                <Header />
                <SidebarRole />
                <Add_TypeChemical />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/editTypeChemical/:id"
            element={
              <>
                <Header />
                <SidebarRole />
                <Update_TypeChemical />
                <Footer />
              </>
            }
          />
          <Route exact path="/Page_chemical/:id" element={<Page_chemical />} />
          <Route
            exact
            path="/Page_manage_zone"
            element={<Page_manage_zone />}
          />
          <Route
            exact
            path="/ListChemical"
            element={
              <>
                <Header />
                <SidebarRole />
                <List_Chemical />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/AddChemical"
            element={
              <>
                <Header />
                <SidebarRole />
                <Add_Chemical />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/UpdateChemical/:id"
            element={
              <>
                <Header />
                <SidebarRole />
                <Update_Chemical />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/ListTypeUser"
            element={
              <>
                <Header />
                <SidebarRole />
                <ListTypeUser />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/AddTypeUser"
            element={
              <>
                <Header />
                <SidebarRole />
                <AddTypeUser />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/UpdateTypeUser/:id"
            element={
              <>
                <Header />
                <SidebarRole />
                <UpdateTypeUser />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/Plant_detail/:id"
            element={<Page_Plant_detail />}
          />
          <Route
            exact
            path="/PlantMaster"
            element={
              <>
                <Header />
                <SidebarRole />
                <Plant_master />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/Manage_fertilizer/:id"
            element={<Page_fertilizer />}
          />
          <Route
            exact
            path="/Page_Plant_fertilizer/:id"
            element={<Page_Plant_fertilizer />}
          />
          <Route
            exact
            path="/fertilizerUnit"
            element={
              <>
                <Header />
                <SidebarRole />
                <FertilizerUnit />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/TimeChemical"
            element={
              <>
                <Header />
                <SidebarRole />
                <TimeChemical />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/ListUser"
            element={
              <>
                <Header />
                <SidebarRole />
                <List_User />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/PlantMasterType"
            element={
              <>
                <Header />
                <SidebarRole />
                <Plant_master_type />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/PlantMasterType"
            element={
              <>
                <Header />
                <SidebarRole />
                <Plant_master_type />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/MonitorStatus"
            element={
              <>
                <Header />
                <SidebarRole />
                <MonitorStatus />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/ChangePassword"
            element={
              <>
                <Header />
                <SidebarRole />
                <ChanagePassword />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/reportDefect"
            element={
              <>
                <Header />
                <SidebarRole />
                <Report_Defect />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/SettingMenu"
            element={
              <>
                <Header />
                <SidebarRole />
                <SettingMenu />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/Harvest_show"
            element={
              <>
                <Header />
                <SidebarRole />
                <Harvest_show />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
