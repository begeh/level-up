import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import shield from '../images/shield.png';
import { useHistory } from "react-router-dom";

export default function QuestFinish(props) {
  const [show, setShow] = useState(true);

  let history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = props.state;
  const quests = props.quests;
  const party_quests = props.party_quests;
  const party_info = props.party_info;
  const quest = props.quest;

  return (
    <div className='finish-modal'>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <h3>Quest Complete</h3>
          <img src={shield} alt='Win Shield' className='finish-image' />
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-primary' onClick={()=>{
            handleClose();
            history.push({pathname:`/legacy/history/${quest.quest.id}`,state:{global: state, quests: quests, quest: quest, party_quests: party_quests, party_info:party_info}});
            }}>
            See Your Story
          </Button>
          <Button className='btn btn-primary' onClick={()=>{
            handleClose();
            history.push({ pathname: `/hall`, state: { global: state, quests: quests, party_quests: party_quests, party_info: party_info } });
            }}>
            Go Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

