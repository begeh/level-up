import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import NavForApp from "../components/NavForApp";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(50),
    height: theme.spacing(50),
  }
}));

const achievements = [
  {
    title: 'The Great Novigrad Heist',
    start_date: '10 June',
    end_date: '11 June',
    status: 'success'
  },
  {
    title: 'The Great Novigrad Heist',
    start_date: '10 June',
    end_date: '11 June',
    status: 'fail'
  },
  {
    title: 'The Great Novigrad Heist',
    start_date: '10 June',
    end_date: '11 June',
    status: 'in-progress'
  }
]

const HistoryMock = () => {
  return (
  <div>
    <button>Go Back</button>
    <p>Success</p>
    <p>Your Story</p>

  </div>
  )
}

export default function SignIn() {
  const classes = useStyles();
  let history=useHistory();
  return (
    <>
    <NavForApp nav_title="LEGACY" />
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={6} md={6}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="https://img.favpng.com/2/14/7/accelerated-mobile-pages-one-call-away-responsive-web-design-non-governmental-organisation-png-favpng-kpXLYqN4PqkrrtxZxiZa8FLCW.jpg"/>
        <Typography component="h1" variant="h4">
          Your Legacy
        </Typography>
        <Typography component="h1" variant="h6">
         TITLE: Paladin
        </Typography>
      </div>
   </Grid>
   <Grid item xs={false} sm={6} md={6}>
      <button onClick={()=>history.push("/legacy/history")}>Go Back</button>
      {/* <HistoryMock /> */}
      {
      achievements.map((achievement, index) => (
      <div>
        <p>{achievement.title}</p>
        <p>{achievement.start_date}-{achievement.end_date}</p>
        <p>{achievement.status}</p>
      </div>
    ))}
    </Grid>
   </Grid>
   </>
  );
}
