const calculate = require('../js/calculate');

describe('Load Tests', () => {
  
  it('should handle large input efficiently', () => {
    const largeInput = Array(10000).fill('3 + 4 =').join('\n');
    const startTime = Date.now();

    const results = largeInput.split('\n').map((expr) => calculate(expr));
    results.forEach((result) => {
      expect(result).toBe(7);
    });

    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(5000);
  });

  it('should handle very large numbers efficiently', () => {
    const largeNumberInput = Array(10000).fill('99999999 * 99999999 =').join('\n');
    const startTime = Date.now();

    const results = largeNumberInput.split('\n').map((expr) => calculate(expr));
    results.forEach((result) => {
      expect(result).toBe(99999999 * 99999999);
    });

    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(5000);
  });

  it('should handle multiple consecutive calls efficiently', () => {
    const startTime = Date.now();

    for (let i = 0; i < 10000; i++) {
      const result = calculate('3 + 4 =');
      expect(result).toBe(7);
    }

    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(3000);
  });

  it('should handle large negative numbers efficiently', () => {
    const largeNegativeInput = Array(10000).fill('-99999999 + 99999999 =').join('\n');
    const startTime = Date.now();

    const results = largeNegativeInput.split('\n').map((expr) => calculate(expr));
    results.forEach((result) => {
      expect(result).toBe(0);
    });

    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(5000);
  });

  it('should handle very large input (with different operations)', () => {
    const veryLargeInput = Array(5000).fill('123456789 + 987654321 =').join('\n');
    const startTime = Date.now();

    const results = veryLargeInput.split('\n').map((expr) => calculate(expr));
    results.forEach((result) => {
      expect(result).toBe(123456789 + 987654321);
    });

    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(6000);
  });

  it('should handle inputs with large string lengths efficiently', () => {
    const longInput = Array(10000).fill('1 + 1 =').join('\n');
    const longStringExpression = '1 + 1 =';
    const startTime = Date.now();

    const results = longInput.split('\n').map((expr) => calculate(longStringExpression));
    results.forEach((result) => {
      expect(result).toBe(2);
    });

    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(3000);
  });

  it('should handle multiple calculations with varying sizes of numbers efficiently', () => {
    const largeInput = Array(10000).fill('123456789 + 987654321 =').join('\n');
    const startTime = Date.now();

    const results = largeInput.split('\n').map((expr) => calculate(expr));
    results.forEach((result) => {
      expect(result).toBe(123456789 + 987654321);
    });

    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(8000);
  });

  it('should handle random calculations efficiently', () => {
    const randomInput = Array(10000)
      .fill(null)
      .map(() => {
        const a = Math.floor(Math.random() * 10000);
        const b = Math.floor(Math.random() * 10000);
        return `${a} + ${b} =`;
      })
      .join('\n');
    const startTime = Date.now();

    const results = randomInput.split('\n').map((expr) => calculate(expr));
    results.forEach((result, index) => {
      const [a, , b] = randomInput.split('\n')[index].split(' ');
      expect(result).toBe(parseInt(a) + parseInt(b));
    });

    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(8000);
  });

  it('should handle a high volume of different operations efficiently', () => {
    const operationInput = Array(10000).fill(null).map((_, index) => {
      if (index % 3 === 0) {
        return '3 + 4 =';
      } else if (index % 3 === 1) {
        return '2 * 8 =';
      } else {
        return '10 / 5 =';
      }
    }).join('\n');
    
    const startTime = Date.now();

    const results = operationInput.split('\n').map((expr) => calculate(expr));
    results.forEach((result, index) => {
      if (index % 3 === 0) expect(result).toBe(7);
      else if (index % 3 === 1) expect(result).toBe(16);
      else expect(result).toBe(2);
    });

    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(10000);
  });
});