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

  test('correctly applies sqrt function', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '9');
    handleKeyPress(state, 'sqrt');
    expect(state.screen).toBe(3);
  });
  
  test('correctly applies log function', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '100');
    handleKeyPress(state, 'log');
    expect(state.screen).toBe(2);
  });
  
  test('correctly applies sin function', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '0');
    handleKeyPress(state, 'sin');
    expect(state.screen).toBe(0);
  });
  
  test('correctly applies cos function', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '0');
    handleKeyPress(state, 'cos');
    expect(state.screen).toBe(1);
  });

  test('correctly applies avg function', () => {
    const state = new CalculatorState();
    state.values = [1, 2, 3, 4, 5];
    handleKeyPress(state, 'avg');
    expect(state.screen).toBe(3);
  });
  
  test('correctly applies min function', () => {
    const state = new CalculatorState();
    state.values = [1, 2, 3, 4, 5];
    handleKeyPress(state, 'min');
    expect(state.screen).toBe(1);
  });
  
  test('correctly applies max function', () => {
    const state = new CalculatorState();
    state.values = [1, 2, 3, 4, 5];
    handleKeyPress(state, 'max');
    expect(state.screen).toBe(5);
  });
  
  test('correctly applies med function', () => {
    const state = new CalculatorState();
    state.values = [1, 2, 3, 4, 5];
    handleKeyPress(state, 'med');
    expect(state.screen).toBe(3);
  });
      
  test('correctly displays numbers after operations', () => {
    const state = new CalculatorState();
    handleKeyPress(state, '7');
    handleKeyPress(state, '+');
    handleKeyPress(state, '8');
    handleKeyPress(state, '=');
    expect(state.screen).toBe(15);
  });
});