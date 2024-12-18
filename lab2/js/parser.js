'use strict';

const parse = (input) => {
  if (input === "") return [];

  const keys = input.trim().split(' ');

  const validKeys = /^[0-9]+$|^[+\-*/=]$/;
  let lastWasOperator = false;
  let foundEqualSign = false;
  let operatorCount = 0; 
  let equalSignCount = 0; 

  for (const key of keys) {
    if (key.length > 1) {
      throw new Error('Incorrect input format. Make sure each character or number is separated by spaces.');
    };
    if (!validKeys.test(key)) {
      throw new Error('Invalid character detected.');
    };
    if (!/^\d+$/.test(keys[0])) {
      throw new Error('There must be a number at the beginning of the line.');
    };
    if (/^[+\-*/]$/.test(key)) {
      if (lastWasOperator) {
        throw new Error('Two operators cannot go in a row.');
      };
      operatorCount += 1;
      if (operatorCount > 1) {
        throw new Error('There can only be one arithmetic operator per line.');
      };
      if (foundEqualSign) {
        throw new Error('No arithmetic operators are allowed after the "=" sign.');
      };
      lastWasOperator = true;
    } else if (key === '=') {
      if (lastWasOperator) {
        throw new Error('The operator and the "=" sign cannot appear consecutively.');
      };
      equalSignCount += 1;
      if (equalSignCount > 1) {
        throw new Error('There can only be one equal sign per line.');
      };
      foundEqualSign = true;
      lastWasOperator = false;
    } else {
      if (foundEqualSign) {
        throw new Error('No numbers are allowed after the "=" sign.');
      };
      lastWasOperator = false;
    };
  };
  return keys;
};

module.exports = parse;
