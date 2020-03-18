import React from 'react';
import QuestListItem from './QuestListItem';
import CreatePostBtn from '../components/CreatePostBtn'


export default function QuestList({posts, handleClick}){
  return (
    <div>
      {
        posts.map((post, index) => (
          <QuestListItem title={post.title} created_at={post.created_at} symbol={post.symbol} index={index} handleClick={handleClick} />
        ))
      }

      <CreatePostBtn />

    </div>
  )
}