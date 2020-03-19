import React from 'react';  
import sword from '../images/sword.png'
import book from '../images/book.png'
import question from '../images/question.png'
import comment from '../images/comment.png';
import { Grid } from '@material-ui/core';
import {useHistory, Link} from "react-router-dom";

export default function QuestListItem({title, created_at, symbol, id, handleClick, post, comments}) {

  const comment_count= comments.flat().filter(comment=> post.id === comment.post_id).length

  let post_symbol = null;

  if(symbol === "sword"){
    post_symbol = sword;
  } else if(symbol === "question"){
    post_symbol = question;
  } else{
    post_symbol = book;
  }

  return (
    <Link onClick={(event)=> {
      event.preventDefault();
      return handleClick(id, post)}}>
    <Grid className='post-container' container>
      <Grid item xs={4} sm={4} md={3} lg={2} >
      <img src={post_symbol} alt={title} width="120" height="120"/>
      </Grid>
      <Grid item className='post-detail' xs={8} sm={8} md={9} lg={10}>
      <h3>{title}</h3>
      <p>Created at: {(new Date(created_at)).toLocaleDateString()}</p>
        <Grid item className='comment-container'>
          <p>{comment_count}</p>
          <img src={comment} alt='comment symbol' width='20px' height='20px' />
        </Grid>
      </Grid>
    </Grid>
    </Link>
  )
}