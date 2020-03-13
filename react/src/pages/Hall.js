import React from 'react';
import Grid from '@material-ui/core/Grid';
import QuestInfoBtn from '../components/CreateQuestBtn'

import NavForApp from '../components/NavForApp';



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
    </div>
  )
}

export default function Hall() {
  



  return (
    <>
    <NavForApp nav_title='HALL' />
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