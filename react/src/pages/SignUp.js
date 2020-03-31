import React, { useState } from 'react';
import { Typography, Card, Container, Button, TextField, Link, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import logo from  '../images/logo.png'
import axios from 'axios';


export default function SignUp(props) {
  let history = useHistory();
  let state = props.location.state;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    //Makes a post request to /users with the signup information
    //The rails server will return a user object upon a successful user creation
    let user = await axios.post(`/users`, {
      email,
      password,
      title,
      name: `${firstName} ${lastName}`,
      profile_pic_ref: "none"
    }).then((res) => res.data);
    
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