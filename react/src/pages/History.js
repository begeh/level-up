import React from 'react';
import { Grid, Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { useHistory, useParams } from "react-router-dom";
import shield from '../images/shield.png'
import './History.scss'


import NavForApp from "../components/NavForApp";


export default function History(props){
  console.log(props);
  let history = useHistory();
  let {id} = useParams();
  
  let quest = {};
  let quests = {};
  let nodes = [];
  let party_quests={};
  let state = {};
  let party_info = {};
  
  if(props.location.state)
  {
    state = props.location.state.global;
    quest = props.location.state.quest.quest;
    quests = props.location.state.quests;
    nodes = props.location.state.quest.nodes;
    party_quests = props.location.state.party_quests;
    party_info = props.location.state.party_info;
    console.log(props);
  } else{
    history.push('/');
  }

  return(
    <>
    <NavForApp nav_title="LEGACY" state={state} quests={quests} party_quests={party_quests} party_info={party_info}/>
    <Grid container component="main" className='full'>
      <Grid item sm={5} className='container-left party-container'>
        <img src={shield}/>
        <h3>Your Legacy</h3>
        <div className='party-member'>
          <p>{state.name}</p>
          <p className='party-title'>~ {state.title} ~</p>
        </div>
    </Grid>
      <Grid item sm={7} className='container-right'>
        <button className='btn btn-primary' onClick={()=>history.push({pathname:"/legacy", state: {global:state, quests:quests, party_quests: party_quests, party_info: party_info}})}>Go Back</button>
        <h3>{quest.title}</h3>
        <p>Status: {quest.status}</p>
        {
          nodes.map(node =>(
          <div class='history-node'>
            <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src="https://www.pinclipart.com/picdir/middle/379-3797946_software-developer-computer-servers-web-others-web-developer.png" alt="Quest Button" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={node.title} secondary={Date(node.date_finished)} />
                </ListItem>
                <p className='node-desc'>{node.description}</p>
          </div>
          ))
        }
        <h6>Story</h6>
        <p>{quest.story}</p>
      </Grid>
    </Grid>
  </>
  )
}