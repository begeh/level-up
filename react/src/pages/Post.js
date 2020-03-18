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
  if(props.location.state)
  {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    quest_id = props.location.state.quest_id;
    mentor_name = props.location.state.mentor_name;
    user_name = props.location.state.user_name;
    console.log(`This is party_quests ${JSON.stringify(party_quests)}`)
  } else{
    history.push('/');
  }

  console.log(props);
  console.log(`Post state is ${state}`);

  const nodes = [
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
    }
  ]

  const post = {
    title: 'quest',
    date: Date(Date.now()).toString(),
    description: "This is my progress",
    symbol: "https://cdn4.iconfinder.com/data/icons/must-have-outline/100/objects-29-512.png", 
    attachment: "https://cdn.theatlantic.com/thumbor/ZAWCcyd-MwxmwvkTGp9VtFjb-h0=/900x673/media/img/photo/2018/11/photos-companionable-capybaras/c02_142762210/original.jpg",
    comments: [
      {
        username: "Bash",
        avatar: "https://ih0.redbubble.net/image.539207575.3366/flat,128x128,075,t-pad,128x128,f8f8f8.u2.jpg",
        date: Date(Date.now()).toString(),
        text: "Capybaras are awesome"
      },
      {
        username: "Bash",
        avatar: "https://ih0.redbubble.net/image.539207575.3366/flat,128x128,075,t-pad,128x128,f8f8f8.u2.jpg",
        date: Date(Date.now()).toString(),
        text: "Capybaras are awesome"
      },
      {
        username: "Bash",
        avatar: "https://ih0.redbubble.net/image.539207575.3366/flat,128x128,075,t-pad,128x128,f8f8f8.u2.jpg",
        date: Date(Date.now()).toString(),
        text: "Capybaras are awesome"
      }
    ]
  }

  const PostView = ({post}) => {
    return (
      <Grid className='post-view' container>
        <Grid className='back-button' item xs={12}>
          <button className='btn btn-primary' onClick={()=>history.push({pathname:`/quest/${quest_id}`, state: {global:state, quests:quests, party_quests: party_quests}})}>Go Back</button>
        </Grid>
        <Grid item xs={4} sm={4} md={3} lg={2} >
          <img src={post.symbol} alt={post.title} width="120" height="120"/>
        </Grid>
        <Grid item className='post-detail' xs={8} sm={8} md={9} lg={10}>
          <h3>{post.title}</h3>
          <p>{post.date}</p>
        </Grid>
        <Grid item xs={12}>
          <img src={post.attachment} alt={post.title} />
          <ReactPlayer className='player' url='https://www.youtube.com/watch?v=6FAaOwNnHTA' />
          <p>{post.description}</p>
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
      post.comments.map((comment, index) => (
        <CommentListItem key={index} username={comment.username} avatar={comment.avatar} date={comment.date} text={comment.text} />
      ))
    )
  }

  const CommentListItem = ({ username, avatar, date, text }) => {
    return (
      <Grid container className='comment-post' >
        <Grid item xs={4} sm={4} md={3} lg={2} >
          <Avatar src={avatar} alt='User Avatar' />
        </Grid>
        <Grid item xs={8} sm={8} md={9} lg={10} className='comment-right'>
          <p>{username}</p>
          <p>{date}</p>
          <p className='comment-description'>{text}</p>
        </Grid>
      </Grid>
    )
  }



  return (
    <>
    <NavForApp nav_title='POST' state={state} quests={quests} party_quests={party_quests}/>
    <Grid container >
      <Grid className='container-left' item sm={5}>
        <p>Hello</p>
      </Grid>

      <Grid className='container-right' item xs={12} sm={7} >
        {/* <NodeBar nodes={nodes} /> */}
        <button onClick={()=>history.push({pathname:`/quest/${quest_id}`, state: {global:state, quest_id:quest_id, quests:quests, party_quests: party_quests, mentor_name:mentor_name, user_name:user_name}})}>Go Back</button>
        <PostView post={post} />
        <CommentList post={post} />
      </Grid>
    </Grid>
    </>
  );
}