import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Hidden, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'
import userIcon from '../images/avatar.png'

export default function PartyBtn(props) {
  const party = props.party_info;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Hidden smUp >
      <Button variant="primary" onClick={handleShow}>
        Party
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{party.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='modal-code'>{party.id}</p>
          <List>
            {
              party.members.map((member, index) => (
                <ListItem>
                  {/* Renders a default avatar if no user avatar is present */}
                  {(member.avatar)
                    ? <img src={member.avatar} alt='avatar image' className='avatar' />
                    : <img src={userIcon} alt='avatar image' className='avatar' />
                  }
                  <ListItemText primary={member.name} secondary={member.title} />
                </ListItem>
              ))
            }
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-primary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Hidden>
  );
}

