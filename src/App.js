import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import Typography from '@material-ui/core/Typography';
import SignIn from './SignIn';
import SignUp from './SignUp';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

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
          {/* <Route path="/lobby">
            <Lobby />
          </Route> */}
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </body>
    </Router>
  );
}

function Legacy() {
  return (
    <>
    <NavForApp />
    <div>
      <h2>Legacy</h2>
    </div>
    </>
  );
}

function Lobby(){
  return(
    <>
    <NavForApp />
    <div>
      <h2>Lobby</h2>
    </div>
    </>
  )
}

function Hall() {
  axios.get('http://localhost:8001/api/appointments')
  .then(function (response) {
    console.log(response.data);
  })
  return (
    <>
    <NavForApp />
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </>
  );
}

function NavForApp(){

  return(
    <Typography>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/hall">LEVEL-UP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/legacy">Legacy</Nav.Link>
            <Nav.Link href="/hall">Hall</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    <hr />
  </Typography>
  )
  }


  
