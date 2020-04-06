import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import PartyBtn from './PartyBtn';
import QuestInfoBtn from './QuestInfoBtn';
import { useHistory } from "react-router-dom";
import { Hidden } from '@material-ui/core';
import './NavForApp.scss'
import logo from "../images/nav-logo.png";

export default function NavForApp(props){

  let history=useHistory();
  let state = {};
  let quests = {};
  let party_quests = {};
  let party_info ={}
  let quest = {};
  let mentor_name = null;
  let user_name = null;
  let quest_id = null;
  let quest_completed = null;
  if(props.state)
  {
    state = props.state;
    quests = props.quests;
    party_quests = props.party_quests;
    party_info = props.party_info;
    mentor_name = props.mentor_name;
    user_name = props.user_name;
    quest = props.quest;
    quest_id = props.quest_id;
    quest_completed = props.quest_completed;
    // console.log(`This is party_quests ${JSON.stringify(party_quests)}`)
  } else{
    history.push('/');
  }

  function loadPage(path){
    history.push({pathname:`/${path}`,state:{global: state, quests: quests, party_quests:party_quests, party_info:party_info}});
  }

  return(
    <Navbar expand="lg">
      <Hidden smDown>
        <Navbar.Brand onClick={()=>loadPage('hall')}>
        <img src={logo} alt='Level Up Logo' width="30" height="30"  />
        </Navbar.Brand>
      </Hidden>
      {props.nav_title === 'HALL' ? <PartyBtn party_info={party_info}/> : <></>}
      {props.nav_title === 'QUEST' || props.nav_title === 'POST' ? <Hidden smUp ><QuestInfoBtn state={state} quest={quest} mentor_name={mentor_name} user_name={user_name} party_info={party_info} quests={quests} party_quests={party_quests} quest_id={quest_id} quest_completed={quest_completed}/></Hidden> : <></>}
      <Navbar.Brand >{props.nav_title }</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className='username'>Logged In as: {state.name}</Nav.Link>
            <Nav.Link onClick={()=>loadPage('legacy')}>Legacy</Nav.Link>
            <Nav.Link onClick={()=>loadPage('hall')}>Hall</Nav.Link>
            <Nav.Link onClick={()=>history.push("/")}
            >Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
  }