import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (<div>
    <p className='f3'>
      {'Let\'s detect faces in an image. Give it a try!!'}
    </p>
    <div className='center'>
      <div className='form center w-40 pa4 br3 shadow-5'>
        <input className='b pa2 input-reset ba b--white hover-black w-100' type='tex' onChange={onInputChange}/>
        <button
          className='w-30 grow f4 center link ph3 pv2 dib black bg-light-green'
          onClick={onButtonSubmit}
        >Detect
        </button>
      </div>
    </div>
  </div>);
}

export default ImageLinkForm;