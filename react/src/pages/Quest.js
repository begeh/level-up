import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import NavForApp from '../components/NavForApp';
import CreatePostBtn from '../components/CreatePostBtn';
import QuestInfoBtn from '../components/QuestInfoBtn';
import './Quest.scss';
import QuestList from "../components/QuestList";
import NodeBar from "../components/NodeBar";
import scroll from '../images/scroll.png';
import axios from 'axios';
import QuestFinish from '../components/QuestFinish';
import QuestFail from '../components/QuestFail';

export default function Quest(props) {
  let history = useHistory();
  let state = {};
  let quests = {};
  let party_quests = {};
  let quest_id = null;
  let mentor_name = null;
  let user_name = null;
  let party_info = {}
  let node_posts = null;
  let quest_completed = false;
  let node_id = null;
  let selected_node = null;

  if (props.location.state) {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    quest_id = props.location.state.quest_id;
    mentor_name = props.location.state.mentor_name;
    user_name = props.location.state.user_name;
    party_info = props.location.state.party_info;
    node_posts = props.location.state.node_posts;
    quest_completed = props.location.state.quest_completed;
    node_id = props.location.state.node_id
    selected_node = props.location.state.selected_node;
    console.log(props);
  } else {
    history.push('/');
  }
  console.log(`Quest is completed ${quest_completed}`)
  let quest = party_quests.filter(quest => quest.quest.id === quest_id)[0];

  let nodes = quest.nodes;
  let comments = quest.comments.flat();
  console.log("This is nodes: ", nodes)

  //sets posts variable to all posts of the node selected on hall page, or for the node clicked on the nodebar of quest page (node_posts) when clicked
  let posts = null;

  if (!node_posts) {
    if (!node_id) {
      const current_node = nodes.find(node => node["is_complete?"] === false);
      if (current_node) {
        node_id = current_node.id;
        selected_node = nodes.findIndex(node => node["is_complete?"] === false);
      } else {
        node_id = nodes[nodes.length - 1].id
        selected_node = nodes.length - 1;
      }
    }

    posts = quest.posts.flat().filter(post => post.node_id === node_id);

  } else {
    posts = node_posts;
  }

  console.log(`This is posts ${JSON.stringify(posts)}`);

  //renders quest page with only posts associated with the node that is click on nodebar in quest page
  function handleNode(id, index) {
    // Only allows the user to pick a node when the previous nodes are completed, or if it's the first node
    if (index === 0 || nodes[index - 1]["is_complete?"]) {

      selected_node = index;
      posts = quest.posts.flat();

      node_posts = posts.filter(post => post.node_id === id);

      history.push({ pathname: `/quest/${quest_id}`, state: { global: state, quest_id: quest_id, quests: quests, party_quests: party_quests, mentor_name: mentor_name, user_name: user_name, party_info: party_info, node_posts: node_posts, node_id: id, selected_node: selected_node } })
    } else if (quest.quest.status === "IN PROGRESS"){
      alert("We know it's tempting to skip ahead, but you'll need finish the earlier nodes before moving on.")
    } else{
      alert("No more progress");
    }
  }

  //redirects to post page when a post is clicked on quest page
  async function handleClick(id, post) {

    let comments = await axios.get(`/post/${id}/comments`).then((response) => response.data);
    console.log(`Comments are ${JSON.stringify(comments)}`);

    history.push({ pathname: `/quest/${quest_id}/post/${id}`, state: { global: state, quest_id: quest_id, quests: quests, quest: quest, party_quests: party_quests, mentor_name: mentor_name, user_name: user_name, party_info: party_info, post: post, comments: comments, post_id: id, selected_node: selected_node, node_id: node_id } })
  }

  console.log(`This is node_id: ${node_id}`)

  return (
    <>
      {quest_completed === "success" ? <QuestFinish state={state} quests={quests} party_quests={party_quests} party_info={party_info} quest={quest} /> : null}
      {quest_completed === "failed" ? <QuestFail state={state} quests={quests} party_quests={party_quests} party_info={party_info} quest={quest} /> : null}
      <NavForApp nav_title='QUEST' state={state} quests={quests} party_quests={party_quests} party_info={party_info} quest={quest} mentor_name={mentor_name} user_name={user_name} quest_id={quest_id} quest_completed={quest_completed} />
      <Grid container className='full'>
        <Hidden xsDown>
          <Grid className='container-left quest-info' item sm={5}>
            <img src={scroll} alt='scroll' />
            <h3>{quest.quest.title}</h3>
            <p>Quest Status: {quest.quest.status}</p>
            <p>Mentor: {mentor_name}</p>
            <p>Apprentice: {user_name}</p>
            <p>Finish Date: {quest.quest.date_finished ? (new Date(quest.quest.date_finished)).toLocaleDateString() : "In Progress"}</p>
            <div className='quest-button'>
              <QuestInfoBtn state={state} quest={quest} mentor_name={mentor_name} user_name={user_name} party_info={party_info} quests={quests} party_quests={party_quests} quest_id={quest_id} quest_completed={quest_completed} selected_node={selected_node} />
            </div>
          </Grid>
        </Hidden>
        <Grid className='container-right' item xs={12} sm={7} >
          <Grid className='back-button' item xs={12}>
            <button className='btn btn-primary' onClick={() => history.push({ pathname: "/hall", state: { global: state, quests: quests, party_quests: party_quests, party_info: party_info } })}>Go Back</button>
          </Grid>
          <NodeBar nodes={nodes.sort((a, b) => a.id - b.id)} handleNode={handleNode} selected_node={selected_node} />
          <QuestList posts={posts.sort((a, b) => b.id - a.id)} comments={comments} handleClick={handleClick} />
          {quest.quest.status === 'IN PROGRESS' && state.id === quest.quest.user_id ?
            <CreatePostBtn state={state} quest_id={quest_id} quests={quests} party_quests={party_quests} mentor_name={mentor_name} user_name={user_name} party_info={party_info} node_id={node_id} selected_node={selected_node} /> : null
          }
        </Grid>
      </Grid>
    </>
  );
}