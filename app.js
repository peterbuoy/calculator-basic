const DISPLAY_P = document.getElementById('display');
const CLEAR_BUTTON = document.getElementById('button_C');
const DELETE_BUTTON = document.getElementById('button_DEL');
const NUMBER_BUTTONS = document.querySelectorAll('.number > button');
const OP_BUTTONS = document.querySelectorAll('.operator > button');
const EQUAL_BUTTON = document.querySelector('#button_equal');
const DECIMAL_BUTTON = document.querySelector('#button_decimal');
const ALL_BUTTONS = document.querySelectorAll('button')

OP_BUTTONS.forEach(button => button.disabled = true);
EQUAL_BUTTON.disabled = true;
let currentNum = "";
let previousNum = "";
let previousOp = "";

const printState = () => {
  console.log('_Variable state_');
  console.log(`currentNum is ${currentNum}`);
  console.log(`previousNum is ${previousNum}`);
  console.log(`previousOp is ${previousOp}`);
  console.log(' ');
}

const updateDisplay = (num) => {
  DISPLAY_P.textContent = num;
}

const roundResult = (result) => {
  let maxDisplayLength = 15;
  if (result.length > 15) {
    console.log('rounding since num is too large for display');
    result = result.substring(0, maxDisplayLength);
    console.log(result);
  }
  return result;
}

const clearDisplay = () => {
  currentNum = "";
  previousNum = "";
  previousOp = "";
  updateDisplay("0");
  ALL_BUTTONS.forEach(button => button.disabled = false);
  disableOpsAndEquals();
  console.log('Display Cleared');
  printState();
}

// deletes previously inputted number and ensures display is never completely empty
const deleteLast = () => {
  if (currentNum.length == 1 || currentNum == "") {
    currentNum = ""
    updateDisplay("0");
    printState();
  } else {
    currentNum = currentNum.substring(0, currentNum.length - 1);
    updateDisplay(currentNum);
    printState();
  }
}

const clickNumber = (event) => {
  const buttonValue = event.target.value;
  if ((DISPLAY_P.textContent.includes(".") && buttonValue == ".")) {
    alert('Please enter decimals in valid areas.');
    return;
  }
  currentNum += buttonValue;
  updateDisplay(currentNum);
  printState();
}

const operations = {
  add: (a, b) => parseFloat(Number(a) + Number(b)),
  subtract: (a, b) => parseFloat(Number(a) - Number(b)),
  multiply: (a, b) => parseFloat(Number(a) * Number(b)),
  divide: (a, b) => {
    if (Number(b) == 0) {
      alert("Can't divide by zero!")
      clearDisplay();
      return;
    };
    return parseFloat(Number(a) / Number(b));
  }
}

const roundNum = (num) => {
  let numStr = num.toString();
  console.log(`numStr is ${numStr}`);
  if (numStr.length > 15) num = parseFloat(numStr.substring(0, 16));
  return num;
}

const compute = (event) => {
  const opValue = event.target.value;
  console.log(opValue);
  // first operation
  if(previousNum == "") {
    previousNum = currentNum;
    currentNum = "";
    updateDisplay("0");
    printState();
  // subsequent operations
  } else {
    previousNum = roundNum(operations[previousOp](previousNum, currentNum));
    currentNum = "";
    updateDisplay(previousNum);
    printState();
  }
  previousOp = opValue;
};

const evaluate = () => {
  currentNum = roundNum(operations[previousOp](previousNum, currentNum));
  previousNum = "";
  previousOp = "";
  updateDisplay(currentNum);
  printState();
}

const disableEqualsAndNumbers = () => {
  EQUAL_BUTTON.disabled = true;
  NUMBER_BUTTONS.forEach(button => button.disabled = true);
}

const disableOpsAndEquals = () => {
  EQUAL_BUTTON.disabled = true;
  OP_BUTTONS.forEach(button => button.disabled = true);
}

// const disableDecimal = () => {
//   DECIMAL_BUTTON.disabled = true;
// }

const enableOpsAndEquals = () => {
  EQUAL_BUTTON.disabled = false;
  OP_BUTTONS.forEach(button => button.disabled = false);
}

const enableNums = () => {
  NUMBER_BUTTONS.forEach(button => button.disabled = false);
}

CLEAR_BUTTON.addEventListener('click', clearDisplay);
DELETE_BUTTON.addEventListener('click', deleteLast);
NUMBER_BUTTONS.forEach(button => button.addEventListener('click', clickNumber)); 
NUMBER_BUTTONS.forEach(button => button.addEventListener('click', enableOpsAndEquals));
//DECIMAL_BUTTON.addEventListener('click', disableDecimal);
OP_BUTTONS.forEach(button => button.addEventListener('click', compute));
OP_BUTTONS.forEach(button => button.addEventListener('click', disableOpsAndEquals)); 
OP_BUTTONS.forEach(button => button.addEventListener('click', enableNums)); 
EQUAL_BUTTON.addEventListener('click', evaluate);
EQUAL_BUTTON.addEventListener('click', disableEqualsAndNumbers);
