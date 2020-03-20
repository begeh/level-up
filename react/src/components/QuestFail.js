import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import brokenShield from '../images/broken-shield.png'

export default function QuestFail(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className='finish-modal'>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <h3>Quest Failed</h3>
          <img src={brokenShield} alt='win image' className='finish-image' />
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-primary' onClick={handleClose}>
            Go Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

