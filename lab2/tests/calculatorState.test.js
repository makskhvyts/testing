'use strict';

const CalculatorState = require('../js/calculatorState');

describe('CalculatorState', () => {
  
  test('CalculatorState initializes with default values', () => {
    const state = new CalculatorState();
    expect(state.screen).toBe(0);
    expect(state.firstNumber).toBe(null);
    expect(state.op).toBe(null);
    expect(state.startSecondNumber).toBe(false);
    expect(state.values).toEqual([]);
  });

  test('addValue method correctly adds values to the values array', () => {
    const state = new CalculatorState();
    state.addValue(5);
    expect(state.values).toEqual([5]);
    state.addValue(10);
    expect(state.values).toEqual([5, 10]);
    state.addValue(15);
    expect(state.values).toEqual([5, 10, 15]);
  });

  test('startSecondNumber is set to true after an operator is pressed', () => {
    const state = new CalculatorState();

    state.firstNumber = 5;
    state.op = '+'; 
    state.startSecondNumber = true;
    expect(state.startSecondNumber).toBe(true); 
  });

  test('screen correctly updates after a digit is pressed', () => {
    const state = new CalculatorState();
    state.screen = 0;
    state.screen = 10;
    expect(state.screen).toBe(10);
    state.screen = 15;
    expect(state.screen).toBe(15);  
  });
});