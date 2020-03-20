import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {TextField} from '@material-ui/core'

export default function CreatePostButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Quest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="quest-title"
              label="Post Title"
              name="quest-title"
              autoComplete="Quest Title"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="description"
              label="Post Description"
              id="description"
              autoComplete="Description"
            />
            <div class="form-group">
              <label for="Mentor">Type</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>Action</option>
                <option>Research</option>
                <option>Question</option>
              </select>
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="Date"
              label="Video URL"
              id="Date"
              autoComplete="Date"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="Date"
              label="Image URL"
              id="Date"
              autoComplete="Date"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Submit Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}