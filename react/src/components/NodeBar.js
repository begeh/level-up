import React from 'react';
import { Grid, Stepper, Step, StepLabel, Hidden, Tooltip } from '@material-ui/core';

export default function NodeBar({ nodes, handleNode }) {
  return (
    <Grid item xs={12}>
      <Stepper >
        {nodes.map((node, index) => {

          return (
            <Tooltip title={node.title} arrow placement="bottom">
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