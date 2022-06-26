import React from 'react';

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
  };

  extract = (formula) => {
    return formula.slice(0, -1);
  };

  lastChar = (formula) => {
    return formula[formula.length - 1];
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
      // start a new operation with previous result
      if (operator.test(inputValue)) {
        const last = this.lastChar(prevState.formula);
        if (inputValue == subtract && last != subtract) {
          return {
            formula: prevState.formula.concat(subtract),
            input: subtract
          };
        }
        if (operator.test(last) && last != subtract) return { formula: this.extract(prevState.formula).concat(inputValue), input: inputValue };
        if (last == subtract) {
          const sbtr = this.extract(prevState.formula);
          if (operator.test(this.lastChar(sbtr))) return { formula: this.extract(sbtr).concat(inputValue), input: inputValue };
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
        return { formula: this.extract(prevState.formula).concat(inputValue), input: inputValue };
      }
      if (prevState.input == 0 && prevState.formula == 0) return { formula: inputValue, input: inputValue };
      if (operator.test(prevState.input) && number.test(inputValue)) return { formula: prevState.formula.concat(inputValue), input: inputValue };
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
        input: res
      };
    });
  };

  render() {
    return (
      <div className='calculator'>
        <div>
          <p id='formula'>{this.state.formula}</p>
          <p id='display'>{this.state.input}</p>
        </div>
        <div>
          <button id='decimal' value={'.'} onClick={this.handleInput}>.</button>
          <button id='zero' value={0} onClick={this.handleInput}>0</button>
          <button id='one' value={1} onClick={this.handleInput}>1</button>
          <button id='two' value={2} onClick={this.handleInput}>2</button>
          <button id='three' value={3} onClick={this.handleInput}>3</button>
          <button id='four' value={4} onClick={this.handleInput}>4</button>
          <button id='five' value={5} onClick={this.handleInput}>5</button>
          <button id='six' value={6} onClick={this.handleInput}>6</button>
          <button id='seven' value={7} onClick={this.handleInput}>7</button>
          <button id='eight' value={8} onClick={this.handleInput}>8</button>
          <button id='nine' value={9} onClick={this.handleInput}>9</button>
        </div>
        <div>
          <button id='add' value={'+'} onClick={this.handleInput}>+</button>
          <button id='subtract' value={'-'} onClick={this.handleInput}>-</button>
          <button id='multiply' value={'*'} onClick={this.handleInput}>x</button>
          <button id='divide' value={'/'} onClick={this.handleInput}>/</button>
        </div>
        <div>
          <button id='equals' onClick={this.resolve}>=</button>
          <button id='clear' onClick={this.clear}>AC</button>
        </div>
      </div>
    );
  };
}

export default App;