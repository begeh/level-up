import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from "react-router-dom";

import NavForApp from "../components/NavForApp";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(50),
    height: theme.spacing(50),
  }
}));

export default function History(props){
  console.log(props);
  const classes = useStyles();
  let history = useHistory();
  let {id} = useParams();
  
  let quest = {};
  let quests = {};
  let nodes = [];
  let party_quests={};
  let state = {};
  let party_info = {};
  
  if(props.location.state)
  {
    state = props.location.state.global;
    quest = props.location.state.quest.quest;
    quests = props.location.state.quests;
    nodes = props.location.state.quest.nodes;
    party_quests = props.location.state.party_quests;
    party_info = props.location.state.party_info;
    console.log(props);
  } else{
    history.push('/');
  }

  return(
    <>
    <NavForApp nav_title="LEGACY" state={state} quests={quests} party_quests={party_quests} party_info={party_info}/>
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={6} md={6}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="https://img.favpng.com/2/14/7/accelerated-mobile-pages-one-call-away-responsive-web-design-non-governmental-organisation-png-favpng-kpXLYqN4PqkrrtxZxiZa8FLCW.jpg"/>
        <Typography component="h1" variant="h4">
          Your Legacy
        </Typography>
        <Typography component="h1" variant="h6">
          Your Name: {state.name}
        </Typography>
        <Typography component="h1" variant="h6">
         TITLE: {state.title}
        </Typography>
      </div>
   </Grid>
   <Grid item xs={false} sm={6} md={6}>
    <div>
    <button onClick={()=>history.push({pathname:"/legacy", state: {global:state, quests:quests, party_quests: party_quests, party_info: party_info}})}>Go Back</button>
    <h1>Quest Title: {quest.title}</h1>
    <h3>Status: {quest.status}</h3>
    {
      nodes.map(node =>(
      <div>
        <h4>Node Title: {node.title}</h4>
        <p>Node Description: {node.description}</p>
        <p>Date Finished: {Date(node.date_finished)}</p>
      </div>
      ))
    }
    </div>
    </Grid>
    </Grid>
  </>
  )
}