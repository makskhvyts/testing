'use strict';

const calculate = require('../js/calculate');

describe('calculate function', () => {
  test('correctly computes addition', () => {
    expect(calculate('3 + 2 =')).toBe(5);
  });

  test('correctly computes subtraction', () => {
    expect(calculate('5 - 2 =')).toBe(3);
  });

  test('correctly calculates expressions with negative results', () => {
    expect(calculate('5 - 9 =')).toBe(-4);
  });

  test('correctly computes multiplication', () => {
    expect(calculate('4 * 3 =')).toBe(12);
  });

  test('correctly computes division', () => {
    expect(calculate('7 / 2 =')).toBe(3);
  })

  test('correctly computes division with floor', () => {
    expect(calculate('4 / 4 =')).toBe(1);
  });

  test('throws error for invalid input', () => {
    expect(() => calculate('3 + =')).toThrow();
  });
});
