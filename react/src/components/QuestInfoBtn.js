import React, { useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { List, ListItem,ListItemText} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import axios from 'axios';
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
  let selected_node = props.selected_node;

  console.log(nodes)

  const story_params ={
    apprentice: user_name,
    mentor: mentor_name,
    questTitle: quest.quest.title,
    nodes: nodes,
    dateEnd: Date.now(),
    dateStart: quest.quest.created_at
  }

  //'levels up' quest (i.e. progresses through nodes) when Level Up btn pressed. if quest is abandoned or completed successfully, redirects to quest page where appropriate modal is displayed and database is updated
  async function handleLevel(nodes, status) {
    console.log(`Status is ${status}`);
    
    //sets the selected node to the next node on the nodebar once level up btn is clicked
    if(selected_node < 4 && status !== "failed"){
      selected_node = nodes.findIndex(node => node["is_complete?"] === false) + 1;
    }

    if(status === "failed"){

      const num_completed_nodes = nodes.filter(node=> node["is_complete?"] === true).length;

      const story = fail(story_params, num_completed_nodes, quest.quest.user_id, quest.quest.mentor_id);

      await axios.put(`/quests/${quest_id}`,{"story": story,"status": "FAILED", "date_finished": new Date(Date.now())}).catch(err=> alert(err));
      
      quest_completed = "failed";
    }else{
      let node = nodes.find(node=> node["is_complete?"] === false);
      if(node){
        console.log(`Node not completed is ${node.id}`);
        await axios.put(`/nodes/${node.id}`, {"is_complete?": true,"date_finished": new Date(Date.now())}).catch(err => alert(err));
        if(node.id === nodes[nodes.length-1].id){

          const story = success(story_params, quest.quest.user_id, quest.quest.mentor_id);
  
          await axios.put(`/quests/${quest_id}`,{"story": story, "status": "SUCCESS", "date_finished": new Date(Date.now())}).catch(err=> alert(err));

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

    const node_id = await axios.get(`/quest_object/${quest_id}`)
                    .then(res =>{
                      const node = res.data.nodes.find(node=> node["is_complete?"] === false);
                      if(node){
                        return node.id;
                      } else{
                        return res.data.nodes[nodes.length - 1].id;
                      }
                      
                    });

    handleClose();

    history.push({pathname:`/quest/${quest_id}`,state:{global: state, quests: full_quests.sort((a,b)=>b.quest.id - a.quest.id), party_quests:party_full_quests.sort((a,b)=>b.quest.id - a.quest.id), quest_id: quest_id, mentor_name:mentor_name, user_name:user_name, party_info: party_info, quest_completed: quest_completed, node_id: node_id, selected_node: selected_node}})

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
          <h6>Finish Date: {quest.quest.date_finished ? (new Date(quest.quest.date_finished)).toLocaleDateString() : "In Progress"}</h6>
          <List className='quest-node-list'>
          {
            quest.nodes.map((node, index)=>(
              <div>
                <ListItem>
                  <svg class="bi bi-circle-fill" viewBox="0 0 16 16" fill={node.date_finished ? "#798A0D" : "#88773F"} xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="8"/>
                  </svg>
                  <ListItemText primary={`${node.title}  (${(new Date(node.complete_by)).toLocaleDateString()})`} secondary={`Date Finished: ${node.date_finished ? (new Date(node.date_finished)).toLocaleDateString() : "Incomplete"}`} />
                </ListItem>
                <p className='node-desc'>{node.description}</p>
              </div>
            ))
          }
          </List>
        </Modal.Body>
        <Modal.Footer>
          { 
          quest.quest.status === "IN PROGRESS" && (state.id === quest.quest.mentor_id || state.id === quest.quest.user_id) ? 
          <>
          { state.id === quest.quest.mentor_id ?
            <Button variant="primary" onClick={(event)=>{
              event.preventDefault();
              const status = "success";
              return handleLevel(nodes, status);
            }
              }>
              Level-Up!
            </Button> : null
          }
          { state.id === quest.quest.user_id ?
            <Button className='abandon' variant="secondary" onClick={(event)=>{
              event.preventDefault();
              const status = "failed";
              return handleLevel(nodes, status);
              }
            }>
              Abandon Quest
            </Button> : null
          }
          
          </> : null
          }
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}