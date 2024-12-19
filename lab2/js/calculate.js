'use strict';

const CalculatorState = require('./calculatorState');
const parse = require('./parser');
const handleKeyPress = require('./handleKeyPress');

const calculate = (input) => {
  const keys = parse(input);
  const state = new CalculatorState();

  for (const key of keys) {
    if (!isNaN(key)) state.addValue(parseFloat(key));
    handleKeyPress(state, key);
  }

  return state.screen;
};

module.exports = calculate;