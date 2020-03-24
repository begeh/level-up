import React from 'react';
import { Grid } from '@material-ui/core';
import userIcon from '../images/avatar.png'

export default function CommentListItem ({ username, avatar, created_at, text }) {
  return (
    <Grid container className='comment-post' >
      {/* <p className='delete-comment'>X</p> */}
      <Grid item xs={4} sm={4} md={3} lg={2} >
        <img src={userIcon} alt='comment image' />
      </Grid>
      <Grid item xs={8} sm={8} md={9} lg={10} className='comment-right'>
        <p className='delete-comment'>X</p>
        <p>{username}</p>
        <p>{(new Date(created_at)).toLocaleDateString()}</p>
        <p className='comment-description'>{text}</p>
      </Grid>
    </Grid>
  )
}