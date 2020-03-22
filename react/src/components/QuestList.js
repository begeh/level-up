import React from 'react';
import QuestListItem from './QuestListItem';
import CreatePostBtn from '../components/CreatePostBtn'
import { GridList, GridListTile } from '@material-ui/core';



export default function QuestList({posts, comments, handleClick}){
  return (
    <div>
      <GridList cellHeight={160} cols={3}>
      {
        posts.map((post, index) => (
          <GridListTile cols={3}>
            <QuestListItem title={post.title} created_at={post.created_at} symbol={post.symbol_ref} index={index} id={post.id} handleClick={handleClick} post={post} comments={comments}/>
          </GridListTile>
        ))
      }
      </GridList>
    </div>
  )
}