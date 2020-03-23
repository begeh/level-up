import React from 'react';
import { Stepper, Step, StepLabel, Tooltip, Link} from '@material-ui/core';
const classNames = require('classnames');



export default function HallListItem({title, id, nodes, handleClick, mentor_id, user_id, status}){
  const statusClass = classNames('status', {
    'status-progress' : status === 'IN PROGRESS',
    'status-success' : status === 'SUCCESS',
    'status-failed' : status === 'FAILED'
  })

  return (
    <Link 
    onClick={(event)=> {
      event.preventDefault();
      return handleClick(id, mentor_id, user_id)}} href=""
    >
    <div>
      <h3 className='hall-title'>{title}</h3>
      <div className={statusClass}>{status}</div>
      <Stepper >
        {nodes.map((node, index) => {
  
          return (
            <Tooltip title={node.title} arrow placement="bottom">
              <Step key={index} >
                <StepLabel className={node['is_complete?'] ? 'completed-node' : 'uncompleted-node'} />
              </Step>
            </Tooltip>
          );
        })}
      </Stepper>
    </div>
    </Link>
  )
}