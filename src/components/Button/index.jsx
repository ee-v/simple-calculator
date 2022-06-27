import React from 'react';
import './style.css';

export default function Button(props) {
  return (
    <button
      className={`btn${props.className ? ' ' + props.className : ''}`}
      id={props.id}
      value={props.value}
      onClick={props.function}
    >
      {props.text ? props.text : props.value}
    </button>
  );
};