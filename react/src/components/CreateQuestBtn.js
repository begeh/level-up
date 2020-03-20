import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form'
// import { TextField } from 'mui-rff';

import axios from 'axios';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function CreateQuestBtn(props) {
  const classes = useStyles();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [questTitle, setQuestTitle] = useState("")
  const [questDesc, setQuestDesc] = useState("")

  const [node1Title, setNode1Title] = useState("")
  const [node2Title, setNode2Title] = useState("")
  const [node3Title, setNode3Title] = useState("")
  const [node4Title, setNode4Title] = useState("")
  const [node5Title, setNode5Title] = useState("")

  const [node1Desc, setNode1Desc] = useState("")
  const [node2Desc, setNode2Desc] = useState("")
  const [node3Desc, setNode3Desc] = useState("")
  const [node4Desc, setNode4Desc] = useState("")
  const [node5Desc, setNode5Desc] = useState("")

  const [node1CompletionDate, setNode1CompletionDate] = useState(new Date('2014-08-18T21:11:54'))
  const [node2CompletionDate, setNode2CompletionDate] = useState(new Date('2014-08-18T21:11:54'))
  const [node3CompletionDate, setNode3CompletionDate] = useState(new Date('2014-08-18T21:11:54'))
  const [node4CompletionDate, setNode4CompletionDate] = useState(new Date('2014-08-18T21:11:54'))
  const [node5CompletionDate, setNode5CompletionDate] = useState(new Date('2014-08-18T21:11:54'))




  // Date Handlers
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  async function handleQuestSubmit(event) {
    event.preventDefault();
    console.log("function is called")
    console.log(questTitle)
    console.log(questDesc)

    let quest = {
      title: questTitle,
      description: questDesc,
      status: "underway",
      party_id: props.props.party_id,
      user_id: props.props.id
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
      },
      {
        title: node4Title,
        description: node4Desc,
        complete_by: node4CompletionDate,
      },
      {
        title: node5Title,
        description: node5Desc,
        complete_by: node5CompletionDate,
      }
    ]

    console.log(quest)

    let quest_info = await axios.post("/create_quest", { quest, nodes })
      .then((res) => res.data)

    console.log("Succesful write to database!")
    console.log(quest_info)

  }




  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Quest
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Quest</Modal.Title>
        </Modal.Header>
        <Modal.Body id='create-modal'>
        <form className={classes.form} noValidate onSubmit={handleQuestSubmit} >
            <h6>Quest Title:</h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="quest-title"
              label="Quest Title"
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
              label="Quest Description"
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
              label="Level 1"
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
              label="Level 1 Description"
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
                  onChange={e => setNode1CompletionDate(e.target.value)}
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
              label="Level 2"
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
              label="Level 2 Description"
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
                  onChange={e => setNode2CompletionDate(e.target.value)}
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
              label="Level 3"
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
              label="Level 3 Description"
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
                  onChange={e => setNode3CompletionDate(e.target.value)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <h6>Level 4 Objective:</h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="level-4"
              label="Level 4"
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
              label="Level 4 Description"
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
                  onChange={e => setNode4CompletionDate(e.target.value)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <h6>Level 5 Objective:</h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="level-5"
              label="Level 5"
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
              label="Level 5 Description"
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
                  onChange={e => setNode5CompletionDate(e.target.value)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            


            <div class="form-group">
              <label for="Mentor">Mentor:</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
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
          
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Submit Quest
          </Button>
        </Modal.Footer>

      </Modal>
    </div>
  );
}