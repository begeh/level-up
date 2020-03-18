import React from 'react';
import {Grid, Stepper, Step, StepLabel, Hidden, Link} from '@material-ui/core';
import QuestInfoBtn from '../components/CreateQuestBtn'
import NavForApp from '../components/NavForApp';
import './Hall.scss'
import {useHistory} from "react-router-dom"
import HallList from "../components/HallList"

import axios from 'axios';

export default function Hall(props) {
  let history=useHistory();
  let state = {};
  let quests = {};
  let party_quests = {};
  let party_info = {}
  if(props.location.state)
  {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    party_info = props.location.state.party_info;
    console.log(`This is party_quests ${party_quests}`)
  } else{
    history.push('/');
  }
  
  console.log(`Hall State is ${JSON.stringify(state)}`);

  async function handleClick(id, mentor_id, user_id){
    let users = await axios.get('users')
                .then((response)=> {
                  let users = {};
                  let mentor = response.data.filter(user => user.id === mentor_id);
                  let user = response.data.filter(user => user.id === user_id);
                  users.user_name = user[0].name;
                  users.mentor_name = mentor[0].name;
                  return users;  
                });

    history.push({pathname:`/quest/${id}`,state:{global: state, quests: quests, party_quests:party_quests, quest_id: id, mentor_name:users.mentor_name, user_name:users.user_name, party_info: party_info}})
   

  }

  return (
    <>
    <NavForApp nav_title='HALL' state={state} quests={quests} party_quests={party_quests} party_info={party_info}/>
    <Grid container className='full' >
      <Hidden xsDown>
      <Grid className='container-left' item sm={5} >
        <p>Party Name: {party_info.name}</p>
        <p>Party Code: {party_info.id}</p>
        <div>
          <p>Party Members</p> 
          <ul>
            {
              party_info.members.map(member =>{
                return( 
                <li>Name: {member.name} <br/> Title: {member.title}</li>
                )
              })
            }
          </ul>
        </div>

      </Grid>
      </Hidden>

      <Grid className='container-right' item xs={12} sm={7} >
        <HallList quests={party_quests} handleClick={handleClick} />
        <QuestInfoBtn />
      </Grid>
    </Grid>


    </>
  );
}