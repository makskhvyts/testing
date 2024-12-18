'use strict';

const CalculatorState = require('../js/calculatorState');

test('CalculatorState initializes with default values', () => {
  const state = new CalculatorState();
  expect(state.screen).toBe(0);
  expect(state.firstNumber).toBe(null);
  expect(state.op).toBe(null);
  expect(state.startSecondNumber).toBe(false);
});
