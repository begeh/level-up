import React, { useState, useRef } from 'react';
import { Grid, TextField, Avatar, Hidden } from '@material-ui/core';
import NavForApp from '../components/NavForApp';
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player'
import './Post.scss'
import QuestInfoBtn from "../components/QuestInfoBtn";
import CommentList from "../components/CommentList";

import scroll from '../images/scroll.png'
import sword from '../images/sword.png'
import book from '../images/book.png'
import question from '../images/question.png'

import axios from "axios"

export default function Post(props) {
  let history = useHistory();
  let state = {};
  let quests = {};
  let party_quests = {};
  let quest_id = null;
  let mentor_name = null;
  let user_name = null;
  let party_info = {}
  let post = {};
  let comments = {};
  let quest = null;
  let post_id = null;

  //useRef used instead of useState to prevent onChange rerenders from text field input for comment line
  const commentRef = useRef(null);

  if (props.location.state) {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    quest_id = props.location.state.quest_id;
    mentor_name = props.location.state.mentor_name;
    user_name = props.location.state.user_name;
    party_info = props.location.state.party_info;
    post = props.location.state.post;
    comments = props.location.state.comments;
    quest = props.location.state.quest;
    post_id = props.location.state.post_id;
  } else {
    history.push('/');
  }

  const symbol = post.symbol_ref;
  let post_symbol = null;

  //sets symbol for post to an image based on symbol_ref value of post
  if (symbol === "sword") {
    post_symbol = sword;
  } else if (symbol === "question") {
    post_symbol = question;
  } else {
    post_symbol = book;
  }

  // const [comment, setComment] = useState("")
  let comment = "";
  console.log(comment)
  console.log(post)

  //submits a comment to the database and rerenders page through useHistory
  async function handleCommentSubmit(event) {
    event.preventDefault();
    console.log(`Comment Ref is ${  commentRef.current.value}`)
    comment = commentRef.current.value;
    commentRef.current.value = null;

    console.log(`Comment is ${comment}`);
    
    let comment_package = {
      text: comment,
      username: user_name,
      post_id: post.id
    }
    console.log(comment_package)

    let sent_comment = await axios.post(`/posts/${post.id}/comments`, {
      text: comment,
      username: user_name,
      post_id: post.id
    }
    ).then((res) => res.data)

    comments = await axios.get(`/post/${post_id}/comments`).then((response) => response.data);
    console.log(`Comments are ${JSON.stringify(comments)}`);

    quests = await axios.post(`/user_quests`, { user_id: state.id })
    .then((res) => {
      return res.data;
    })
 
    console.log(JSON.stringify(quests))
  
    let full_quests = [];
    let promises = [];
    quests.forEach((quest) => {
      promises.push(axios.get(`/quest_object/${quest.id}`)
        .then((response) => {
          full_quests.push(response.data);
        })
      )
    }
    );
  
    await Promise.all(promises);
  
    console.log(`Full quests ${JSON.stringify(full_quests)}`);
  
    party_quests = await axios.post("/party_quests", { party_id: state.party_id })
      .then((res) => {
        return res.data
      })
  
    console.log(`This is party quests ${JSON.stringify(full_quests)}`)
  
    let party_full_quests = [];
    let party_promises = [];
    party_quests.forEach((quest) => {
      party_promises.push(axios.get(`/quest_object/${quest.id}`)
        .then((response) => {
          party_full_quests.push(response.data);
        })
      )
    }
    );
  
    await Promise.all(party_promises);
    
    history.push({ pathname: `/quest/${quest_id}/post/${post_id}`, state: { global: state, quest_id: quest_id, quests: full_quests.sort((a,b)=>b.quest.id - a.quest.id), quest: quest, party_quests: party_full_quests.sort((a,b)=>b.quest.id - a.quest.id), mentor_name: mentor_name, user_name: user_name, party_info: party_info, post: post, comments: comments, post_id: post_id } })

  }

  const PostView = ({ post }) => {
    return (
      <Grid className='post-view' container>
        <Grid className='back-button' item xs={12}>
          <button className='btn btn-primary' onClick={() => history.push({ pathname: `/quest/${quest_id}`, state: { global: state, quest_id: quest_id, quests: quests, party_quests: party_quests, mentor_name: mentor_name, user_name: user_name, party_info: party_info } })}>Go Back</button>
        </Grid>
        <Grid item xs={4} sm={4} md={3} lg={2} >
          <img src={post_symbol} alt={post.title} width="120" height="120" />
        </Grid>
        <Grid item className='post-detail' xs={8} sm={8} md={9} lg={10}>
          <h3>Post Title: {post.title}</h3>
          <p>Post Date: {(new Date(post.created_at)).toLocaleDateString()}</p>
        </Grid>
        <Grid item xs={12}>
          { post.image_url ?
            <img src={post.image_url} alt={post.title} /> : null
          }
          { post.video_url ?
            <ReactPlayer className='player' url={post.video_url} /> : null
          }
          
          <p>Content: {post.content}</p>

        </Grid>
      </Grid>
    )
  }
  
  return (
    <>
      <NavForApp nav_title='POST' state={state} quests={quests} party_quests={party_quests} party_info={party_info} />
      <Grid container >
        <Hidden xsDown>
          <Grid className='container-left quest-info' item sm={5}>
            <img src={scroll} alt='scroll' />
            <h3>{quest.quest.title}</h3>
            <p>Quest Status: {quest.quest.status}</p>
            <p>Mentor: {mentor_name}</p>
            <p>Apprentice: {user_name}</p>
            <p>Finish Date: {quest.quest.date_finished ? (new Date(quest.quest.date_finished)).toLocaleDateString() : "In Progress"}</p>
            <div className='quest-button'>
              <QuestInfoBtn quest={quest} mentor_name={mentor_name} user_name={user_name} />
            </div>
          </Grid>
        </Hidden>

        <Grid className='container-right' item xs={12} sm={7} >
          <PostView post={post} />
          <form className='comment-form' noValidate onSubmit={handleCommentSubmit}>
            <TextField
              required
              fullWidth
              className='text-field'
              id="comment"
              label='Type your comment here'
              multiline
              rowsMax="4"
              inputRef={commentRef}
            />
            <button className='btn btn-primary' type="submit">Submit</button>
          </form>
          <CommentList comments={comments} />
        </Grid>
      </Grid>
    </>
  );
}