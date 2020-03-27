import React from 'react'
import { Hidden } from '@material-ui/core';
import wizard from '../images/wizard.png'



export default function Wizard({hobby, clickWizard}) {
  return (
    <Hidden xsDown>
    <div className='wizard-message'>
      <p>Why don't you try learn about {hobby}?</p>
    </div>
    <div onClick={clickWizard} className='wizard'>
      <img src={wizard} alt='wizards' />
    </div>
    </Hidden>
  )
}