import React from 'react';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (<div className='ma4 mt0'>
    <div className="logo br2 shadow-2" style={{height: 150, width: 150}}>
      <div className="pa3">
        <img style={{paddingTop: '5px'}} alt='logo' src={brain}/>
      </div>
    </div>
  </div>);
}

export default Logo;
