import React, { useState } from 'react'
import { Hidden } from '@material-ui/core';
import wizard from '../images/wizard.png'


export default function Wizard({hobby, clickWizard, element}) {

  const [clicked, setClicked] = useState(false)


  return (
    <Hidden xsDown>
    { clicked ? 
    <div className='wizard-message'>
      <p>Why don't you try to learn {hobby}?</p>
    </div> : null
    }
    <div onClick={async ()=> {
        await clickWizard();
        setClicked(true);
        setTimeout(() =>  setClicked(false), 5000);
        } 
      } id='clickCheck' className='wizard'>
      <img src={wizard} alt='wizards' />
    </div>
    </Hidden>
  )
}