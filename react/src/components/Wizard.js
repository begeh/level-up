import React from 'react'
import { Hidden } from '@material-ui/core';
import wizard from '../images/wizard.png'



export default function Wizard() {
  return (
    <Hidden xsDown>
    <div className='wizard-message'>
      <p>Why don't you try learning kayaking?</p>
    </div>
    <div className='wizard'>
      <img src={wizard} alt='wizards' />
    </div>
    </Hidden>
  )
}