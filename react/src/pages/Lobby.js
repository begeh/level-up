import React, { useState } from 'react';
import { Typography, Card, Button, TextField, Container } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import logo from '../images/logo.png'
import axios from 'axios';



// Returns all the quests that contain the relevant user id
let returnUserQuests = async (id) => {
  return await axios.post(`/user_quests`, { user_id: id })
    .then((res) => {
      return res.data;
    })
}
// Returns all the quests that contain the relevant party_id
let returnPartyQuests = async (party_id) => {
  return await axios.post("/party_quests", { party_id: party_id })
    .then((res) => {
      return res.data
    })
}
// Returns the party members of the current party
let returnPartyMembers = async (party_id) => {

  return await axios.post("/user_party_members", { party_id })
    .then((response) => {
      let list = [];
      response.data.forEach(user => {
        list.push({
          name: user.name,
          title: user.title,
          avatar: user.profile_pic_ref
        });
      })
      return list;
    })
}



let current_user = null

export default function Lobby(props) {
  const state = props.location.state;
  current_user = state

  let history = useHistory();
  const [lobbyName, setLobbyName] = useState(null); //Create lobby
  const [lobbyCode, setLobbyCode] = useState(null); //Join Lobby



  // This can be split later on if we get our MVP done but it works fine for now
  async function handleJoinSubmit(event) {
    event.preventDefault();
  
    //checks if user is already part of party when join lobby btn is pressed. if not, it resets their party_id in database to the lobbyCode entered and gives them access
    if (state.party_id !== lobbyCode) {
      axios.put(`/users/${state.id}`, { "party_id": lobbyCode })
    }

    state.party_id = lobbyCode;

    // If joining Lobby
    state.lobbyCode = lobbyCode

    let party_name = await axios.get(`/parties/${state.lobbyCode}`)
      .then((response) => {

        return response.data.party_name;

      }).catch((err) => {
        if (err.response.request.status === 404) {
          alert("No lobby matching that code was found")
        } else if (err.response.request.status === 500) {
          alert("An error occurred, please contact the site administrator")
        }

        return null

      });

    if (party_name) {

      let quests = await returnUserQuests(state.id)

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

      //Use the user provided lobbyCode to populate the party_quests
      let party_quests = await returnPartyQuests(lobbyCode);

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

      // Set party_id to user defined lobbyCode
      let party_id = lobbyCode;

      let party_members = await returnPartyMembers(party_id)

      const party_info = {
        id: party_id,
        name: party_name,
        members: party_members
      }

      history.push({ pathname: "/hall", state: { global: state, quests: full_quests.sort((a, b) => b.quest.id - a.quest.id), party_quests: party_full_quests.sort((a, b) => b.quest.id - a.quest.id), party_info: party_info } });
    }

  }

  async function handleCreateSubmit(event) {
    event.preventDefault();

    // If making Lobby
    state.lobbyName = lobbyName

    // Creates a party and returns a party object
    let party = await axios.post(`/parties`,
      {
        mentor_id: state.id,
        number_of_members: 1,
        party_name: lobbyName,
        user_id: state.id
      }).then((res) => {
        return res.data;
      }).catch((err) => {
        if (err.response.request.status === 422) {
          alert("That party name is already taken")
        } else if (err.response.request.status === 500) {
          alert("An error occurred, please contact the site administrator")
        }
        return null
      });

    // If a party was created (and therefore returned)
    if (party) {

      state.party_id = party.id

      let quests = await returnUserQuests(state.id)

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

      let party_quests = await returnPartyQuests(state.party_id);

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

      //Use the returned party ID
      let party_id = party.id
      let party_name = party.party_name

      // Uses the party_id returned when making a party
      let party_members = await returnPartyMembers(party_id)

      const party_info = {
        id: party_id,
        name: party_name,
        members: party_members
      }

      history.push({ pathname: "/hall", state: { global: state, quests: full_quests.sort((a, b) => b.quest.id - a.quest.id), party_quests: party_full_quests.sort((a, b) => b.quest.id - a.quest.id), party_info: party_info } });
    }
  }

  return (
    <Container className='page' component="main">
      <Card className='sign'>
        <img src={logo} alt='logo' />
        <Typography component="h1" variant="h5">
          Join a Lobby
        </Typography>
        <form validate="true" onSubmit={handleJoinSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="join-lobby"
            label="Enter Party ID here"
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
          >
            Join Party
          </Button>
        </form>
        <form validate="true" onSubmit={handleCreateSubmit} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lobbyName"
            value={lobbyName}
            onChange={(e) => setLobbyName(e.target.value)}
            label="Party Name"
            type="create-lobby"
            id="create-lobby"
            autoComplete="new-lobby"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Create New Party
          </Button>
        </form>
      </Card>
    </Container>
  );
}