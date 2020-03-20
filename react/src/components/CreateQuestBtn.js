import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {TextField, Grid} from '@material-ui/core';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';





export default function CreateQuestBtn() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Date Handlers
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = date => {
    setSelectedDate(date);
  };

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
        <form noValidate>
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
                  value={selectedDate}
                  onChange={handleDateChange}
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
                  value={selectedDate}
                  onChange={handleDateChange}
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
                  value={selectedDate}
                  onChange={handleDateChange}
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
                  value={selectedDate}
                  onChange={handleDateChange}
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
                  value={selectedDate}
                  onChange={handleDateChange}
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