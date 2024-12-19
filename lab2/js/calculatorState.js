'use strict';

class CalculatorState {
  constructor() {
    this.screen = 0;
    this.firstNumber = null;
    this.op = null;
    this.startSecondNumber = false;
    this.values = [];
  }

  addValue(value) {
    this.values.push(value);
  }
}

module.exports = CalculatorState;