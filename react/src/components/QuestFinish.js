import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { Hidden } from '@material-ui/core'
import shield from '../images/shield.png'

export default function PartyBtn(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className='finish-modal'>
      <Hidden>
      <Button  variant="primary" onClick={handleShow}>
        Complete
      </Button>
      </Hidden>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <h3>Win</h3>
          <img src={shield} alt='win image' className='finish-image' />
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

