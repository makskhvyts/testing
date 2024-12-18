'use strict';

const CalculatorState = require('../js/calculatorState');
const handleKeyPress = require('../js/handleKeyPress');

describe('handleKeyPress function', () => {
  test('correctly handles digit input', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '1');
    expect(state.screen).toBe(1);
    handleKeyPress(state, '2');
    expect(state.screen).toBe(12);
  });

  test('correctly sets operator and first number', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '3');
    handleKeyPress(state, '+');
    expect(state.firstNumber).toBe(3);
    expect(state.op).toBe('+');
    expect(state.startSecondNumber).toBe(true);
  });

  test('calculates result on "="', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '3');
    handleKeyPress(state, '+');
    handleKeyPress(state, '2');
    handleKeyPress(state, '=');
    expect(state.screen).toBe(5);
  });

  test('handles division by flooring the result', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '7');
    handleKeyPress(state, '/');
    handleKeyPress(state, '2');
    handleKeyPress(state, '=');
    expect(state.screen).toBe(3);
  });

  test('handles negative numbers correctly', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '5');
    handleKeyPress(state, '-');
    handleKeyPress(state, '8');
    handleKeyPress(state, '=');
    expect(state.screen).toBe(-3);
  });
  
  test('returns 0 when multiplied by 0', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '5');
    handleKeyPress(state, '*');
    handleKeyPress(state, '0');
    handleKeyPress(state, '=');
    expect(state.screen).toBe(0);
  });

  test('throws an error when divided by 0', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '5');
    handleKeyPress(state, '/');
    handleKeyPress(state, '0');
    expect(() => handleKeyPress(state, '=')).toThrow('Cannot divide by zero.');
  });
});
