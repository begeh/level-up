import React, {useState, Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";

import axios from 'axios';

import NavEmpty from '../components/NavEmpty';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Lobby(props) {
  const state = props.location.state;
  let quests ={};
  console.log(`New State: ${state}`)
  console.log(`Received email: ${props.location.state.email} and password: ${props.location.state.password}`);

  const classes = useStyles();
  let history = useHistory();
  const [lobbyName, setLobbyName] = useState(null);
  const [lobbyCode, setLobbyCode] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(`lobbyname is ${lobbyName}`);
    console.log(`lobbycode is ${lobbyCode}`);
    if(lobbyName && !lobbyCode){
      state.lobbyName = lobbyName
    } else if(lobbyCode && !lobbyName){
      state.lobbyCode = lobbyCode
    } 

    let quests = await axios.get("/quests")
      .then((res)=>{
        const yourQuests = res.data.filter(quest => quest.user_id === state.id);
        console.log(`Your quests ${JSON.stringify(yourQuests)}`)
        return yourQuests;
      })

    let full_quests = [];
    let promises = [];
    quests.forEach((quest)=>{
      promises.push(axios.get(`quest_object/${quest.id}`)
      .then((response)=>{
        full_quests.push(response.data);
      })
      )
      }
    );

    await Promise.all(promises);

    let party_quests = await axios.get("/quests")
    .then((res)=>{
      const partyQuests = res.data.filter(quest => quest.party_id === state.party_id);
      return partyQuests;
    })

    let party_full_quests = [];
    let party_promises = [];
    party_quests.forEach((quest)=>{
      party_promises.push(axios.get(`quest_object/${quest.id}`)
      .then((response)=>{
        party_full_quests.push(response.data);
      })
      )
      }
    );

    await Promise.all(party_promises);
    
    console.log(`Party full quests ${JSON.stringify(party_full_quests)}`);

    
    history.push({pathname:"/hall",state:{global: state, quests: full_quests, party_quests: party_full_quests}});
    

  }
  return (
    <>
    <NavEmpty />
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Join a Lobby
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="join-lobby"
            label="Lobby Code"
            name="lobbyCode"
            value={lobbyCode}
            onChange={(e)=>setLobbyCode(e.target.value)}
            autoComplete="123"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}     
          >
            Join Lobby
          </Button>
          </form>
          <form className={classes.form} onSubmit={handleSubmit}  noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lobbyName"
            value={lobbyName}
            onChange={(e)=>setLobbyName(e.target.value)}
            label="Lobby Name"
            type="create-lobby"
            id="create-lobby"
            autoComplete="new-lobby"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create New Lobby
          </Button>
        </form>
      </div>
    </Container>
    </>
  );
}