import React from 'react';
import HallListItem from './HallListItem';

export default function HallList(props){
  
  return (
    <div>
      {
        props.quests.map((quest, index) => (
          <HallListItem title={quest.quest.title} id={quest.quest.id} nodes={quest.nodes.sort((a,b)=>a.id - b.id)} index={index} handleClick={props.handleClick} mentor_id={quest.quest.mentor_id} user_id={quest.quest.user_id} status={quest.quest.status}/>
        ))
      }
    </div>
  )
}