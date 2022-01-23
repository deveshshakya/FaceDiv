import React from 'react';
import './FaceDetector.css';

const FaceDetector = ({imageUrl, boxes}) => {
  const result = [];
  // eslint-disable-next-line array-callback-return
  boxes.forEach((co_ord, index) => {
    result.push(<div key={index} className='bounding-box'
                     style={{
                       top: co_ord.topRow, right: co_ord.rightCol, bottom: co_ord.bottomRow, left: co_ord.leftCol
                     }}/>)
  })

  return (<div className='center ma'>
    <div className='absolute mt2'>
      <img id='input-image' alt='' src={imageUrl} width='500px' height='auto'/>
      <div>
        {result}
      </div>
    </div>
  </div>);
}

export default FaceDetector;