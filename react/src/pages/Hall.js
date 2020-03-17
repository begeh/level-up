import React, { useContext } from 'react';
import {Grid, Stepper, Step, StepLabel, Hidden} from '@material-ui/core';
import QuestInfoBtn from '../components/CreateQuestBtn'
import NavForApp from '../components/NavForApp';
import './Hall.scss'
import StateContext from "../Context";
import {useHistory} from "react-router-dom"


const HallList = (props) => {
  console.log(`Hall List props ${JSON.stringify(props.quests)}`)
  return (
    <div>
      {
        props.quests.map((quest, index) => (
          <HallListItem title={quest.quest.title} nodes={quest.nodes} index={index} />
        ))
      }
    </div>
  )
}






const HallListItem = ({title, nodes}) => {

  return (
    <div>
      <h3>{title}</h3>
      <p>{nodes.length}</p>
      <Stepper >
        {nodes.map((node, index) => {
  
          return (
            <Step key={index} >
              <StepLabel className={node['is_complete?'] ? 'completed-node' : 'uncompleted-node'} />
            </Step>
          );
        })}
      </Stepper>
    </div>
  )
}

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
    console.log(`This is party_quests ${JSON.stringify(party_quests)}`)
  } else{
    history.push('/');
  }
  
  console.log(`Hall State is ${JSON.stringify(state)}`);

  return (
    <>
    <NavForApp nav_title='HALL' state={state} quests={quests} party_quests={party_quests}/>
    <Grid container >
      <Hidden xsDown>
      <Grid className='container-left' item sm={5} >
        <p>Hello</p>
      </Grid>
      </Hidden>

      <Grid className='container-right' item xs={12} sm={7} >
        <HallList quests={party_quests} />
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