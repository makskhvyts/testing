'use strict';

const parse = require('../js/parser');

describe('parse function', () => {
  test('correctly parses valid input', () => {
    expect(parse('1 + 2 =')).toEqual(['1', '+', '2', '=']);
  });

  test('returns an empty array when input is an empty string', () => {
    expect(parse('')).toEqual([]);
  });

  test('parses a valid input with no operators', () => {
    expect(parse('5 =')).toEqual(['5', '=']);
  });

  test('throws an error for missing spaces between tokens', () => {
    expect(() => parse('1+2=')).toThrow("Incorrect input format. Make sure each character or number is separated by spaces.");
  });

  test('throws an error for invalid characters', () => {
    expect(() => parse('1 + a =')).toThrow('Invalid character detected.');
  });

  test('throws an error for two operators in a row', () => {
    expect(() => parse('1 + * 2 =')).toThrow('Two operators cannot go in a row.');
  });

  test('throws an error when input does not start with a number', () => {
    expect(() => parse('+ 1 =')).toThrow('There must be a number at the beginning of the line.');
  });

  test('throws an error for multiple equal signs', () => {
    expect(() => parse('1 + 2 = =')).toThrow('There can only be one equal sign per line.');
  });

  test('throws an error for numbers after "=" sign', () => {
    expect(() => parse('1 + 2 = 3')).toThrow('No numbers are allowed after the "=" sign.');
  });

  test('throws an error for invalid operator before "=" sign', () => {
    expect(() => parse('1 + = 2')).toThrow('The operator and the "=" sign cannot appear consecutively.');
  });
});