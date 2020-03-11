import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Typography from '@material-ui/core/Typography';
import Nav from 'react-bootstrap/Nav';

export default function NavEmpty(){

  return(
    <Typography>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>LEVEL-UP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    <hr />
  </Typography>
  )
  }