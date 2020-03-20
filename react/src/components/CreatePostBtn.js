import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { TextField } from '@material-ui/core'

export default function CreatePostButton() {
  const [show, setShow] = useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("")
  const [postType, setPostType] = useState("sword");
  const [videoURL, setVideoURL] = useState("");
  const [imageURL, setImageURL] = useState("");



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handlePostSubmit(event) {
    event.preventDefault();
    console.log("function called")
    let post = {
      title: postTitle,
      content: postDescription,
      symbol_ref: postType,
      video_url: videoURL,
      image_url:imageURL
    }

    console.log(post)

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form noValidate onSubmit={handlePostSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="quest-title"
              label="Post Title"
              name="quest-title"
              autoComplete="Quest Title"
              value={postTitle}
              onChange={e => setPostTitle(e.target.value)}
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
              value={postDescription}
              onChange={e => setPostDescription(e.target.value)}
            />
            <div class="form-group">
              <label for="Mentor">Type</label>
              <select value={postType} onChange={e => setPostType(e.target.value)}
                class="form-control" id="exampleFormControlSelect1">
                <option selected value="sword">Action</option>
                <option value="question">Research</option>
                <option value="book">Question</option>
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
              value={videoURL}
              onChange={e => setVideoURL(e.target.value)}
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
              value={imageURL}
              onChange={e => setImageURL(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose} type="submit">
              Submit Post
          </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}