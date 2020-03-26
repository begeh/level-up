import React from 'react';
import { Grid, Hidden, Link } from '@material-ui/core';
import CreateQuestBtn from '../components/CreateQuestBtn'
import NavForApp from '../components/NavForApp';
import './Hall.scss'
import { useHistory } from "react-router-dom"
import HallList from "../components/HallList"
import shield from '../images/shield.png'

import axios from 'axios';

export default function Hall(props) {
  let history = useHistory();
  let state = {};
  let quests = {};
  let party_quests = {};
  let party_info = {};
  let selected_node = null;
  if (props.location.state) {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    party_info = props.location.state.party_info;
    console.log(`This is party_quests ${party_quests}`)
  } else {
    history.push('/');
  }

  console.log(`Hall State is ${JSON.stringify(state)}`);

  async function handleClick(id, mentor_id, user_id, node_id, index) {

    selected_node = index;

    let users = await axios.get('users')
      .then((response) => {
        let users = {};
        let mentor = response.data.filter(user => user.id === mentor_id);
        let user = response.data.filter(user => user.id === user_id);
        users.user_name = user[0].name;
        users.mentor_name = mentor[0].name;
        return users;
      });

    history.push({ pathname: `/quest/${id}`, state: { global: state, quests: quests, party_quests: party_quests, quest_id: id, mentor_name: users.mentor_name, user_name: users.user_name, party_info: party_info, node_id: node_id, selected_node: selected_node } })


  }

  return (
    <>
      <NavForApp nav_title='HALL' state={state} quests={quests} party_quests={party_quests} party_info={party_info} />
      <Grid container className='full' >
        <Hidden xsDown>
          <Grid className='container-left party-container' item sm={5} >
            <h3>{party_info.name}</h3>
            <img src={shield} alt='party-logo' />
            <p className='party-code'>{party_info.id}</p>
            <div>
              <h5>Party Members</h5>
              {
                party_info.members.map(member => {
                  return (
                    <div className='party-member'>
                      <p>{member.name}</p>
                      <p className='party-title'>~ {member.title} ~</p>
                    </div>
                  )
                })
              }

            </div>
          </Grid>
        </Hidden>

        <Grid className='container-right' item xs={12} sm={7} >
          <HallList quests={party_quests} handleClick={handleClick} />
          { party_quests.filter(quest=> quest.quest.status === 'IN PROGRESS').length < 5 ?
          <CreateQuestBtn
            state={state} quests={quests} party_quests={party_quests} party_info={party_info}
          /> : <h6>*** Maximum of 5 quests can be "IN PROGRESS" in a party ***</h6>
          }
        </Grid>
      </Grid>


    </>
  );
}