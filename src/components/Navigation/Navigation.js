import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
  if (isSignedIn) {
    return (<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onRouteChange('sign-in')} className='f3 link dim black pr3 underline pa3 pointer ma0-l'>Sign
        Out</p>
    </nav>);
  } else {
    return (<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onRouteChange('sign-in')}
         className='f3 link dim black underline pa3 pointer ma0'>Sign In</p>
      <p onClick={() => onRouteChange('register')}
         className='f3 link dim black underline pa3 pointer ma0'>Register</p>
    </nav>);
  }
}

export default Navigation;