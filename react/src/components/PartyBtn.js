import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Hidden,List, ListItem, ListItemAvatar,Avatar,ListItemText} from '@material-ui/core'

export default function PartyBtn(props) {
  const party = props.party_info;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Hidden smUp >
      <Button  variant="primary" onClick={handleShow}>
        Party
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{party.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <List>
          {
            party.members.map((member, index)=>(
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <img src="https://www.pinclipart.com/picdir/middle/379-3797946_software-developer-computer-servers-web-others-web-developer.png" alt="Party Button" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={member.name} secondary={member.title} />
              </ListItem>
            ))
          }
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Hidden>
  );
}

