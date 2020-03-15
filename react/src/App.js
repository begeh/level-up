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
  const state = {
    user_id: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    lobbyName:null,
    lobbyCode:null,
    party_id:null
  }
  return (
    <Router>
      
      <div>
        
        <Switch>
          <Route exact path="/">
            <SignIn value={state} />
          </Route>
          <Route path='/legacy/history/:id'>
            <HistoryMock />
          </Route>
          <Route path="/legacy" 
          component={(props)=><Legacy {...props}/>} 
          />
          <Route path="/hall" 
          component={(props)=> <Hall {...props}/>} 
          />
          <Route path="/lobby"
            component={(props)=> <Lobby {...props}/>} />
          <Route path="/signup" 
          component={(props)=> <SignUp {...props}/>}
          />
          <Route path="/quest"
          component={(props)=><Quest {...props}/>}
          />
          <Route path="/post"
          component={(props)=><Post {...props}/>}
          />
        </Switch>
      </div>
    </Router>
  );
}


  
