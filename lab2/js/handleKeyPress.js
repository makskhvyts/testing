'use strict';

const handleKeyPress = (state, key) => {
  if (key >= "0" && key <= "9") {
    const digit = parseInt(key, 10);
    if (state.startSecondNumber) {
      state.screen = digit;         
      state.startSecondNumber = false;
    } else {
      state.screen = state.screen * 10 + digit; 
    };
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    state.firstNumber = state.screen;  
    state.op = key;                    
    state.startSecondNumber = true;    
  } else if (key === "=") {
    if (state.op && state.firstNumber !== null) {
      switch (state.op) {
        case "+":
          state.screen = state.firstNumber + state.screen;
          break;
        case "-":
          state.screen = state.firstNumber - state.screen;
          break;
        case "*":
          state.screen = state.firstNumber * state.screen;
          break;
        case "/":
          if (state.screen === 0) throw new Error('Cannot divide by zero.');
          state.screen = Math.floor(state.firstNumber / state.screen); 
          break;
      };
      state.firstNumber = null; 
      state.op = null;
    };
  };
};

module.exports = handleKeyPress;
