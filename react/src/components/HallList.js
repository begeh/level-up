import React from 'react';
import HallListItem from './HallListItem';

export default function HallList(props){
  console.log(`Hall List props ${JSON.stringify(props.quests)}`)
  return (
    <div>
      {
        props.quests.map((quest, index) => (
          <HallListItem title={quest.quest.title} id={quest.quest.id} nodes={quest.nodes} index={index} handleClick={props.handleClick}/>
        ))
      }
    </div>
  )
}