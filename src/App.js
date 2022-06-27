import React from 'react';
import { extract, lastChar } from './utils/index';

import Display from './components/Display';
import Keypad from './components/Keypad';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      input: '0',
      result: null
    };
    this.handleInput = this.handleInput.bind(this);
    this.clear = this.clear.bind(this);
    this.resolve = this.resolve.bind(this);
  };

  handleInput = (e) => {
    const inputValue = e.target.value;
    const operator = /[+\-*/]/;
    const number = /[0-9]/;
    const decimal = '.';
    const subtract = '-';
    const equal = '=';

    this.setState(prevState => {
      if (prevState.formula == '') {
        if (inputValue == 0) return { formula: '0', input: '0' };
        if (inputValue == decimal) return { formula: '0.', input: '0.' };
        if (operator.test(inputValue)) return { formula: `0${inputValue}`, input: inputValue };
      }
      //Operator
      if (operator.test(inputValue)) {
        const last = lastChar(prevState.formula);
        if (inputValue == subtract && last != subtract) {
          return {
            formula: prevState.formula.concat(subtract),
            input: subtract
          };
        }
        if (operator.test(last) && last != subtract) return { formula: extract(prevState.formula).concat(inputValue), input: inputValue };
        if (last == subtract) {
          const sbtr = extract(prevState.formula);
          if (operator.test(lastChar(sbtr))) return { formula: extract(sbtr).concat(inputValue), input: inputValue };
          return {
            formula: sbtr.concat(inputValue),
            input: inputValue
          };
        }
        const prevNumber = prevState.formula.split(equal);
        const prevResult = prevNumber[prevNumber.length - 1].toString();
        if (prevState.formula.includes(equal)) return { formula: prevResult.concat(inputValue), input: inputValue };
        return {
          formula: prevState.formula.concat(inputValue),
          input: inputValue
        };
      }
      //decimal
      if (inputValue == decimal) {
        if (!prevState.input.includes(decimal)) {
          if (operator.test(prevState.input) && !number.test(prevState.input)) return { formula: prevState.formula.concat('0.'), input: '0.' };
          return {
            formula: prevState.formula.concat(decimal),
            input: prevState.input.concat(decimal)
          }
        }
        return {
          formula: prevState.formula,
          input: prevState.input
        };
      }
      //when user put a zero
      const lastNumber = prevState.formula.split(operator);
      if (lastNumber[lastNumber.length - 1] == '0' && inputValue == 0) return { formula: prevState.formula, input: prevState.input };
      if (lastNumber[lastNumber.length - 1] == '0' && number.test(inputValue) && inputValue != 0) {
        return { formula: extract(prevState.formula).concat(inputValue), input: inputValue };
      }
      if (prevState.input == 0 && prevState.formula == 0) return { formula: inputValue, input: inputValue };
      if (operator.test(prevState.input) && number.test(inputValue)) return { formula: prevState.formula.concat(inputValue), input: inputValue };
      // start a new operation with previous result
      if (prevState.result != null) return { formula: '', input: inputValue, result: null };
      return {
        formula: prevState.formula.concat(inputValue),
        input: prevState.input.concat(inputValue)
      };
    });
  };

  clear = () => {
    this.setState({
      formula: '',
      input: '0',
      result: null
    });
  };

  resolve = () => {
    this.setState((prevState) => {
      const res = eval(prevState.formula);
      return {
        formula: prevState.formula.concat('=', res),
        input: res,
        result: res
      };
    });
  };

  render() {
    return (
      <div className='calculator'>
        <Display formula={this.state.formula} input={this.state.input} />
        <Keypad handleInput={this.handleInput} clear={this.clear} resolve={this.resolve} />
      </div>
    );
  };
}

export default App;