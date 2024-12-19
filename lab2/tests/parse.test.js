'use strict';

const parse = require('../js/parser');

describe('parse function', () => {
  test('correctly parses valid input', () => {
    expect(parse('1 + 2 = 3')).toEqual(['1', '+', '2', '=', '3']);
  });

  test('returns an empty array when input is an empty string', () => {
    expect(parse('')).toEqual([]);
  });

  test('throws an error for missing spaces between tokens', () => {
    expect(() => parse('1+2=3')).toThrow('Invalid character detected.');
  });

  test('throws an error for invalid characters', () => {
    expect(() => parse('1 + $ 2')).toThrow('Invalid character detected.');
  });

  test('throws an error for multiple equal signs', () => {
    expect(() => parse('1 = 2 = 3')).toThrow('Multiple "=" signs are not allowed.');
  });

  test('correctly parses a valid input with multiple functions', () => {
    expect(parse('sqrt 16 + log 10 = 20')).toEqual(['sqrt', '16', '+', 'log', '10', '=', '20']);
  });

  test('throws an error for missing space between function and argument (e.g., sqrt16)', () => {
    expect(() => parse('sqrt16')).toThrow('Invalid character detected.');
  });

  test('correctly parses a complex expression with multiple functions and operators', () => {
    expect(parse('sin 30 + cos 45 = 1')).toEqual(['sin', '30', '+', 'cos', '45', '=', '1']);
  });
});