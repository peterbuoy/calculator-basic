const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (operator, a, b) => {
  if (operator == 'add') return add(a, b);
  if (operator == 'subtract') return subtract(a, b);
  if (operator == 'multiply') return multiply(a, b);
  if (operator == 'divide') return divide(a, b);
  else console.log('Unknown operator');
};