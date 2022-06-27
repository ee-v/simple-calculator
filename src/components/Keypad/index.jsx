import React from 'react';
import Button from '../Button';
import './style.css';

export default function Keypad(props) {
  return (
    <div className='keypad'>
      <div className='keypad-numbers'>
        <Button id='seven' value={7} function={props.handleInput} />
        <Button id='eight' value={8} function={props.handleInput} />
        <Button id='nine' value={9} function={props.handleInput} />
        <Button id='four' value={4} function={props.handleInput} />
        <Button id='five' value={5} function={props.handleInput} />
        <Button id='six' value={6} function={props.handleInput} />
        <Button id='one' value={1} function={props.handleInput} />
        <Button id='two' value={2} function={props.handleInput} />
        <Button id='three' value={3} function={props.handleInput} />
        <Button id='zero' value={0} className='span-h--2' function={props.handleInput} />
        <Button id='decimal' value='.' function={props.handleInput} />
      </div>
      <div className='keypad-operators'>
        <Button id='divide' value='/' className='btn--dark' function={props.handleInput} />
        <Button id='multiply' value='*' text='x' className='btn--dark' function={props.handleInput} />
        <Button id='subtract' value='-' className='btn--dark' function={props.handleInput} />
        <Button id='add' value='+' className='btn--dark' function={props.handleInput} />
      </div>
      <div className='keypad-func'>
        <Button id='clear' value='AC' function={props.clear} className='span-v--2 btn--red' />
        <Button id='equals' value='=' function={props.resolve} className='span-v--2 btn--green' />
      </div>
    </div>
  );
};