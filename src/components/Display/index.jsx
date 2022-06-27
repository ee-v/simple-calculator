import React from 'react';
import './style.css';

export default function Display(props) {
  return (
    <div className='display'>
      <div className='display-formula'>
        <p id='formula'>{props.formula}</p>
      </div>
      <div className='display-input'>
        <p id='display'>{props.input}</p>
      </div>
    </div>
  );
};