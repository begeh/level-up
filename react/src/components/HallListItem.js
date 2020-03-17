import React from 'react';
import {Grid, Stepper, Step, StepLabel, Hidden, Link} from '@material-ui/core';


export default function HallListItem({title, nodes, handleClick}){

  return (
    <Link onClick={handleClick} href="">
    <div>
      <h3>{title}</h3>
      <p>{nodes.length}</p>
      <Stepper >
        {nodes.map((node, index) => {
  
          return (
            <Step key={index} >
              <StepLabel className={node['is_complete?'] ? 'completed-node' : 'uncompleted-node'} />
            </Step>
          );
        })}
      </Stepper>
    </div>
    </Link>
  )
}