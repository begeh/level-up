import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import PartyBtn from './PartyBtn';
import QuestInfoBtn from './QuestInfoBtn';
import { useHistory } from "react-router-dom";
import './NavForApp.scss'

export default function NavForApp(props){
  let history = useHistory();
  const state = props.state
  return(
    <Navbar expand="lg">
      <Navbar.Brand onClick={()=>history.push({pathname: "/hall", state: state})}>LEVEL-UP</Navbar.Brand>
      {props.nav_title === 'HALL' ? <PartyBtn /> : <></>}
      {props.nav_title === 'QUEST' ? <QuestInfoBtn /> : <></>}
      <Navbar.Brand >{props.nav_title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={()=>history.push({pathname:"/legacy",state:state})}>Legacy</Nav.Link>
            <Nav.Link onClick={()=>history.push({pathname: "/hall", state: state})}>Hall</Nav.Link>
            <Nav.Link onClick={()=>history.push("/")}
            >Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
  }