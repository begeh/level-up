import React, {useState, Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";

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
  const state = props.location.data;
  console.log(`New State: ${state}`)
  console.log(`Received email: ${props.location.data.email} and password: ${props.location.data.password}`);

  const classes = useStyles();
  let history = useHistory();
  const [lobbyName, setLobbyName] = useState(null);
  const [lobbyCode, setLobbyCode] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`lobbyname is ${lobbyName}`);
    console.log(`lobbycode is ${lobbyCode}`);
    if(lobbyName && !lobbyCode){
      state.lobbyName = lobbyName
    } else if(lobbyCode && !lobbyName){
      state.lobbyCode = lobbyCode
    } 
    history.push({
      pathname: "/hall",
      state: state
    });
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