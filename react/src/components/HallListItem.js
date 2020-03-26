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
    <div className="hall-quest">
      <div className='hall-border'>
        <Link onClick={(event)=> {
                      event.preventDefault();
                      return handleClick(id, mentor_id, user_id)}} href= "">
        <div>
          <h3 className='hall-title'>{title}</h3>
          <div className={statusClass}>{status}</div>
        </div>
        </Link>
        <Stepper >
          {nodes.map((node, index) => {
    
            return (
              <Tooltip title={node.title} arrow placement="bottom">
                <Step onClick={(event)=> {
                      event.preventDefault();
                      return handleClick(id, mentor_id, user_id, node.id, index)
                    }} key={index} >
                  <StepLabel className={node['is_complete?'] ? 'completed-node' : 'uncompleted-node'} />
                </Step>
              </Tooltip>
            );
          })}
        </Stepper>
      </div>
    </div>
    
  )
}