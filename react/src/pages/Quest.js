import React from 'react';
import { Grid, Stepper, Step, StepLabel, Hidden, Tooltip } from '@material-ui/core';
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
  let quest_id = null;
  let mentor_name = null;
  let user_name = null;
  if(props.location.state)
  {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    quest_id = props.location.state.quest_id;
    mentor_name= props.location.state.mentor_name;
    user_name = props.location.state.user_name;
    console.log(props);
  } else{
    history.push('/');
  }

  let quest = party_quests.filter(quest => quest.quest.id === quest_id)[0];
  let posts = quest.posts.flat();
  console.log(`Posts is ${JSON.stringify(quest)}`);

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

  const postsDummy = [
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
              <Tooltip title={node.title} arrow placement="bottom">
                <Step key={index} >
                  <StepLabel className={node.isComplete ? 'completed-node' : 'uncompleted-node'} />
                </Step>
              </Tooltip>
            );
          })}
        </Stepper>
      </Grid>
    )
  }
  
  function handleClick(event){
    event.preventDefault();
    history.push({pathname:"/post", state: {global:state, quest_id: quest_id, quests:quests, party_quests: party_quests, mentor_name:mentor_name, user_name:user_name}})
  }

  return (
    <>
    <NavForApp nav_title='QUEST' state={state} quests={quests} party_quests={party_quests}/>
    <Grid container className='full'>
      <Hidden xsDown>
        <Grid className='container-left' item sm={5}>
          <p>Quest Name: {quest.quest.title}</p>
          <p>Quester Name: {user_name}</p>
          <p>Mentor Name: {mentor_name}</p>
        </Grid>
      </Hidden>

      <Grid className='container-right' item xs={12} sm={7} >
      {/* <button onClick={()=>history.push({pathname:"/hall", state: {global:state, quests:quests, party_quests: party_quests, quest_id: quest_id}})}>Go Back</button> */}
        <Grid className='back-button' item xs={12}>
        <button className='btn btn-primary' onClick={()=>history.push({pathname:"/hall", state: {global:state, quests:quests, party_quests: party_quests, quest_id: quest_id}})}>Go Back</button>
        </Grid>
        <NodeBar nodes={nodes} />
        <QuestList posts={posts} handleClick={handleClick}/>
        
      </Grid>
    </Grid>
    </>
  );
}