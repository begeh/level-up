import React from 'react';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { useHistory, useParams } from "react-router-dom";
import shield from '../images/shield.png'
import './History.scss';
import NavForApp from "../components/NavForApp";
const classNames = require('classnames');



export default function History(props){
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
  } else{
    history.push('/');
  }

  const statusClass = classNames('status', {
    'status-progress' : quest.status === 'IN PROGRESS',
    'status-success' : quest.status === 'SUCCESS',
    'status-failed' : quest.status === 'FAILED'
  })

  return(
    <>
    <NavForApp nav_title="LEGACY" state={state} quests={quests} party_quests={party_quests} party_info={party_info}/>
    <Grid container component="main" className='full'>
      <Grid item sm={5} className='container-left party-container'>
        <img src={shield} alt='Shield' className='party-logo'/>
        <h3>Your Legacy</h3>
        <div className='party-member'>
          <p>{state.name}</p>
          <p className='party-title'>~ {state.title} ~</p>
        </div>
    </Grid>
      <Grid item sm={7} className='container-right history-right'>
        <button className='btn btn-primary' onClick={()=>history.push({pathname:"/legacy", state: {global:state, quests:quests, party_quests: party_quests, party_info: party_info}})}>Go To Legacy</button>
        <h3>{quest.title}</h3>
        <div className={statusClass}>{quest.status}</div>
        <h5>Story</h5>
        <p>{quest.story ? quest.story : "Yet to be told..."}</p>
        <List className='quest-node-list'>
        {
          nodes.map(node =>(
          <div class='history-node'>
            <ListItem>
              <svg class="bi bi-circle-fill" viewBox="0 0 16 16" fill={node.date_finished ? "#798A0D" : "#88773F"} xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8"/>
              </svg>
              <ListItemText primary={node.title} secondary={`Date Finished: ${node.date_finished ? (new Date(node.date_finished)).toLocaleDateString() : "Incomplete"}`} />
            </ListItem>
            <p className='node-desc'>{node.description}</p>
          </div>
          ))
        }
        </List>
      </Grid>
    </Grid>
  </>
  )
}