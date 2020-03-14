import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Hall from './pages/Hall';
import Legacy from "./pages/Legacy";  
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Lobby from './pages/Lobby';
import Quest from "./pages/Quest";
import Post from "./pages/Post";
import HistoryMock from "./pages/History";



export default function App() {
  return (
    <Router>
      
      <div>
        
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path='/legacy/history/:id'>
            <HistoryMock />
          </Route>
          <Route path="/legacy">
            <Legacy />
          </Route>
          <Route path="/hall">
            <Hall />
          </Route>
          <Route path="/lobby"
            component={(props)=> <Lobby {...props}/>} />
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/quest">
            <Quest />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


  
