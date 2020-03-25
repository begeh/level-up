import React from 'react';
import { Grid, Stepper, Step, StepLabel, Tooltip } from '@material-ui/core';

export default function NodeBar({ nodes, handleNode }) {
  
  return (
    <Grid item xs={12}>
      <Stepper id='stepper-design'>
        {nodes.map((node, index) => {
          const nodeInfo = `${node.title} (${(new Date(node.complete_by)).toLocaleDateString()})`;

          return (
            <Tooltip title={nodeInfo} arrow placement="bottom">
              <Step onClick={(event) => {
                event.preventDefault()
                return handleNode(node.id)
              }}
                key={index} >
                <StepLabel className={node["is_complete?"] ? 'completed-node' : 'uncompleted-node'} />
              </Step>
            </Tooltip>
          );
        })}
      </Stepper>
    </Grid>
  )
}