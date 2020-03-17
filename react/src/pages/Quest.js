import React from 'react';
import { Grid, Stepper, Step, StepLabel, Hidden } from '@material-ui/core';
import {useHistory, Link} from "react-router-dom"
import NavForApp from '../components/NavForApp';
import CreatePostBtn from '../components/CreatePostBtn'
import './Quest.scss'
import sword from '../images/sword.png'
import book from '../images/book.png'
import question from '../images/question.png'
import comment from '../images/comment.png'
import QuestList from "../components/QuestList";


export default function Quest(props) {
  let history=useHistory();
  let state = {};
  let quests={};
  let party_quests = {};

  if(props.location.state)
  {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    console.log(props);
  } else{
    history.push('/');
  }

  console.log(props);
  console.log(`Quest State is ${state}`);

  const nodes = [
    {
      title: 'start',
      isComplete: true,
      date: Date(Date.now()).toString()
    },
    {
      title: 'middle',
      isComplete: true,
      date: Date(Date.now()).toString()
    },
    {
      title: 'end',
      isComplete: false,
      date: Date(Date.now()).toString()
    }
  ]

  const posts = [
    {
      title: "post One",
      date: 'March 12, 2020',
      symbol: sword,
      comment_count: 5,
    },
    {
      title: "post 1",
      date: 'March 12, 2020',
      symbol: book,
      comment_count: 5,
    },
    {
      title: "post 1",
      date: 'March 12, 2020',
      symbol: question,
      comment_count: 5,
    }
  ] 

  const NodeBar = ({nodes}) => {
    return (
      <Grid item xs={12}>
        <Stepper >
          {nodes.map((node, index) => {
    
            return (
              <Step key={index} >
                <StepLabel className={node.isComplete ? 'completed-node' : 'uncompleted-node'} />
              </Step>
            );
          })}
        </Stepper>
      </Grid>
    )
  }
  
  function handleClick(event){
    event.preventDefault();
    console.log(`These are the props before post ${JSON.stringify(props.location.data)}`);
    history.push({pathname:"/post", state: {global:state, quests:quests, party_quests: party_quests}})
  }

  return (
    <>
    <NavForApp nav_title='QUEST' state={state} quests={quests} party_quests={party_quests}/>
    <Grid container className='full'>
      <Hidden xsDown>
        <Grid className='container-left' item sm={5}>
          <p>Hello</p>
        </Grid>
      </Hidden>

      <Grid className='container-right' item xs={12} sm={7} >
      <button onClick={()=>history.push({pathname:"/hall", state: {global:state, quests:quests, party_quests: party_quests}})}>Go Back</button>
        <NodeBar nodes={nodes} />
        <QuestList posts={posts} handleClick={handleClick}/>
        
      </Grid>
    </Grid>
    </>
  );
}