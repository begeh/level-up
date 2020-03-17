import React, { useContext } from 'react';
import {Grid, Stepper, Step, StepLabel, Hidden, Link} from '@material-ui/core';
import QuestInfoBtn from '../components/CreateQuestBtn'
import NavForApp from '../components/NavForApp';
import './Hall.scss'
import StateContext from "../Context";
import {useHistory} from "react-router-dom"
import HallList from "../components/HallList"

export default function Hall(props) {
  let history=useHistory();
  let state = {};
  let quests = {};
  let party_quests = {};
  if(props.location.state)
  {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    console.log(`This is party_quests ${party_quests}`)
  } else{
    history.push('/');
  }
  
  console.log(`Hall State is ${JSON.stringify(state)}`);
  function handleClick(){
    history.push({pathname:`/quest`,state:{global: state, quests: quests, party_quests:party_quests}})
  }

  return (
    <>
    <NavForApp nav_title='HALL' state={state} quests={quests} party_quests={party_quests}/>
    <Grid container className='full' >
      <Hidden xsDown>
      <Grid className='container-left' item sm={5} >
        <p>Hello</p>
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





const questsDummy = [
  {
    title: 'quest1',
    nodes: [
      {
        title: 'start',
        isComplete: true
      },
      {
        title: 'middle',
        isComplete: true
      },
      {
        title: 'end',
        isComplete: false
      },
    ]
  },
  {
    title: 'quest1',
    nodes: [
      {
        title: 'start',
        isComplete: true
      },
      {
        title: 'middle',
        isComplete: true
      },
      {
        title: 'end',
        isComplete: false
      },
      {
        title: 'end',
        isComplete: false
      },
      {
        title: 'end',
        isComplete: false
      }
    ]
  },
  {
    title: 'quest1',
    nodes: [
      {
        title: 'start',
        isComplete: true
      },
      {
        title: 'middle',
        isComplete: true
      },
      {
        title: 'end',
        isComplete: false
      },
    ]
  }
]