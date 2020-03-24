import React, {useState} from 'react';
import { Card, Typography, Container, Link, Checkbox, FormControlLabel, TextField, Button, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import logo from  '../images/logo.png'
import axios from 'axios';
import './SignIn.scss'


export default function SignIn(props) {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let state = props.value;

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(`email is ${email}`);
    console.log(`password is ${password}`);
    //Makes a post request to /user, with email and password sent in the body
    //The rails server will grab all the users with that email and return them (there should only be 1 if I set it up right)
    let users = await axios.post(`/user`, {email, password}).then((res)=> res.data);
    //If the email is not found, this line sets user to a falsey value, otherwise user is true
    let user = users[0]
    console.log(`This is user ${user}`)
    
    if(user){
      state = user;
      history.push({
        pathname: "/lobby",
        state: state
      });
    } else{
      //Added this line for the UX
      alert("Email was not found or password is incorrect, please try again.")
      history.push('/');
    }
  }

  return (
    <Container component="main" className='page'>
        <Card className='sign'>
          <img src={logo} alt='logo' />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form validate="true" onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link onClick={()=>history.push({pathname: "/signup", state: state})} href="" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Card>
    </Container>
  );
}
