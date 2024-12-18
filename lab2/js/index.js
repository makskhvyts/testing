'use strict';

const fs = require('fs');
const calculate = require('./calculate');

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please specify the path to the input file.');
  process.exit(1);
};

try {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const result = calculate(fileContent);
  console.log(result);
} catch (error) {
  console.error(`An error occurred while reading the file: ${error.message}`);
  process.exit(1);
};      
