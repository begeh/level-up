import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Hidden, List, ListItem, ListItemAvatar,Avatar,ListItemText} from '@material-ui/core'

export default function QuestInfoBtn(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const mentor_name = props.mentor_name;
  const user_name = props.user_name;
  const quest = props.quest
  
  const quest_info = {
    title: 'The Great Novigrad Heist',
    description: 'Free the witches',
    nodes: [
      {
        title: 'start',
        description: 'start it',
        date: Date(Date.now()).toString(),
        isComplete: true
      },
      {
        title: 'middle',
        description: 'middle part',
        date: Date(Date.now()).toString(),
        isComplete: true
      },
      {
        title: 'end',
        description: 'The last part',
        date: Date(Date.now()).toString(),
        isComplete: false
      }
    ],
    mentor: "John",
    date_finish: Date(Date.now()).toString()
  };

  return (
    <Hidden smUp>
      <Button variant="primary" onClick={handleShow}>
        Quest Info
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{quest.quest.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Quest Title: {quest.quest.title}</p>
          <p>Quest Desc: {quest.quest.description}</p>
          <p>Expected Quest Finish Date: {(new Date(quest.quest.date_finished)).toLocaleDateString()}</p>
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
                  <ListItemText primary={`Node ${node.id}: ${node.title}`} secondary={(new Date(node.date_finished)).toLocaleDateString()} />
                </ListItem>
                <p>Node {node.id} Desc: {node.description}</p>
              </div>
            ))
          }
          <p>Quester Name: {user_name}</p>
          <p>Mentor Name: {mentor_name}</p>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Level-Up!
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Abandon Quest
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Hidden>
  );
}