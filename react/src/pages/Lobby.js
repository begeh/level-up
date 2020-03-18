import React, { useState, Fragment } from 'react';
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
  console.log(`New State: ${state}`)
  console.log(`Received email: ${props.location.state.email} and password: ${props.location.state.password}`);

  const classes = useStyles();
  let history = useHistory();
  const [lobbyName, setLobbyName] = useState(null); //Create lobby
  const [lobbyCode, setLobbyCode] = useState(null); //Join Lobby

  // This can be split later on if we get our MVP done but it works fine for now
  async function handleJoinSubmit(event) {
    event.preventDefault();
    console.log(`lobbyname is ${lobbyName}`); //Create lobby
    console.log(`lobbycode is ${lobbyCode}`); //Join Lobby

    // If making Lobby
    if (lobbyName && !lobbyCode) {
      state.lobbyName = lobbyName
      // If joining Lobby
    } else if (lobbyCode && !lobbyName) {
      state.lobbyCode = lobbyCode
    }
    // Returns all the quests that contain the relevant user id
    let quests = await axios.post(`/user_quests`, { user_id: state.id })
      .then((res) => {
        return res.data;
      })

    console.log(JSON.stringify(quests))

    let full_quests = [];
    let promises = [];
    quests.forEach((quest) => {
      promises.push(axios.get(`quest_object/${quest.id}`)
        .then((response) => {
          full_quests.push(response.data);
        })
      )
    }
    );

    await Promise.all(promises);

    console.log(`Full quests ${JSON.stringify(full_quests)}`);

    let party_quests = await axios.post("/party_quests", { party_id: state.party_id })
      .then((res) => {
        return res.data
      })

    let party_full_quests = [];
    let party_promises = [];
    party_quests.forEach((quest) => {
      party_promises.push(axios.get(`quest_object/${quest.id}`)
        .then((response) => {
          party_full_quests.push(response.data);
        })
      )
    }
    );

    await Promise.all(party_promises);

    console.log(`Party full quests ${JSON.stringify(party_full_quests)}`);


    history.push({ pathname: "/hall", state: { global: state, quests: full_quests, party_quests: party_full_quests } });


  }

  async function handleCreateSubmit(event) {
    event.preventDefault();
    console.log(`lobbyname is ${lobbyName}`); //Create lobby
    console.log(`lobbycode is ${lobbyCode}`); //Join Lobby

    // If making Lobby
    state.lobbyName = lobbyName

    // Returns all the quests that contain the relevant user id
    let quests = await axios.post(`/parties`,
      {
        mentor_id: state.id,
        number_of_members: 1,
        party_name: lobbyName
      })
      .then((res) => {
        return res.data;
      })

    let full_quests = [];
    let promises = [];

    let party_full_quests = [];
    let party_promises = [];

    await Promise.all(party_promises);
    console.log(`Party full quests ${JSON.stringify(party_full_quests)}`);
    history.push({ pathname: "/hall", state: { global: state, quests: full_quests, party_quests: party_full_quests } });
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
          <form className={classes.form} onSubmit={handleJoinSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="join-lobby"
              label="Lobby Code"
              name="lobbyCode"
              value={lobbyCode}
              onChange={(e) => setLobbyCode(e.target.value)}
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
          <form className={classes.form} onSubmit={handleCreateSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="lobbyName"
              value={lobbyName}
              onChange={(e) => setLobbyName(e.target.value)}
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