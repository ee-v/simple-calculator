import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operation: '',
      input: '0',
      result: null
    };
    this.handleInput = this.handleInput.bind(this);
    this.reset = this.reset.bind(this);
    this.resolve = this.resolve.bind(this);
  };
  handleInput(input) {
    const operation = /[+/*]/;
    const number = /[0-9]/;
    const decimal = /[.]/;
    const subtract = /[-]/;
    if (number.test(input)) {
      this.setState(prevState => {
        if (!!this.state.result) return {
          operation: '',
          input,
          result: null
        };
        if (!decimal.test(prevState.input)) {
          if (prevState.input == 0 && input == 0) return { input: 0 };
          if (prevState.input == 0 && input != 0) return { input };
        }
        if (operation.test(prevState.input) || subtract.test(prevState.input)) return { input };
        return {
          input: prevState.input.concat(input)
        };
      });
    }
    if (decimal.test(input)) {
      this.setState(prevState => {
        if (!!prevState.result) return {
          operation: '',
          input: '0.',
          result: null
        };
        if (decimal.test(prevState.input)) return { input: prevState.input };
        if (operation.test(prevState.input)) return { input: '0.' };
        return {
          input: prevState.input.concat('.')
        }
      });
    }
    if (operation.test(input)) {
      this.setState(prevState => {
        if (this.state.operation == '') {
          return {
            operation: prevState.input.concat(input),
            input
          }
        } else {
          if (!operation.test(prevState.input)) {
            if (!!this.state.result) return {
              operation: prevState.input.concat(input),
              input,
              result: null
            }
            return {
              operation: prevState.operation.concat(prevState.input, input),
              input
            }
          } else {
            return {
              operation: prevState.operation.slice(0, -1).concat(input),
              input
            }
          }
        }
      });
    }
    if (subtract.test(input)) {
      this.setState(prevState => {
        if (!operation.test(prevState.input)) return {
          operation: prevState.operation.concat(prevState.input, '-'),
          input
        }
        return {
          operation: prevState.operation.concat('-'),
          input
        };
      });
    }
  }
  reset = () => {
    this.setState({ operation: '', input: '0', result: null });
  }
  resolve = () => {
    const operation = /[+/*]/;
    if (!!this.state.result) return null;
    this.setState(prevState => {
      if (prevState.input == 0) return { operation: '0', input: '0' };
      let res = 0;
      if (operation.test(prevState.input)) {
        res = eval(prevState.operation.slice(0, -1));
        return {
          operation: `${prevState.operation.slice(0, -1)}=${res}`,
          input: res.toString(),
          result: res.toString()
        }
      }
      res = eval(prevState.operation.concat(prevState.input));
      return {
        operation: prevState.operation.concat(prevState.input, '=', res),
        input: res.toString(),
        result: res.toString()
      }
    });
  }
  render() {
    return (
      <div className='calculator'>
        <div>
          <p id='formula'>{this.state.operation}</p>
          <p id='display'>{this.state.input}</p>
        </div>
        <div>
          <button id='zero' onClick={() => this.handleInput('0')}>0</button>
          <button id='one' onClick={() => this.handleInput('1')}>1</button>
          <button id='two' onClick={() => this.handleInput('2')}>2</button>
          <button id='three' onClick={() => this.handleInput('3')}>3</button>
          <button id='four' onClick={() => this.handleInput('4')}>4</button>
          <button id='five' onClick={() => this.handleInput('5')}>5</button>
          <button id='six' onClick={() => this.handleInput('6')}>6</button>
          <button id='seven' onClick={() => this.handleInput('7')}>7</button>
          <button id='eight' onClick={() => this.handleInput('8')}>8</button>
          <button id='nine' onClick={() => this.handleInput('9')}>9</button>
          <button id='decimal' onClick={() => this.handleInput('.')}>.</button>
        </div>
        <div>
          <button id='add' onClick={() => this.handleInput('+')}>+</button>
          <button id='subtract' onClick={() => this.handleInput('-')}>-</button>
          <button id='multiply' onClick={() => this.handleInput('*')}>x</button>
          <button id='divide' onClick={() => this.handleInput('/')}>/</button>
        </div>
        <div>
          <button id='equals' onClick={this.resolve}>=</button>
          <button id='clear' onClick={this.reset}>AC</button>
        </div>
      </div>
    );
  }
}

export default App;