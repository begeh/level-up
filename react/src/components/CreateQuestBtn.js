import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Grid, TextField } from '@material-ui/core';
import { Form, Field } from 'react-final-form'
import { useHistory } from "react-router-dom"
// import { TextField } from 'mui-rff';

import axios from 'axios';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';




export default function CreateQuestBtn(props) {

  let history = useHistory();
  let state = props.state;
  let party_info = props.party_info;
  console.log(state)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const node123Checks = () => {
    if (
      questTitle !== "" &&
      questDesc !== "" &&
      mentor !== "" &&
      node1Title !== "" &&
      node2Title !== "" &&
      node3Title !== "" &&
      node1Desc !== "" &&
      node2Desc !== "" &&
      node3Desc !== "" &&
      node1CompletionDate !== "" &&
      node2CompletionDate !== "" &&
      node3CompletionDate !== ""
    ) {
      return true
    }
    else {
      return false
    }
  }
  const node4Checks = () => {
    if (node4Title !== "" &&
      node4Desc !== "" &&
      node4CompletionDate !== ""
    ) {
      return true
    } else {
      return false
    }
  }

  const node5Checks = () => {
    if (node5Title !== "" &&
      node5Desc !== "" &&
      node5CompletionDate !== ""
    ) {
      return true
    } else {
      return false
    }
  }

  const handleSubmitClose = () => {
    if (node123Checks === true && submit4 === false && submit5 === false) {

      setShow(false)
    } else if (node123Checks === true && submit4 === true) {
      if (node4Checks === true) {
        setShow(false)
      }
    } else if (node123Checks === true && submit4 === true && node4Checks === true) {
      if (node5Checks === true) {
        setShow(false)
      }
    }
  };

  const handleShow = () => setShow(true);

  const [questTitle, setQuestTitle] = useState("")
  const [questDesc, setQuestDesc] = useState("")
  const [mentor, setMentor] = useState(state.name);

  const [node1Title, setNode1Title] = useState("")
  const [node2Title, setNode2Title] = useState("")
  const [node3Title, setNode3Title] = useState("")
  const [node4Title, setNode4Title] = useState(true)
  const [node5Title, setNode5Title] = useState(true)

  const [node1Desc, setNode1Desc] = useState("")
  const [node2Desc, setNode2Desc] = useState("")
  const [node3Desc, setNode3Desc] = useState("")
  const [node4Desc, setNode4Desc] = useState(true)
  const [node5Desc, setNode5Desc] = useState(true)

  const [node1CompletionDate, setNode1CompletionDate] = useState(new Date(Date.now()))
  const [node2CompletionDate, setNode2CompletionDate] = useState(new Date(Date.now()))
  const [node3CompletionDate, setNode3CompletionDate] = useState(new Date(Date.now()))
  const [node4CompletionDate, setNode4CompletionDate] = useState(true)
  const [node5CompletionDate, setNode5CompletionDate] = useState(true)




  // Date Handlers
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  async function handleQuestSubmit(event) {
    event.preventDefault();
    console.log(`mentor name is ${mentor}`);
    const mentor_id = await axios.get(`/users`)
      .then((res) => {

        return res.data.filter(user => user.name === mentor)[0].id

      });

    let quest = {
      title: questTitle,
      description: questDesc,
      status: "IN PROGRESS",
      party_id: state.party_id,
      user_id: state.id,
      mentor_id: mentor_id
    }

    let nodes = [
      {
        title: node1Title,
        description: node1Desc,
        complete_by: node1CompletionDate,
      },
      {
        title: node2Title,
        description: node2Desc,
        complete_by: node2CompletionDate,
      },
      {
        title: node3Title,
        description: node3Desc,
        complete_by: node3CompletionDate,
      }
    ]
    if (submit4) {
      nodes.push(
        {
          title: node4Title,
          description: node4Desc,
          complete_by: node4CompletionDate
        }
      )
    }
    if (submit5) {
      nodes.push(
        {
          title: node5Title,
          description: node5Desc,
          complete_by: node5CompletionDate
        }
      )
    }
    console.log(quest)

    let quest_info = await axios.post("/create_quest", { quest, nodes })
      .then((res) => res.data)

    console.log("Succesful write to database!")
    console.log(quest_info)

    let quests = await axios.post(`/user_quests`, { user_id: state.id })
      .then((res) => {
        return res.data;
      })

    let full_quests = [];
    let promises = [];
    quests.forEach((quest) => {
      promises.push(axios.get(`/quest_object/${quest.id}`)
        .then((response) => {
          full_quests.push(response.data);
        })
        .catch((err) => alert(err))
      )
    }
    );

    await Promise.all(promises);

    console.log(`Full Quests is ${JSON.stringify(full_quests)}`);

    let party_quests = await axios.post("/party_quests", { party_id: state.party_id })
      .then((res) => {
        return res.data
      })

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

    handleClose();

    //resets state of all fields to their initial states after submission of form
    setQuestTitle("");
    setQuestDesc("");
    setMentor(state.name);
    setNode1Desc("");
    setNode1Title("");
    setNode1CompletionDate(new Date(Date.now()));
    setNode2Desc("");
    setNode2Title("");
    setNode2CompletionDate(new Date(Date.now()));
    setNode3Desc("");
    setNode3Title("");
    setNode3CompletionDate(new Date(Date.now()));
    setNode4Desc("");
    setNode4Title("");
    setNode4CompletionDate(new Date(Date.now()));
    setNode5Desc("");
    setNode5Title("");
    setNode5CompletionDate(new Date(Date.now()));
    setSelectedDate(new Date(Date.now()));

    history.push({ pathname: "/hall", state: { global: state, quests: full_quests.sort((a, b) => b.quest.id - a.quest.id), party_quests: party_full_quests.sort((a, b) => b.quest.id - a.quest.id), party_info: party_info } })

  }

  const [Form4, setForm4] = useState(false)
  const [Show4, setShow4] = useState(true)
  const [submit4, setSubmit4] = useState(false)

  const [Form5, setForm5] = useState(false)
  const [Show5, setShow5] = useState(false)
  const [submit5, setSubmit5] = useState(false)

  const showForm4 = () => {
    setNode4Title("")
    setNode4Desc("")
    setNode4CompletionDate(new Date(Date.now()))
    setSubmit4(true)
    setForm4(true)
    setShow4(false)
    setShow5(true)
  }

  const showForm5 = () => {
    setNode5Title("")
    setNode5Desc("")
    setNode5CompletionDate(new Date(Date.now()))
    setSubmit5(true)
    setForm5(true)
    setShow5(false)
  }




  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Quest
      </Button>


      <Modal show={show} onHide={handleClose}>
        <form validate="true" onSubmit={handleQuestSubmit} >
          <Modal.Header closeButton>
            <Modal.Title>Create Quest</Modal.Title>
          </Modal.Header>
          <Modal.Body id='create-modal'>
            <h6>Quest Title:</h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="quest-title"
              label="Learn..."
              name="quest-title"
              autoComplete="Quest Title"
              value={questTitle}
              onChange={e => setQuestTitle(e.target.value)}
              autoFocus
            />

            <h6>Quest Description:</h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows="4"
              name="description"
              label="I want to learn... because..."
              id="description"
              autoComplete="Description"
              value={questDesc}
              onChange={e => setQuestDesc(e.target.value)}
            />

            <h6>Level 1 Objective:</h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="level-1"
              label="Learn..."
              id="level-1"
              autoComplete="Level 1"
              value={node1Title}
              onChange={e => setNode1Title(e.target.value)}
            />

            <h6>Level 1 Description:</h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="level-1-desc"
              label="I am starting with... so I can..."
              id="level-1-desc"
              autoComplete="Level 1 Description"
              value={node1Desc}
              onChange={e => setNode1Desc(e.target.value)}
            />

            <h6>Level 1 Completion Date:</h6>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="level-1-date"
                  value={node1CompletionDate}
                  onChange={e => setNode1CompletionDate(e)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <h6>Level 2 Objective:</h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="level-2"
              label="Learn..."
              id="level-2"
              autoComplete="Level 2"
              value={node2Title}
              onChange={e => setNode2Title(e.target.value)}
            />
            <h6>Level 2 Description:</h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="level-2-desc"
              label="I am learning... next so..."
              id="level-2-desc"
              autoComplete="Level 2 Description"
              value={node2Desc}
              onChange={e => setNode2Desc(e.target.value)}
            />
            <h6>Level 2 Completion Date:</h6>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="level-2-date"
                  value={node2CompletionDate}
                  onChange={e => setNode2CompletionDate(e)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <h6>Level 3 Objective:</h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="level-3"
              label="Learn..."
              id="level-3"
              autoComplete="Level 3"
              value={node3Title}
              onChange={e => setNode3Title(e.target.value)}
            />
            <h6>Level 3 Description:</h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="level-3-desc"
              label="...is next on my list because..."
              id="level-3-desc"
              autoComplete="Level 3 Description"
              value={node3Desc}
              onChange={e => setNode3Desc(e.target.value)}
            />
            <h6>Level 3 Completion Date:</h6>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="level-3-date"
                  value={node3CompletionDate}
                  onChange={e => setNode3CompletionDate(e)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <div className={Show4 ? 'btn btn-primary form-button' : 'hidden-form'} onClick={() => showForm4()}>Add Level</div>

            <div className={Form4 ? null : 'hidden-form'}>
              <h6>Level 4 Objective:</h6>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                name="level-4"
                label="Learn..."
                id="level-4"
                autoComplete="Level 4"
                value={node4Title}
                onChange={e => setNode4Title(e.target.value)}
              />
              <h6>Level 4 Description:</h6>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                name="level-4-desc"
                label="...is important because..."
                id="level-4-desc"
                autoComplete="Level 4 Description"
                value={node4Desc}
                onChange={e => setNode4Desc(e.target.value)}
              />
              <h6>Level 4 Completion Date:</h6>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="level-4-date"
                    value={node4CompletionDate}
                    onChange={e => setNode4CompletionDate(e)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>

            <div className={Show5 ? 'btn btn-primary form-button' : 'hidden-form'} onClick={() => showForm5()}>Add Level</div>

            <div className={Form5 ? null : 'hidden-form'}>

              <h6>Level 5 Objective:</h6>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                name="level-5"
                label="Learn..."
                id="level-5"
                autoComplete="Level 5"
                value={node5Title}
                onChange={e => setNode5Title(e.target.value)}
              />
              <h6>Level 5 Description:</h6>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                name="level-5-desc"
                label="Finally, I will learn... so..."
                id="level-5-desc"
                autoComplete="Level 5 Description"
                value={node5Desc}
                onChange={e => setNode5Desc(e.target.value)}
              />
              <h6>Level 5 Completion Date:</h6>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="level-5-date"
                    value={node5CompletionDate}
                    onChange={e => setNode5CompletionDate(e)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>




            <div class="form-group">
              <label for="Mentor">Mentor:</label>
              <select defaultValue={state.name} class="form-control"
                onChange={e => setMentor(e.target.value)} id="exampleFormControlSelect1">
                {
                  party_info.members.map(member => (
                    <option value={member.name}>{member.name}</option>
                  ))
                }
              </select>
            </div>

            <h6>Quest Completion Date:</h6>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="quest-complete-date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary" onClick={handleSubmitClose}>
              Submit Quest
          </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}