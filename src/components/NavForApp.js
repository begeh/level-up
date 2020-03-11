import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Typography from '@material-ui/core/Typography';
import Nav from 'react-bootstrap/Nav';

export default function NavForApp(){

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