'use strict';

const mathFunctions = {
  sqrt: (x) => Math.sqrt(x),
  log: (x) => Math.log10(x),
  sin: (x) => Math.sin(x),
  cos: (x) => Math.cos(x),
};

const statisticsFunctions = {
  avg: (arr) => arr.reduce((sum, val) => sum + val, 0) / arr.length,
  min: (arr) => Math.min(...arr),
  max: (arr) => Math.max(...arr),
  med: (arr) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  },
};

const handleKeyPress = (state, key) => {
  if (!isNaN(key)) {
    const digit = parseInt(key, 10);

    if (state.lastFunctionUsed) {
      state.screen = 'Error: Invalid expression';
      state.lastFunctionUsed = null;
    } else if (state.startSecondNumber) {
      state.screen = digit;
      state.startSecondNumber = false;
    } else {
      state.screen = state.screen * 10 + digit;
    }
  } else if (['+', '-', '*', '/'].includes(key)) {
    if (state.screen === '' || state.startSecondNumber) {
      state.screen = 'Error: Invalid expression';
    } else {
      state.firstNumber = state.screen;
      state.op = key;
      state.startSecondNumber = true;
      state.lastFunctionUsed = null;
    }
  } else if (key === '=') {
    if (state.op && state.firstNumber !== null) {
      if (state.op === '/' && state.screen === 0) {
        state.screen = 'Error: Division by zero';
      } else if (state.startSecondNumber && state.firstNumber !== null) {
        state.screen = state.firstNumber;
      } else {
        try {
          state.screen = eval(`${state.firstNumber} ${state.op} ${state.screen}`);
        } catch (e) {
          state.screen = 'Error: Invalid expression';
        }
      }
      state.firstNumber = null;
      state.op = null;
      state.startSecondNumber = false;
    } else if (state.firstNumber !== null) {
      state.screen = state.firstNumber;
    }
    state.lastFunctionUsed = null;
  } else if (mathFunctions[key]) {
    if (state.lastFunctionUsed) {
      state.screen = 'Error: Invalid expression';
    } else {
      state.screen = mathFunctions[key](state.screen);
      state.lastFunctionUsed = key;
    }
  } else if (statisticsFunctions[key]) {
    if (state.lastFunctionUsed) {
      state.screen = 'Error: Invalid expression';
    } else if (state.values && state.values.length > 0) {
      state.screen = statisticsFunctions[key](state.values);
      state.values = [];
      state.lastFunctionUsed = key;
    } else {
      state.screen = 'Error: Invalid expression';
    }
  } else {
    state.screen = `Error: Unsupported key: ${key}`;
  }
};

module.exports = handleKeyPress;