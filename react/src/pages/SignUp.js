import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography, Card, Container } from '@material-ui/core';
import logo from  '../images/logo.png'
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import axios from 'axios';


export default function SignUp(props) {
  let history = useHistory();
  let state = props.location.state;

  console.log(state);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();


    console.log(`email is ${email}`);
    console.log(`password is ${password}`);
    console.log(`title is ${title}`)
    console.log(`firstname is ${firstName}`)
    console.log(`lastname is ${lastName}`)


    //Makes a post request to /users with the signup information
    //The rails server will return a user object upon a successful user creation
    let user = await axios.post(`/users`, {
      email,
      password,
      title,
      name: `${firstName} ${lastName}`
    }).then((res) => res.data);
    console.log(user)
    if (user.id) {
      state = user;
      history.push({
        pathname: "/lobby",
        state: state
      });
    } else {
      //Added this line for the UX
      alert("Something went wrong, you shouldn't be seeing this message")
      history.push('/');
    }
  }

  return (
    <Container component="main" className='page'>
      <Card className='sign'>
        <img src={logo} alt='logo' />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
          {/* Set noValidate to validate so users can't input empty fields */}
          <form validate="true" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Your Title"
                  name="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  autoComplete="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link onClick={() => history.push("/")} href="" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </form>
      </Card>
    </Container>
  );
}