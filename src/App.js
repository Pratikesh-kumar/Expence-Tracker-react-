import React from "react";
import { Route, Redirect } from "react-router-dom";
import SignUp from "./components/Pages/SignUp";
import SignIn from "./components/Pages/SignIn";
import LoginContext ,{ LoginContextProvider } from "./components/Context/LoginContext";
import IncompleteProfile from "./components/Pages/IncompleteProfile";
import ForgotPassword from "./components/Pages/ForgotPassword";

import Welcome from "./components/Pages/Welcome";
import Header from './components/Layout/Header';
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <LoginContextProvider>
        <Header/>
        {/* <Route path="*">
        <Redirect to="/signUp" />
      </Route> */}

      <Route path="/signUp">
        <SignUp />
      </Route>


        <Route path="/signIn">
          <SignIn />
        </Route>

        <Route path="/welcome">
          <Welcome />
        </Route>

        <Route path="/incompleteProfile">
          <IncompleteProfile />
        </Route>
         
         
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>


      </LoginContextProvider>
    </React.Fragment>
  );
}

export default App;
