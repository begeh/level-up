import React from 'react';
import { Grid, Avatar} from '@material-ui/core';

export default function CommentListItem ({ username, avatar, created_at, text }) {
  return (
    <Grid container className='comment-post' >
      <p className='delete-comment'>X</p>
      <Grid item xs={4} sm={4} md={3} lg={2} >
        <Avatar src="https://ih0.redbubble.net/image.539207575.3366/flat,128x128,075,t-pad,128x128,f8f8f8.u2.jpg" alt='User Avatar' />
      </Grid>
      <Grid item xs={8} sm={8} md={9} lg={10} className='comment-right'>
        <p>UserName: {username}</p>
        <p>Date Posted: {(new Date(created_at)).toLocaleDateString()}</p>
        <p className='comment-description'>Comment: {text}</p>
      </Grid>
    </Grid>
  )
}