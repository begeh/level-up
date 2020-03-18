import React from 'react';  
import sword from '../images/sword.png'
import book from '../images/book.png'
import question from '../images/question.png'
import comment from '../images/comment.png';
import { Grid, Stepper, Step, StepLabel, Hidden } from '@material-ui/core';
import {useHistory, Link} from "react-router-dom";

export default function QuestListItem({title, date, symbol, comment_count, handleClick}) {
  return (
    <Link onClick={handleClick} >
    <Grid className='post-container' container>
      <Grid item xs={4} sm={4} md={3} lg={2} >
      <img src={symbol} alt={title} width="120" height="120"/>
      </Grid>
      <Grid item className='post-detail' xs={8} sm={8} md={9} lg={10}>
      <h3>{title}</h3>
      <p>{date}</p>
        <Grid item className='comment-container'>
          <p>{comment_count}</p>
          <img src={comment} alt='comment symbol' width='20px' height='20px' />
        </Grid>
      </Grid>
    </Grid>
    </Link>
  )
}