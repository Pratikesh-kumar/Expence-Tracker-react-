
import React from 'react';
import { Route,Redirect} from 'react-router-dom';
import SignUp from './components/Pages/SignUp';
import SignIn from './components/Pages/SignIn';
import { LoginContextProvider } from './components/Context/LoginContext';

import Welcome from './components/Pages/Welcome';
import './App.css';

function App() {
  return (
    <React.Fragment>
    <LoginContextProvider>
      {/* <Route path="*">
        <Redirect to="/signUp" />
      </Route>

      <Route path="/signUp">
        <SignUp />
      </Route> */}

      <Route path="/signIn">
        <SignIn />
      </Route>

      <Route path="/welcome">
        <Welcome />
      </Route>
    </LoginContextProvider>
  </React.Fragment>

  );
}

export default App;
