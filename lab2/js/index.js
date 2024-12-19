'use strict';

const fs = require('fs');
const calculate = require('./calculate');

const filePath = process.argv[2];
const historyPath = 'history.txt';

if (!filePath) {
  console.error('Please specify the path to the input file.');
  process.exit(1);
}

try {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const expressions = fileContent.trim().split('\n');
  
  let historyContent = '';
  let lastExampleNumber = 0;

  if (fs.existsSync(historyPath)) {
    historyContent = fs.readFileSync(historyPath, 'utf8');
    const lastExampleMatch = historyContent.match(/Example (\d+):/g);
    
    if (lastExampleMatch) {
      lastExampleNumber = Math.max(...lastExampleMatch.map(entry => parseInt(entry.match(/\d+/)[0])));
    }
  }

  let exampleNumber = lastExampleNumber + 1;

  expressions.forEach((expression) => {
    const trimmedExpression = expression.trim();

    const result = calculate(trimmedExpression);
    console.log(`Example ${exampleNumber}: ${trimmedExpression} ${result}`);

    const historyEntry = `Example ${exampleNumber}: ${trimmedExpression} ${result}\n`;
    fs.appendFileSync(historyPath, historyEntry);

    exampleNumber++;
  });

} catch (error) {
  console.error(`An error occurred: ${error.message}`);
  process.exit(1);
}