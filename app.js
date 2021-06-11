const DISPLAY_P = document.getElementById('display');
const CLEAR_BUTTON = document.getElementById('button_C');
const DELETE_BUTTON = document.getElementById('button_DEL');
const NUMBER_BUTTONS = document.querySelectorAll('.number > button');
const OP_BUTTONS = document.querySelectorAll('.operator > button');
const EQUAL_BUTTON = document.querySelector('#button_equal');

let displayNum = "0";
let currentNum = "";
let previousNum = "";
let previousOp = "";

const printState = () => {
  console.log('_Variable state_');
  console.log(`previousNum is ${previousNum}`);
  console.log(`currentNum is ${currentNum}`);
  console.log(`previousOp is ${previousOp}`);
  console.log(' ');
}

const updateDisplay = (num) => {
  DISPLAY_P.textContent = num;
}

const clearDisplay = () => {
  displayNum = "0";
  currentNum = "";
  previousNum = "";
  previousOp = "";
  updateDisplay(displayNum);
  console.log('Display Cleared');
  printState();
}

// deletes previously inputted number and ensures display is never completely empty
const deleteLast = () => {
  if (displayNum == "0") return;
  if (currentNum.length == 1 && currentNum != "0") {
    currentNum = "0";
    displayNum = currentNum;
    updateDisplay(displayNum);
  } else {
    currentNum = currentNum.substring(0, currentNum.length - 1);
    displayNum = currentNum;
    updateDisplay(displayNum);
  }
}

const clickNumber = (event) => {
  const buttonValue = event.target.value;
  // prevents adding number to 0
  if (displayNum == "0" || currentNum == "0") {
    console.log('clickNumber set currentNum to empty!');
    currentNum = "";
  }
  currentNum += buttonValue;
  displayNum = currentNum;
  printState();
  updateDisplay(displayNum);
}

const operations = {
  add: (a, b) => Number(a) + Number(b),
  subtract: (a, b) => Number(a) - Number(b),
  multiply: (a, b) => Number(a) * Number(b),
  divide: (a, b) => Number(a) / Number(b)
}

const compute = (event) => {
  console.log('inside compute');
  const opValue = event.target.value;
  console.log(opValue);
  console.log(`previousOp is ${previousOp}`);
  console.log(' ');
  // first operation
  if(previousNum == "") {
    previousNum = currentNum;
    currentNum = "0";
    displayNum = currentNum;
    updateDisplay(currentNum);
    printState();
  // subsequent operations
  } else {
    console.log('inside else');
    console.log(previousOp);
    console.log(previousNum);
    console.log(currentNum);
    previousNum = operations[previousOp](previousNum, currentNum);
    currentNum = "0";
    updateDisplay(previousNum);
    printState();
  }
  previousOp = opValue;
};

const evaluate = (event) => {
  previousNum = operations[previousOp](previousNum, currentNum);
  currentNum = "";
  previousOp = "";
  printState();
  updateDisplay(previousNum);
}

CLEAR_BUTTON.addEventListener('click', clearDisplay);
DELETE_BUTTON.addEventListener('click', deleteLast);
NUMBER_BUTTONS.forEach(button => button.addEventListener('click', clickNumber)); 
OP_BUTTONS.forEach(button => button.addEventListener('click', compute)); 
EQUAL_BUTTON.addEventListener('click', evaluate);
