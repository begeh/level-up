import React from 'react';
import { Grid, TextField, Avatar } from '@material-ui/core';
import NavForApp from '../components/NavForApp';
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player'
import './Post.scss'

export default function Post(props) {
  let history=useHistory();
  let state = {};
  let quests = {};
  let party_quests = {};
  let quest_id = null;
  let mentor_name = null;
  let user_name = null;
  let party_info = {}
  let post = {};
  let comments = {};
  if(props.location.state)
  {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    quest_id = props.location.state.quest_id;
    mentor_name = props.location.state.mentor_name;
    user_name = props.location.state.user_name;
    party_info = props.location.state.party_info;
    post = props.location.state.post;
    comments = props.location.state.comments;
  } else{
    history.push('/');
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

  const PostView = ({post}) => {
    return (
      <Grid className='post-view' container>
        <Grid className='back-button' item xs={12}>
          <button className='btn btn-primary' onClick={()=>history.push({pathname:`/quest/${quest_id}`, state: {global:state, quest_id:quest_id, quests:quests, party_quests: party_quests, mentor_name:mentor_name, user_name:user_name, party_info:party_info}})}>Go Back</button>
        </Grid>
        <Grid item xs={4} sm={4} md={3} lg={2} >
          <img src="https://cdn4.iconfinder.com/data/icons/must-have-outline/100/objects-29-512.png" alt={post.title} width="120" height="120"/>
        </Grid>
        <Grid item className='post-detail' xs={8} sm={8} md={9} lg={10}>
          <h3>Post Title: {post.title}</h3>
          <p>Post Date: {(new Date(post.created_at)).toLocaleDateString()}</p>
        </Grid>
        <Grid item xs={12}>
          <img src="https://cdn.theatlantic.com/thumbor/ZAWCcyd-MwxmwvkTGp9VtFjb-h0=/900x673/media/img/photo/2018/11/photos-companionable-capybaras/c02_142762210/original.jpg" alt={post.title} />
          <ReactPlayer className='player' url='https://www.youtube.com/watch?v=6FAaOwNnHTA' />
          <p>Content: {post.content}</p>
          <form className='comment-form'>
            <TextField
            className='text-field'
            id="comment"
            label='Type your comment here'
            multiline
            rowsMax="4"
            />
            <button className='btn btn-primary'>Submit</button>
          </form>
        </Grid>
      </Grid>
    )
  }

  const CommentList = ({post}) => {

    return (
      comments.map((comment, index) => (
        <CommentListItem key={index} username={comment.username} avatar={comment.avatar} created_at={comment.created_at} text={comment.text} />
      ))
    )
  }

  const CommentListItem = ({ username, avatar, created_at, text }) => {
    return (
      <Grid container className='comment-post' >
        <Grid item xs={4} sm={4} md={3} lg={2} >
          <Avatar src="https://ih0.redbubble.net/image.539207575.3366/flat,128x128,075,t-pad,128x128,f8f8f8.u2.jpg" alt='User Avatar' />
        </Grid>
        <Grid item xs={8} sm={8} md={9} lg={10} className='comment-right'>
          <p>UserName: {username}</p>
          <p>Date Posted{(new Date(created_at)).toLocaleDateString()}</p>
          <p className='comment-description'>Comment: {text}</p>
        </Grid>
      </Grid>
    )
  }



  return (
    <>
    <NavForApp nav_title='POST' state={state} quests={quests} party_quests={party_quests} party_info={party_info}/>
    <Grid container >
      <Grid className='container-left' item sm={5}>
        <p>Hello</p>
      </Grid>

      <Grid className='container-right' item xs={12} sm={7} >
        <PostView post={post} />
        <CommentList post={post} />
      </Grid>
    </Grid>
    </>
  );
}