const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => Number(a) - Number(b);
const multiply = (a, b) => Number(a) * Number(b);
const divide = (a, b) => Number(a) / Number(b);
const operate = (operator, a, b) => {
  if (operator == '+') return add(a, b);
  if (operator == '-') return subtract(a, b);
  if (operator == '*') return multiply(a, b);
  if (operator == '/') return divide(a, b);
  else console.log(`${operator} is an unknown operator`);
};
console.log(add("5", "6"));
console.log(subtract("5", "7"));
console.log(multiply("5", "3"));

let displayNum = "0";
let initialNum = ""; // maybe call this initialNum?
let currentNum = "";
let accumulator = "";
let previousOp = "";

const printState = () => {
  console.log(`currentNum is ${currentNum}`);
  console.log(`previousOp is ${previousOp}`);
  console.log(`initialNum is ${initialNum}`);
  console.log(`accumulator is ${accumulator}`); 
  console.log(' ');
}


const DISPLAY_P = document.getElementById('display');

/*When you read this comment you should remember the time you made unique event listeners
for every button :)
https://stackoverflow.com/questions/49680484/how-to-add-one-event-listener-for-all-buttons*/

const updateDisplay = () => {
  displayNum = currentNum;
  DISPLAY_P.textContent = displayNum.toString()
}

const clearDisplay = () => {
  initialNum = "";
  currentNum = "";
  accumulator = "";
  previousOp = "";
  currentNum = "";
  updateDisplay();
  console.log('Display Cleared');
  printState();
}

const deleteLast = () => {
  if (displayNum == "0") return;
  if (currentNum.length == 1 && currentNum != "0") {
    currentNum = "0";
    displayNum = currentNum;
    updateDisplay();
    console.log(`currentNum is ${currentNum}`);
  } else {
    currentNum = currentNum.substring(0, currentNum.length - 1);
    displayNum = currentNum;
    updateDisplay();
    console.log(`currentNum is ${currentNum}`);
  }
}

const NUMBER_BUTTONS = document.querySelectorAll('.number > button');
NUMBER_BUTTONS.forEach(button => button.addEventListener('click', event => {
    const buttonValue = event.target.value;
    if (displayNum == "0") currentNum = "";
    //if (accumulator != "") currentNum = "";
    currentNum += buttonValue;
    displayNum = currentNum;
    printState();
    updateDisplay();
  }));

const CLEAR_BUTTON = document.getElementById('button_C');
CLEAR_BUTTON.addEventListener('click', clearDisplay);
const DELETE_BUTTON = document.getElementById('button_DEL');
DELETE_BUTTON.addEventListener('click', deleteLast);

const OP_BUTTONS = document.querySelectorAll('.operator > button');
OP_BUTTONS.forEach(button => button.addEventListener('click', event => {
  const opValue = event.target.value;
  console.log(opValue);
  previousOp = opValue;
  console.log(`previousOp is ${previousOp}`);
  console.log(' ');

  // first operation
  if(initialNum == "") {
    initialNum = currentNum;
    currentNum = "0";
    displayNum = currentNum;
    updateDisplay();
    printState();
  } else {
    console.log('inside else');
    if (accumulator == "") {
      console.log('accumulator is empty');
      accumulator = operate(previousOp, initialNum, currentNum);}
    else {
      console.log('there is an accumulator');
      console.log(`accumulator inside op listener ${accumulator}`); 
      //if(currentNum == "0") currentNum == 1;
      // accumulator = operate(previousOp, accumulator, currentNum).toString();
    }
    console.log(`accumulator inside op listener ${accumulator}`); 
    displayNum = accumulator;
    updateDisplay();
    currentNum = 0;
    printState();
  }
}))

const evaluate = () => {
  console.log('inside evaluate');
  if (accumulator == "") {
    accumulator = operate(previousOp, initialNum, currentNum).toString();
  }
  else {
    accumulator = operate(previousOp, accumulator, currentNum).toString();
  }
  console.log(`accumulator after op ${accumulator}`); 
  console.log(' ');
  currentNum = accumulator;
  updateDisplay();
  currentNum = "0";
  previousOp = "";
  printState();
};

const EQUAL_BUTTON = document.querySelector('#button_equal');
console.log(EQUAL_BUTTON);
EQUAL_BUTTON.addEventListener('click', evaluate);

