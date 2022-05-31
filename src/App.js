import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Link, } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GrowthChart from "./pages/GrowthChart";
import ContextApi from "./pages/ContextApi";
import MultiselectCheckbox from "./pages/MultiselectCheckbox";
import InputNumber from "./pages/InputNumber";
import Tawk from "./pages/Tawk";
import Rating from "./pages/Rating";
import Tabs from "./pages/Tabs";
import MultiSelectPage from "./pages/MultiSelectPage";
import UpdatePassword from "./pages/UpdatePassword";
import UseImperativeHandle from "./pages/UseImperativeHandle";
import TestApi from "./pages/TestApi";
import UseCallbackPage from "./pages/UseCallbackPage";
import PhonenumberMask from "./pages/PhonenumberMask";
import RenderingPage from "./pages/RenderingPage";
import AccordionPage from "./pages/AccordionPage";
import AccordionpkgPage from "./pages/AccordionpkgPage";
import ValidatorPage from "./pages/ValidatorPage";
import SuperPopupPage from "./pages/SuperPopupPage";

class App extends Component {
  render() {
    return (
      <div >
        <ul className="mynavbar" >
          {/* <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/growthchart" >Growth chart</Link>
          </li>
          <li>
            <Link to="/contextapi" >Context API</Link>
          </li>
          <li>
            <Link to="/multiselectcheckbox" >Multiselect checkboxes</Link>
          </li>
          <li>
            <Link to="/inputnumber" >Input Number</Link>
          </li>
          <li>
            <Link to="/tawk" >Tawk</Link>
          </li>
          <li>
            <Link to="/rating" >Rating</Link>
          </li>
          <li>
            <Link to="/tabs" >Tabs</Link>
          </li>
          <li>
            <Link to="/multiselect" >Multiselect</Link>
          </li>
          <li>
            <Link to="/updatepassword" >Update Passweord</Link>
          </li>
          <li>
            <Link to="/useimperativehandle" >Use Imperative Handle</Link>
          </li>
          <li>
            <Link to="/api" >Test api</Link>
          </li>
          <li>
            <Link to="/usecallback" >UseCallBack</Link>
          </li>
          <li>
            <Link to="/phonemask" >Phone Mask</Link>
          </li>
          <li>
            <Link to="/rendering" >Rendering</Link>
          </li>

          <li>
            <Link to="/accordion" >Accordion</Link>
          </li>
          <li>
            <Link to="/accordionpkg" >Accordion pakg</Link>
          </li>
          <li>
            <Link to="/validator" >Validator</Link>
          </li> */}
          <li>
            <Link to="/super-popup" >Super Popup</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/growthchart">
            <GrowthChart />
          </Route>
          <Route path="/contextapi">
            <ContextApi />
          </Route>
          <Route path="/multiselectcheckbox">
            <MultiselectCheckbox options={["footbal", "rugby", "cricket", "badminton"]} onChange={this.handleChange} />
          </Route>
          <Route path="/inputnumber">
            <InputNumber />
          </Route>
          <Route path="/tawk">
            <Tawk />
          </Route>
          <Route path="/rating">
            <Rating total={5} />
          </Route>
          <Route path="/tabs">
            <Tabs />
          </Route>
          <Route path="/multiselect">
            <MultiSelectPage />
          </Route>
          <Route path="/updatepassword">
            <UpdatePassword />
          </Route>
          <Route path="/useimperativehandle">
            <UseImperativeHandle />
          </Route>
          <Route path="/api">
            <TestApi />
          </Route>
          <Route path="/usecallback">
            <UseCallbackPage />
          </Route>
          <Route path="/phonemask">
            <PhonenumberMask />
          </Route>
          <Route path="/rendering">
            <RenderingPage />
          </Route>

          <Route path="/accordion">
            <AccordionPage />
          </Route>
          <Route path="/accordionpkg">
            <AccordionpkgPage />
          </Route>
          <Route path="/validator">
            <ValidatorPage />
          </Route>
          <Route path="/super-popup">
            <SuperPopupPage />
          </Route>
        </Switch>
      </div >


    )
  }
}
export default App;