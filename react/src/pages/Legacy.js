import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import NavForApp from "../components/NavForApp";

import axios from 'axios';

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

export default function Legacy(props) {
  const classes = useStyles();
  let history=useHistory();
  let state = {};
  let quests={};
  let party_quests = {};
  let party_info = {};

  if(props.location.state)
  {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    party_info = props.location.state.party_info;
    console.log(props);
  } else{
    history.push('/');
  }

  function loadQuest(id){
    return axios.get(`/quest_object/${id}`)
    .then((res)=>
      res.data
    )
    .then((res)=>{
      history.push({pathname:`/legacy/history/${id}`,state:{global: state, quests: quests, quest: res, party_quests: party_quests, party_info:party_info}})
    });
  }

  return (
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
      {
      quests.map((achievement, index) => (
      <button onClick={()=>loadQuest(achievement.quest.id)}>
        <p>{achievement.quest.title}</p>
        <p>{(new Date(achievement.quest.created_at)).toLocaleDateString()}-{(new Date(achievement.quest.updated_at)).toLocaleDateString()}</p>
        <p>{achievement.quest.status}</p>
      </button>
    ))}
    </Grid>
   </Grid>
   </>
  );
}
