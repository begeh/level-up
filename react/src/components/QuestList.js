import React from 'react';
import QuestListItem from './QuestListItem';
import CreatePostBtn from '../components/CreatePostBtn'


export default function QuestList({posts, handleClick}){
  return (
    <div>
      {
        posts.map((post, index) => (
          <QuestListItem title={post.title} date={post.date} symbol={post.symbol} comment_count={post.comment_count} index={index} handleClick={handleClick} />
        ))
      }

      <CreatePostBtn />

    </div>
  )
}