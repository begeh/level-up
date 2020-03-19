import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import {useHistory, Link} from "react-router-dom"
import NavForApp from '../components/NavForApp';
import CreatePostBtn from '../components/CreatePostBtn'
import QuestInfoBtn from '../components/QuestInfoBtn'
import './Quest.scss'
import sword from '../images/sword.png'
import book from '../images/book.png'
import question from '../images/question.png'
import comment from '../images/comment.png'
import QuestList from "../components/QuestList";
import NodeBar from "../components/NodeBar";
import scroll from '../images/scroll.png'
import axios from 'axios';
import QuestFinish from '../components/QuestFinish'

export default function Quest(props) {
  let history=useHistory();
  let state = {};
  let quests={};
  let party_quests = {};
  let quest_id = null;
  let mentor_name = null;
  let user_name = null;
  let party_info = {}
  let node_posts = null;
  let quest_completed = false;
  if(props.location.state)
  {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    quest_id = props.location.state.quest_id;
    mentor_name= props.location.state.mentor_name;
    user_name = props.location.state.user_name;
    party_info = props.location.state.party_info;
    node_posts = props.location.state.node_posts;
    quest_completed = props.location.state.quest_completed;
    console.log(props);
  } else{
    history.push('/');
  }

  console.log(`Quest is completed ${quest_completed}`)
  let quest = party_quests.filter(quest => quest.quest.id === quest_id)[0];

  let posts = null;
  if(!node_posts){
    posts = quest.posts.flat();
  } else{
    posts = node_posts;
  }

  console.log(`This is posts ${JSON.stringify(posts)}`);

  let nodes = quest.nodes;
  let comments = quest.comments.flat();
  
  //renders quest page with only posts associated with the node that is click on nodebar in quest page
  function handleNode(id){
    if(node_posts){
      posts = quest.posts.flat();
    }
    node_posts = posts.filter(post=> post.node_id === id);

    history.push({pathname:`/quest/${quest_id}`, state: {global:state, quest_id:quest_id, quests:quests, party_quests: party_quests, mentor_name:mentor_name, user_name:user_name, party_info:party_info, node_posts: node_posts}})
  }

  //redirects to post page when a post is clicked on quest page
  async function handleClick(id, post){

    let comments = await axios.get(`/post/${id}/comments`).then((response)=> response.data);
    console.log(`Comments are ${JSON.stringify(comments)}`);

    history.push({pathname:`/quest/${quest_id}/post/${id}`, state: {global:state, quest_id: quest_id, quests:quests, quest: quest, party_quests: party_quests, mentor_name:mentor_name, user_name:user_name, party_info: party_info, post:post, comments:comments}})
  }


  return (
    <>
    { quest_completed ? <QuestFinish /> : null }
    <NavForApp nav_title='QUEST' state={state} quests={quests} party_quests={party_quests} party_info={party_info} quest={quest} mentor_name={mentor_name} user_name={user_name}/>
    <Grid container className='full'>
      <Hidden xsDown>
        <Grid className='container-left quest-info' item sm={5}>
          <img src={scroll} alt='scroll' />
          <h3>{quest.quest.title}</h3>
          <p>Mentor: {mentor_name}</p>
          <p>Apprentice: {user_name}</p>
          <p>Finish Date: {(new Date(quest.quest.date_finished)).toLocaleDateString()}</p>
          <div className='quest-button'>
          <QuestInfoBtn state={state} quest={quest} mentor_name={mentor_name} user_name={user_name} party_info={party_info} quests={quests} party_quests={party_quests} quest_id={quest_id} quest_completed={quest_completed}/>
          </div>
        </Grid>
      </Hidden>

      <Grid className='container-right' item xs={12} sm={7} >
        <Grid className='back-button' item xs={12}>
        <button className='btn btn-primary' onClick={()=>history.push({pathname:"/hall", state: {global:state, quests:quests, party_quests: party_quests, quest_id: quest_id, party_info:party_info}})}>Go Back</button>
        </Grid>
        <NodeBar nodes={nodes} handleNode={handleNode}/>
        <QuestList posts={posts} comments={comments} handleClick={handleClick}/>
        
      </Grid>
    </Grid>
    </>
  );
}