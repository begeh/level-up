import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Hall from './Hall';
import Legacy from "./Legacy";
import SignIn from './SignIn';
import SignUp from './SignUp';
import Lobby from './Lobby';


export default function App() {
  return (
    <Router>
      
      <body>
        
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/legacy">
            <Legacy />
          </Route>
          <Route path="/hall">
            <Hall />
          </Route>
          <Route path="/lobby">
            <Lobby />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </body>
    </Router>
  );
}


  
