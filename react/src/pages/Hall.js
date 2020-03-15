import React, { useState, useContext } from 'react';
import {Grid, Stepper, Step, StepLabel} from '@material-ui/core';
import QuestInfoBtn from '../components/CreateQuestBtn'
import NavForApp from '../components/NavForApp';
import './Hall.css'
import StateContext from "../Context";
import {useHistory} from "react-router-dom"


const HallList = ({quests}) => {
  return (
    <div>
      {
        quests.map((quest, index) => (
          <HallListItem title={quest.title} nodes={quest.nodes} index={index} />
        ))
      }
    </div>
  )
}






const HallListItem = ({title, nodes}) => {

  return (
    <div>
      <h1>{title}</h1>
      <p>{nodes.length}</p>
      <Stepper >
        {nodes.map((node, index) => {
  
          return (
            <Step key={index} >
              <StepLabel className={node.isComplete ? 'completed-node' : 'uncompleted-node'} />
            </Step>
          );
        })}
      </Stepper>
    </div>
  )
}

export default function Hall(props) {
  let history=useHistory();
  let state = useContext(StateContext);
  if(!props.location.state){
    history.push('/');
  }
  if(props.location.state)
  {
    state = props.location.state;
    console.log(props);
  }

  console.log(props)
  console.log(`Hall State is ${state}`);

  return (
    <>
    <NavForApp nav_title='HALL' state={state}/>
    <Grid container >
      <Grid item xs={false} sm={6} md={6} >
        <p>Hello</p>
      </Grid>

      <Grid item xs={12} sm={6} md={6} >
        <HallList quests={quests} />
        <QuestInfoBtn />
      </Grid>
    </Grid>


    </>
  );
}





const quests = [
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