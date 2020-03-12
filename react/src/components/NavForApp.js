import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Typography from '@material-ui/core/Typography';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from "react-router-dom";

export default function NavForApp(props){
  let history = useHistory();
  return(
    <Typography>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={()=>history.push("/hall")}>LEVEL-UP</Navbar.Brand>
      <Navbar.Brand >{props.nav_title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={()=>history.push("/legacy")}>Legacy</Nav.Link>
            <Nav.Link onClick={()=>history.push("/hall")}>Hall</Nav.Link>
            <Nav.Link onClick={()=>history.push("/")}
            >Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    <hr />
  </Typography>
  )
  }