import React from 'react';
import { Grid, Stepper, Step, StepLabel } from '@material-ui/core';
import NavForApp from '../components/NavForApp';
import { useHistory } from "react-router-dom";

export default function Post(props) {
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

  const PostView = ({post}) => {
    return (
      <div>
        <img src={post.symbol} alt={post.title} />
        <h1>{post.title}</h1>
        <h2>{post.date}</h2>
        <p>{post.description}</p>
        <img src={post.attachment} alt={post.title} />
        <form>
          <input placeholder="add comment" />
          <button>Submit</button>
        </form>
        
      </div>
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
      <div>
        <p>{username}</p>
        <img src={avatar} alt='User Avatar' />
        <p>{date}</p>
        <p>{text}</p>
      </div>
    )
  }



  return (
    <>
    <NavForApp nav_title='POST' state={state}/>
    <Grid container >
      <Grid className='container-left' item sm={5}>
        <p>Hello</p>
      </Grid>

      <Grid className='container-right' item xs={12} sm={7} >
        <NodeBar nodes={nodes} />
        <button onClick={()=>history.push({pathname:"/quest", state: {global:state, quests:quests, party_quests: party_quests}})}>Go Back</button>
        <PostView post={post} />
        <CommentList post={post} />
      </Grid>
    </Grid>
    </>
  );
}