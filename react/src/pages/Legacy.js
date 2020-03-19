import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import NavForApp from "../components/NavForApp";
import shield from '../images/shield.png'
import axios from 'axios';
import './Legacy.scss'


export default function Legacy(props) {
  let history=useHistory();
  let state = {};
  let quests={};
  let party_quests = {};
  let party_info = {};

  if(props.location.state)
  {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    party_info = props.location.state.party_info;
    console.log(props);
  } else{
    history.push('/');
  }

  function loadQuest(id){
    return axios.get(`/quest_object/${id}`)
    .then((res)=>
      res.data
    )
    .then((res)=>{
      history.push({pathname:`/legacy/history/${id}`,state:{global: state, quests: quests, quest: res, party_quests: party_quests, party_info:party_info}})
    });
  }

  return (
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
      {
        quests.map((achievement, index) => (
        <Grid className='legacy-list' container onClick={()=>loadQuest(achievement.quest.id)}>

          <Grid item xs={4} sm={4} md={3} lg={2} >
            <img src={shield} alt='win display' />
          </Grid>
          <Grid className='legacy-right' item xs={8} sm={8} md={9} lg={10}>
            <h3>{achievement.quest.title}</h3>
            <p>{(new Date(achievement.quest.created_at)).toLocaleDateString()}-{(new Date(achievement.quest.updated_at)).toLocaleDateString()}</p>
            <p>{achievement.quest.status}</p>
          </Grid>
        </Grid>
      ))}
    </Grid>
   </Grid>
   </>
  );
}
