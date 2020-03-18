import React from 'react';
import QuestListItem from './QuestListItem';
import CreatePostBtn from '../components/CreatePostBtn'


export default function QuestList({posts, comments, handleClick}){
  return (
    <div>
      {
        posts.map((post, index) => (
          <QuestListItem title={post.title} created_at={post.created_at} symbol={post.symbol} index={index} id={post.id} handleClick={handleClick} post={post} comments={comments}/>
        ))
      }

      <CreatePostBtn />

    </div>
  )
}