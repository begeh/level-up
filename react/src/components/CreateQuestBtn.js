import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-final-form'

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


  // Date Handlers
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  let questTitle, questDesc, node1Title, node1Desc, node1CompletionDate,
    node2Title, node2Desc, node2CompletionDate,
    node3Title, node3Desc, node3CompletionDate,
    node4Title, node4Desc, node4CompletionDate,
    node5Title, node5Desc, node5CompletionDate = null

  console.log(props)
  console.log(props.props.email)

  async function handleQuestSubmit(event) {
    event.preventDefault()


    console.log("function is called")

    let quest_package = {
      quest: {
        title: questTitle,
        quest_description: questDesc,
        status: "underway",
        party_id: props.props.party_id,
        user_id: props.props.id
      },
      nodes: {
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
    }

    let quest_info = await axios.post("/create_quest/:package", { quest_package })
      .then((res) => res.data)

    console.log(quest_info)Form

  }

  const MyForm = () => (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Quest
      </Button>

      <Form
      onSubmit={onSubmit}


      <form noValidate onSubmit={handleQuestSubmit} className={classes.form} >
        <Modal show={show} onHide={handleClose}>
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

        </Modal>
      </form>
    </>
  );

  return (MyForm)
}