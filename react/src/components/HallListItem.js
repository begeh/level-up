import React from 'react';
import {Grid, Stepper, Step, StepLabel, Hidden, Link} from '@material-ui/core';


export default function HallListItem({title, id, nodes, handleClick, mentor_id, user_id}){

  return (
    <Link 
    onClick={(event)=> {
      event.preventDefault();
      return handleClick(id, mentor_id, user_id)}} href=""
    >
    <div>
      <h3 className='hall-title'>Quest Title: {title}</h3>
      <Stepper >
        {nodes.map((node, index) => {
  
          return (
            <Step key={index} >
              <p>{node.title}</p>
              <StepLabel className={node['is_complete?'] ? 'completed-node' : 'uncompleted-node'} />
            </Step>
          );
        })}
      </Stepper>
    </div>
    </Link>
  )
}