import React, { useState } from 'react';
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

  const [comment, setComment] = useState("")
  console.log(comment)
  console.log(post)

  //submits a comment to the database and rerenders page through useHistory
  async function handleCommentSubmit(event) {
    event.preventDefault();
    console.log("function called")
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

    //Needs the proper redirection code

  }

  // const post = {
  //   title: 'quest',
  //   date: Date(Date.now()).toString(),
  //   description: "This is my progress",
  //   symbol: "https://cdn4.iconfinder.com/data/icons/must-have-outline/100/objects-29-512.png", 
  //   attachment: "https://cdn.theatlantic.com/thumbor/ZAWCcyd-MwxmwvkTGp9VtFjb-h0=/900x673/media/img/photo/2018/11/photos-companionable-capybaras/c02_142762210/original.jpg",
  //   comments: [
  //     {
  //       username: "Bash",
  //       avatar: "https://ih0.redbubble.net/image.539207575.3366/flat,128x128,075,t-pad,128x128,f8f8f8.u2.jpg",
  //       date: Date(Date.now()).toString(),
  //       text: "Capybaras are awesome"
  //     },
  //     {
  //       username: "Bash",
  //       avatar: "https://ih0.redbubble.net/image.539207575.3366/flat,128x128,075,t-pad,128x128,f8f8f8.u2.jpg",
  //       date: Date(Date.now()).toString(),
  //       text: "Capybaras are awesome"
  //     },
  //     {
  //       username: "Bash",
  //       avatar: "https://ih0.redbubble.net/image.539207575.3366/flat,128x128,075,t-pad,128x128,f8f8f8.u2.jpg",
  //       date: Date(Date.now()).toString(),
  //       text: "Capybaras are awesome"
  //     }
  //   ]
  // }

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
          <img src="https://cdn.theatlantic.com/thumbor/ZAWCcyd-MwxmwvkTGp9VtFjb-h0=/900x673/media/img/photo/2018/11/photos-companionable-capybaras/c02_142762210/original.jpg" alt={post.title} />
          <ReactPlayer className='player' url='https://www.youtube.com/watch?v=6FAaOwNnHTA' />
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
            <p>Mentor: {mentor_name}</p>
            <p>Apprentice: {user_name}</p>
            <p>Finish Date: {(new Date(quest.quest.date_finished)).toLocaleDateString()}</p>
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
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button className='btn btn-primary' type="submit">Submit</button>
          </form>
          <CommentList comments={comments} />
        </Grid>
      </Grid>
    </>
  );
}