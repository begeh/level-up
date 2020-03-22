import React, {Fragment, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Hidden, List, ListItem, ListItemAvatar,Avatar,ListItemText} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import QuestFinish from "./QuestFinish";
import success from '../helpers/success';
import fail from '../helpers/fail';

export default function QuestInfoBtn(props) {
  let history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = props.state;
  const mentor_name = props.mentor_name;
  const user_name = props.user_name;
  const quest = props.quest;
  const nodes = props.quest.nodes;
  const party_info = props.party_info;
  const quest_id = props.quest_id;
  let quest_completed = props.quest_completed;

  const story_params ={
    apprentice: user_name,
    mentor: mentor_name,
    questTitle: quest.quest.title,
    node1: nodes[0].title,
    node2: nodes[1].title,
    node3: nodes[2].title,
    node4: nodes[3].title,
    node5: nodes[4].title,
    dateEnd: Date.now(),
    dateStart: quest.quest.created_at
  }

  async function handleLevel(nodes, status) {
    console.log(`Status is ${status}`);
    if(status === "failed"){
      const num_completed_nodes = nodes.filter(node=> node["is_complete?"] === true).length;

      const story = fail(story_params, num_completed_nodes);

      await axios.put(`/quests/${quest_id}`,{"story":story,"status": "FAILED"}).catch(err=> alert(err));
      
      quest_completed = "failed";
    }else{
      let node = nodes.find(node=> node["is_complete?"] === false);
      if(node){
        console.log(`Node not completed is ${node.id}`);
        await axios.put(`/nodes/${node.id}`, {"is_complete?": true,"date_finished": new Date(Date.now())}).catch(err => alert(err));
        if(node.id === nodes[nodes.length-1].id){

          const story = success(story_params);
  
          await axios.put(`/quests/${quest_id}`,{"story": story, "status": "SUCCESS"}).catch(err=> alert(err));

          quest_completed = "success";
        }
      } else{
        quest_completed = "success";
      }
    }
    
    let quests = await axios.post(`/user_quests`, { user_id: state.id })
    .then((res) => {
      return res.data;
    })
    
    let full_quests = [];
    let promises = [];
    quests.forEach((quest) => {
      promises.push(axios.get(`/quest_object/${quest.id}`)
        .then((response) => {
          full_quests.push(response.data);
        })
        .catch((err)=> alert(err))
      )
    }
    );

    await Promise.all(promises);

    console.log(`Full Quests is ${JSON.stringify(full_quests)}`);

    let party_quests = await axios.post("/party_quests", { party_id: state.party_id })
      .then((res) => {
        return res.data
      })

    let party_full_quests = [];
    let party_promises = [];
    party_quests.forEach((quest) => {
      party_promises.push(axios.get(`/quest_object/${quest.id}`)
        .then((response) => {
          party_full_quests.push(response.data);
        })
      )
    }
    );

    await Promise.all(party_promises);

    handleClose();

    history.push({pathname:`/quest/${quest_id}`,state:{global: state, quests: full_quests.sort((a,b)=>b.quest.id - a.quest.id), party_quests:party_full_quests.sort((a,b)=>b.quest.id - a.quest.id), quest_id: quest_id, mentor_name:mentor_name, user_name:user_name, party_info: party_info, quest_completed: quest_completed}})

  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Quest Info
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <h3>{quest.quest.title}</h3>
          <h5>Quest Status: {quest.quest.status}</h5>
          <h6>{quest.quest.description}</h6>
          <h6>Mentor: {mentor_name}</h6>
          <h6>Apprentice: {user_name}</h6>
          <h6>Finish Date: {(new Date(quest.quest.date_finished)).toLocaleDateString()}</h6>
          <List>
          {
            quest.nodes.map((node, index)=>(
              <div>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img src="https://www.pinclipart.com/picdir/middle/379-3797946_software-developer-computer-servers-web-others-web-developer.png" alt="Quest Button" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Node ${node.id}: ${node.title}`} secondary={node.date_finished ? (new Date(node.date_finished)).toLocaleDateString() : "Incomplete"} />
                </ListItem>
                <p className='node-desc'>{node.description}</p>
              </div>
            ))
          }
          </List>
        </Modal.Body>
        <Modal.Footer>
          { 
          quest.quest.status === "SUCCESS" || quest.quest.status === "FAILED" ? null : <>
          <Button variant="primary" onClick={(event)=>{
            event.preventDefault();
            const status = "success";
            return handleLevel(nodes, status);
          }
            }>
            Level-Up!
          </Button>
          <Button variant="secondary" onClick={(event)=>{
            event.preventDefault();
            const status = "failed";
            return handleLevel(nodes, status);
          }
            }>
            Abandon Quest
          </Button>
          </>
          }
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}