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

  // let questDesc, node1Title, node1Desc, node1CompletionDate,
  //   node2Title, node2Desc, node2CompletionDate,
  //   node3Title, node3Desc, node3CompletionDate,
  //   node4Title, node4Desc, node4CompletionDate,
  //   node5Title, node5Desc, node5CompletionDate = null

  console.log(props)
  console.log(questTitle)

  async function handleQuestSubmit(event) {
    event.preventDefault();
    console.log("function is called")
    console.log(questTitle)
    console.log(questDesc)

    let quest = {
      title: questTitle,
      quest_description: questDesc,
      status: "underway",
      party_id: props.props.party_id,
      user_id: props.props.id
    }
    let nodes = {
      node1: {
        title: node1Title,
        description: node1Desc,
        complete_by: node1CompletionDate,
      },
      node2: {
        title: node2Title,
        description: node2Desc,
        complete_by: node2CompletionDate,
      },
      node3: {
        title: node3Title,
        description: node3Desc,
        complete_by: node3CompletionDate,
      },
      node4: {
        title: node4Title,
        description: node4Desc,
        complete_by: node4CompletionDate,
      },
      node5: {
        title: node5Title,
        description: node5Desc,
        complete_by: node5CompletionDate,
      }
    }

    console.log(quest)

    let quest_info = await axios.post("/create_quest", { quest, nodes })
      .then((res) => res.data)

    console.log(quest_info)

  }




  return (

    <>
      <Button variant="primary" onClick={handleShow}>
        Create Quest
      </Button>


      <Modal show={show} onHide={handleClose}>
        <form className={classes.form} noValidate onSubmit={handleQuestSubmit} >
          <Modal.Header closeButton>
            <Modal.Title>Create Quest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="description"
              label="Quest Description"
              id="description"
              autoComplete="Description"
              value={questDesc}
              onChange={e => setQuestDesc(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="node1"
              label="Node 1"
              id="node1"
              autoComplete="Node 1"
              value={node1Title}
              onChange={e => setNode1Title(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="node1"
              label="Node 1 Description"
              id="node1"
              autoComplete="Node 1"
              value={node1Desc}
              onChange={e => setNode1Desc(e.target.value)}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={node1CompletionDate}
                  onChange={e => setNode1CompletionDate(e.target.value)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="node2"
              label="Node 2"
              id="node1"
              autoComplete="Node 2"
              value={node2Title}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="node2"
              label="Node 2 Description"
              id="node1"
              autoComplete="Node 2"
              value={node2Desc}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={node2CompletionDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="node3"
              label="Node 3"
              id="node1"
              autoComplete="Node 3"
              value={node3Title}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="node3"
              label="Node 3 Description"
              id="node1"
              autoComplete="Node 3"
              value={node3Desc}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={node3CompletionDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="node4"
              label="Node 4"
              id="node1"
              autoComplete="Node 4"
              value={node4Title}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="node4"
              label="Node 4 Description"
              id="node1"
              autoComplete="Node 4"
              value={node4Desc}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={node4CompletionDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="node5"
              label="Node 5"
              id="node1"
              autoComplete="Node 5"
              value={node5Title}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="node5"
              label="Node 5 Description"
              id="node1"
              autoComplete="Node 5"
              value={node5Desc}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={node5CompletionDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>


            <div class="form-group">
              <label for="Mentor">Mentor</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              name="Date"
              label="Date"
              id="Date"
              autoComplete="Date"
            />
            <Modal.Footer>
              <Button
                type="submit"
                variant="primary"
                className={classes.submit}
              >
                Submit Quest
          </Button>
            </Modal.Footer>
          </Modal.Body>

        </form>
      </Modal>




    </>
  )
}