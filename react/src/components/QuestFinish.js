import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import shield from '../images/shield.png'

export default function QuestFinish(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
          <Button className='btn btn-primary' onClick={handleClose}>
            Go Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

