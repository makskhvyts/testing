const assert = require('assert');
const calculate = require('../js/calculate');

describe('Randomized Testing', () => {
  const operators = ['+', '-', '*', '/'];

  function getRandomExpression() {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100) || 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];
    return `${num1} ${operator} ${num2} =`;
  }

  it('should handle random valid expressions', () => {
    for (let i = 0; i < 1000; i++) {
      const expr = getRandomExpression();
      const expected = eval(expr.replace('=', ''));
      const result = calculate(expr);
      assert.strictEqual(result, expected, `Failed on expression: ${expr}`);
    }
  });

  it('should handle random expressions with large numbers', () => {
    for (let i = 0; i < 1000; i++) {
      const num1 = Math.floor(Math.random() * 10000);
      const num2 = Math.floor(Math.random() * 10000) || 1;
      const operator = operators[Math.floor(Math.random() * operators.length)];
      const expr = `${num1} ${operator} ${num2} =`;
      const expected = eval(expr.replace('=', ''));
      const result = calculate(expr);
      assert.strictEqual(result, expected, `Failed on expression: ${expr}`);
    }
  });

  it('should handle random negative numbers', () => {
    for (let i = 0; i < 1000; i++) {
      const num1 = Math.floor(Math.random() * 100) * (Math.random() < 0.5 ? -1 : 1);
      const num2 = Math.floor(Math.random() * 100) * (Math.random() < 0.5 ? -1 : 1) || 1;
      const operator = operators[Math.floor(Math.random() * operators.length)];
      const expr = `${num1} ${operator} ${num2} =`;
      const expected = eval(expr.replace('=', ''));
      const result = calculate(expr);
      assert.strictEqual(result, expected, `Failed on expression: ${expr}`);
    }
  });

  it('should handle random division by zero gracefully', () => {
    for (let i = 0; i < 1000; i++) {
      const num1 = Math.floor(Math.random() * 100);
      const operator = '/';
      const num2 = 0;
      const expr = `${num1} ${operator} ${num2} =`;
      const expected = "Error: Division by zero"; 
      const result = calculate(expr);
      assert.strictEqual(result, expected, `Failed on expression: ${expr}`);
    }
  });

  it('should handle random multi-digit numbers', () => {
    for (let i = 0; i < 1000; i++) {
      const num1 = Math.floor(Math.random() * 9000) + 1000;
      const num2 = Math.floor(Math.random() * 9000) + 1000;
      const operator = operators[Math.floor(Math.random() * operators.length)];
      const expr = `${num1} ${operator} ${num2} =`;
      const expected = eval(expr.replace('=', ''));
      const result = calculate(expr);
      assert.strictEqual(result, expected, `Failed on expression: ${expr}`);
    }
  });

  it('should handle random addition of zero', () => {
    for (let i = 0; i < 1000; i++) {
      const num1 = Math.floor(Math.random() * 100);
      const num2 = 0;
      const operator = '+';
      const expr = `${num1} ${operator} ${num2} =`;
      const expected = num1 + num2;
      const result = calculate(expr);
      assert.strictEqual(result, expected, `Failed on expression: ${expr}`);
    }
  });

  it('should handle random subtraction resulting in negative numbers', () => {
    for (let i = 0; i < 1000; i++) {
      const num1 = Math.floor(Math.random() * 100);
      const num2 = Math.floor(Math.random() * 100) + num1;
      const operator = '-';
      const expr = `${num1} ${operator} ${num2} =`;
      const expected = num1 - num2;
      const result = calculate(expr);
      assert.strictEqual(result, expected, `Failed on expression: ${expr}`);
    }
  });
});