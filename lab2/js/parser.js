'use strict';

const parse = (input) => {
  if (input === "") return [];

  const keys = input.trim().split(' ');

  const validKeys = /^[0-9]+$|^[+\-*/=]|^(sqrt|log|sin|cos|avg|min|max|med)$/;
  let lastWasOperator = false;
  let foundEqualSign = false;
  let operatorCount = 0;
  let equalSignCount = 0;

  for (const key of keys) {
    if (!validKeys.test(key)) {
      throw new Error('Invalid character detected.');
    }

    if (/^[+\-*/]$/.test(key)) {
      operatorCount += 1;
      if (operatorCount > 1 || foundEqualSign) {
        throw new Error('Invalid operator usage.');
      }
      if (lastWasOperator) {
        throw new Error('Operator cannot follow another operator.');
      }
      lastWasOperator = true;
    } else if (key === '=') {
      equalSignCount += 1;
      foundEqualSign = true;
      lastWasOperator = false;
    } else {
      lastWasOperator = false;
    }
  }

  if (!foundEqualSign) {
    throw new Error('Missing "=" in the expression.');
  }

  if (equalSignCount > 1) {
    throw new Error('Multiple "=" signs are not allowed.');
  }

  return keys;
};

module.exports = parse;