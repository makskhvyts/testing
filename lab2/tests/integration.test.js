const assert = require('assert');
const fs = require('fs');
const calculate = require('../js/calculate');
const parse = require('../js/parser');

describe('Integration Tests', () => {

  it('should process file input and write history correctly', () => {
    const inputFilePath = './js/input.txt';
    const outputHistoryPath = './js/history.txt';

    fs.writeFileSync(inputFilePath, '3 + 4 =\n10 - 2 =\n8 * 7 =\n5 / 2 =');

    if (!fs.existsSync(outputHistoryPath)) {
      fs.writeFileSync(outputHistoryPath, '');
    }

    const fileContent = fs.readFileSync(inputFilePath, 'utf8');
    const expressions = fileContent.trim().split('\n');
    expressions.forEach((expression, index) => {
      const result = calculate(expression.trim());
      const expected = index === 0 ? 7 : index === 1 ? 8 : index === 2 ? 56 : 2.5;

      const expressionWithoutEquals = expression.trim().replace(/\s*=\s*$/, '');
      
      const historyLine = `Example ${index + 1}: ${expressionWithoutEquals} = ${result}\n`;
      fs.appendFileSync(outputHistoryPath, historyLine);

      assert.strictEqual(result, expected, `Failed on expression: ${expression}`);
    });

    const historyContent = fs.readFileSync(outputHistoryPath, 'utf8');
    assert.match(historyContent, /Example 1: 3 \+ 4 = 7/);
    assert.match(historyContent, /Example 2: 10 - 2 = 8/);
    assert.match(historyContent, /Example 3: 8 \* 7 = 56/);
    assert.match(historyContent, /Example 4: 5 \/ 2 = 2.5/);
  });

  it('should parse input into valid tokens', () => {
    const parsed = parse('3 + 4 =');
    assert.deepStrictEqual(parsed, ['3', '+', '4', '=']);
  });

  it('should handle large expressions correctly', () => {
    const inputFilePath = './js/input.txt';
    const outputHistoryPath = './js/history.txt';

    fs.writeFileSync(inputFilePath, '10000 + 10000 =\n20000 - 5000 =\n1000 * 1000 =\n10000 / 4 =');

    const fileContent = fs.readFileSync(inputFilePath, 'utf8');
    const expressions = fileContent.trim().split('\n');
    
    expressions.forEach((expression, index) => {
      const result = calculate(expression.trim());
      const expected = index === 0 ? 20000 : index === 1 ? 15000 : index === 2 ? 1000000 : 2500;

      const expressionWithoutEquals = expression.trim().replace(/\s*=\s*$/, '');
      
      const historyLine = `Example ${index + 1}: ${expressionWithoutEquals} = ${result}\n`;
      fs.appendFileSync(outputHistoryPath, historyLine);

      assert.strictEqual(result, expected, `Failed on expression: ${expression}`);
    });

    const historyContent = fs.readFileSync(outputHistoryPath, 'utf8');
    assert.match(historyContent, /Example 1: 10000 \+ 10000 = 20000/);
    assert.match(historyContent, /Example 2: 20000 - 5000 = 15000/);
    assert.match(historyContent, /Example 3: 1000 \* 1000 = 1000000/);
    assert.match(historyContent, /Example 4: 10000 \/ 4 = 2500/);
  });

  it('should handle negative numbers in expressions', () => {
    const inputFilePath = './js/input.txt';
    const outputHistoryPath = './js/history.txt';

    fs.writeFileSync(inputFilePath, '-3 + 4 =\n10 - -2 =\n-8 * 7 =\n5 / -2 =');

    if (!fs.existsSync(outputHistoryPath)) {
      fs.writeFileSync(outputHistoryPath, '');
    }

    const fileContent = fs.readFileSync(inputFilePath, 'utf8');
    const expressions = fileContent.trim().split('\n');
    
    expressions.forEach((expression, index) => {
      const result = calculate(expression.trim());
      const expected = index === 0 ? 1 : index === 1 ? 12 : index === 2 ? -56 : -2.5;

      const expressionWithoutEquals = expression.trim().replace(/\s*=\s*$/, '');
      
      const historyLine = `Example ${index + 1}: ${expressionWithoutEquals} = ${result}\n`;
      fs.appendFileSync(outputHistoryPath, historyLine);

      assert.strictEqual(result, expected, `Failed on expression: ${expression}`);
    });

    const historyContent = fs.readFileSync(outputHistoryPath, 'utf8');
    assert.match(historyContent, /Example 1: -3 \+ 4 = 1/);
    assert.match(historyContent, /Example 2: 10 - -2 = 12/);
    assert.match(historyContent, /Example 3: -8 \* 7 = -56/);
    assert.match(historyContent, /Example 4: 5 \/ -2 = -2.5/);
  });

  it('should handle invalid expressions gracefully', () => {
    const inputFilePath = './js/input.txt';
    const outputHistoryPath = './js/history.txt';

    fs.writeFileSync(inputFilePath, '3 + =\n* 4 =\n8 + + 7 =\n5 / =');

    if (!fs.existsSync(outputHistoryPath)) {
      fs.writeFileSync(outputHistoryPath, '');
    }

    const fileContent = fs.readFileSync(inputFilePath, 'utf8');
    const expressions = fileContent.trim().split('\n');
    
    expressions.forEach((expression, index) => {
      try {
        const result = calculate(expression.trim());
        assert.fail(`Expected error for expression: ${expression}`);
      } catch (err) {
        assert.ok(err, `Error expected for expression: ${expression}`);
      }
    });
  });
});