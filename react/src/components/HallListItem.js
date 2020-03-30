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
                      const node_id = null;
                      let index = nodes.findIndex(node => node["is_complete?"] === false);
                      if(index === -1){
                        index = nodes.length - 1;
                      }
                      return handleClick(id, mentor_id, user_id, node_id, index, nodes)}} href= "">
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
                      return handleClick(id, mentor_id, user_id, node.id, index, nodes)
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