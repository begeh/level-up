import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { TextField } from '@material-ui/core'
import axios from "axios"
import { useHistory } from "react-router-dom"

export default function CreatePostButton(props) {
  const [show, setShow] = useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("")
  const [postType, setPostType] = useState("sword");
  const [videoURL, setVideoURL] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let history = useHistory();

  const state = props.state;
  const mentor_name = props.mentor_name;
  const user_name = props.user_name;
  const quest_id = props.quest_id;
  let quests = props.quests;
  let party_quests = props.party_quests;
  const node_id = props.node_id;
  const party_info = props.party_info;

  async function handlePostSubmit(event) {
    event.preventDefault();
    console.log("function called")
    let post_package = {
      title: postTitle,
      content: postDescription,
      symbol_ref: postType,
      video_url: videoURL,
      image_url: imageURL,
      node_id: node_id
    }
    console.log(post_package)

    let post = await axios.post("/posts", {
      title: postTitle,
      content: postDescription,
      symbol_ref: postType,
      video_url: videoURL,
      image_url: imageURL,
      node_id: node_id
    }
    ).then((res) => res.data);

    quests = await axios.post(`/user_quests`, { user_id: state.id })
    .then((res) => {
      return res.data;
    })
 
    console.log(JSON.stringify(quests))
  
    let full_quests = [];
    let promises = [];
    quests.forEach((quest) => {
      promises.push(axios.get(`/quest_object/${quest.id}`)
        .then((response) => {
          full_quests.push(response.data);
        })
      )
    }
    );
  
    await Promise.all(promises);
  
    console.log(`Full quests ${JSON.stringify(full_quests)}`);
  
    party_quests = await axios.post("/party_quests", { party_id: state.party_id })
      .then((res) => {
        return res.data
      })
  
    console.log(`This is party quests ${JSON.stringify(full_quests)}`)
  
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

    const quest = party_full_quests.filter(quest => quest.quest.id === quest_id)[0];

    const posts = quest.posts.flat();

    const node_posts = posts.filter(post => post.node_id === node_id);
    
    history.push({ pathname: `/quest/${quest_id}`, state: { global: state, quest_id: quest_id, quests: full_quests.sort((a,b)=>b.quest.id - a.quest.id), party_quests: party_full_quests.sort((a,b)=>b.quest.id - a.quest.id), mentor_name: mentor_name, user_name: user_name, party_info: party_info, node_posts: node_posts, node_id: node_id } })

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
            <h6>Post Description:</h6>
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
            <h6>Post Type:</h6>
            <div class="form-group">
              <label for="Mentor">Type</label>
              <select value={postType} onChange={e => setPostType(e.target.value)}
                class="form-control" id="exampleFormControlSelect1">
                <option selected value="sword">Action</option>
                <option value="question">Research</option>
                <option value="book">Question</option>
              </select>
            </div>
            <h6>Video Url:</h6>
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
            <h6>Image Url:</h6>
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