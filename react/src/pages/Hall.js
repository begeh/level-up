import React from 'react';
import { Grid, Hidden, Link } from '@material-ui/core';
import CreateQuestBtn from '../components/CreateQuestBtn'
import NavForApp from '../components/NavForApp';
import './Hall.scss'
import { useHistory } from "react-router-dom"
import HallList from "../components/HallList"
import shield from '../images/shield.png'
import axios from 'axios';
import Wizard from '../components/Wizard'

export default function Hall(props) {
  let history = useHistory();
  let state = {};
  let quests = {};
  let party_quests = {};
  let party_info = {};
  let selected_node = null;
  let hobby = null;

  if (props.location.state) {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    party_info = props.location.state.party_info;
    hobby = props.location.state.hobby;
    console.log(`This is party_quests ${party_quests}`)
  } else {
    history.push('/');
  }

  // console.log(`Hall State is ${JSON.stringify(state)}`);

  function clickWizard() {
    // const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&pllimit=500&prop=links&titles=List+of+hobbies";

    // const hobbies = await axios.get(url).then(res => res.data.query.pages['31257416'].links);

    //array of hobbies for wizard quote box
    const hobbies= ["3D printing", "Acrobatics", "Acting"
  ,"Baking", "Baseball", "Basketball", "Blogging", "Canoeing", "Canyoning", "Dance", "Darts", "Embroidery", "Fencing", "Field hockey", "Glassblowing", "Gardening", "Herbalism", "Homebrewing", "Ice skating", "Insect collecting", "Jewelry making", "Juggling", "Kart racing", "Kitesurfing", "Lace making", "Leather crafting", "Mahjong", "Meditation", "Nail art"
, "Origami", "Painting", "Parkour", "Poker", "Quilting", "Rafting", "Rock climbing", "Rowing", "Sailing", "Sculpting", "Shogi", "Stamp collecting", "Taxidermy", "Tennis", "Video editing", "Video game development", "Water polo", "Weaving"
, "Weight training", "Welding"]

    //chooses index of random hobby from hobbies array and sets item at that hobby_index as hobby variable
    const hobby_index = Math.round(Math.random() * (hobbies.length - 1))

    hobby = hobbies[hobby_index].toLowerCase();

    history.push({ pathname: "/hall", state: { global: state, quests: quests, party_quests: party_quests, party_info: party_info, hobby: hobby } });
  }


  //handles click on nodes or quest titles on hall page and redirects to quest page at the selected node or, in case of quest title being clicked, to the current in progress node
  async function handleClick(id, mentor_id, user_id, node_id, index, nodes) {
    
     const quest = party_quests.filter(quest => quest.quest.id === id)[0];

    if (index === 0 || nodes[index - 1]["is_complete?"]) {
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

    } else if (quest.quest.status === "IN PROGRESS" && quest.quest.user_id === state.id){
      alert("We know it's tempting to skip ahead, but you'll need finish the earlier nodes before moving on.")
    } else{
      alert("No more progress");
    }
  }

  return (
    <>
      <NavForApp nav_title='HALL' state={state} quests={quests} party_quests={party_quests} party_info={party_info} />
      <Grid container className='full' >
        <Hidden xsDown>
          <Grid className='container-left party-container' item sm={5} >
            <h3>{party_info.name}</h3>
            <img src={shield} alt='party logo' className='party-logo' />
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
            <Wizard hobby={hobby} clickWizard={clickWizard}/>
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