// Create basic mathematical functions for the calculator
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// Create function to return a value after getting two number variables and an operator to choose which operation to execute
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case '+':
      return add(a, b);

    case '-':
      return subtract(a, b);

    case 'x':
      return multiply(a, b);

    case '/':
      return divide(a, b).toFixed(2);

    default:
      break;
  }
}

// Selecting HTML elements
const displayTop = document.querySelector('.display-top');
const displayBottom = document.querySelector('.display-bottom');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const clearLast = document.querySelector('[data-clear-last]');
const clearAllButton = document.querySelector('[data-clear-all]');
const dotButton = document.querySelector('[data-dot]');

// State Object
const valuesObj = {
  startingValue: 0,
  firstNum: 0,
  secondNum: 0,
  operator: '',
};

// Display's starting value
displayBottom.textContent = valuesObj.startingValue;

// state variable
let isInputReset = false;

// Clear input
function clearInput() {
  displayBottom.innerText = '';
}

// Adding an event listener to the NUMBER buttons
numberButtons.forEach(button => button.addEventListener('click', inputNumbers));

function inputNumbers(e) {
  if (!isInputReset) {
    clearInput();
  }
  isInputReset = true;

  console.log(e.target); // TODO: delete console

  if (!valuesObj.operator) {
    displayBottom.innerText += e.target.textContent;
    valuesObj.firstNum = Number(displayBottom.textContent);
  }

  if (valuesObj.operator) {
    displayBottom.innerText += e.target.textContent;
    valuesObj.secondNum = Number(displayBottom.textContent);
  }
}

// Adding an event listener to the OPERATOR buttons
operatorButtons.forEach(button =>
  button.addEventListener('click', selectOperator)
);

function selectOperator(e) {
  console.log(e.target); // TODO: delete console
  valuesObj.operator = e.target.dataset.operator;

  displayTop.innerText = `${displayBottom.textContent} ${e.target.dataset.operator} `;
  displayBottom.innerText = '';
}

// Add an event listener to the equals button to evaluate an operation based on the values stored in the valuesObj
equalsButton.addEventListener('click', resolveOperation);

function resolveOperation(e) {
  // Destructure object
  let { operator, firstNum, secondNum } = valuesObj;

  // If there isn't a firstNum, secondNum or an operator you can't equate to anything
  if (!firstNum || !secondNum || !operator) return;

  console.log(valuesObj); // TODO: delete console
  console.log(e.target); // TODO: delete console

  // Resolve operation and add it to the firstNum property
  valuesObj.firstNum = operate(operator, firstNum, secondNum);

  displayTop.textContent += `${displayBottom.textContent} ${e.target.dataset.equals} `;
  displayBottom.textContent = valuesObj.firstNum;

  // Reset some values
  valuesObj.secondNum = 0;
  valuesObj.operator = '';

  isInputReset = false;

  console.log(valuesObj); // TODO: delete console
}

// Adding event listener to DOT button to support decimals
dotButton.addEventListener('click', appendDot);
function appendDot(e) {
  if (displayBottom.innerText.includes('.')) return;
  displayBottom.innerText += e.target.dataset.dot;
}

// Add event listener to CLEAR LAST button to remove last selection
clearLast.addEventListener('click', clearLastSelection);

function clearLastSelection(e) {
  if (valuesObj.secondNum) {
    displayBottom.textContent = '';
    valuesObj.secondNum = 0;
    return;
  }

  if (valuesObj.operator) {
    displayBottom.innerText = valuesObj.firstNum;
    displayTop.textContent = '';
    return;
  }

  if (valuesObj.firstNum) {
    displayBottom.innerText = valuesObj.startingValue;
    return;
  }
}

// Add event listener to CLEAR ALL button to restart everything
clearAllButton.addEventListener('click', initApp);

// Declaring restart / init function
function initApp() {
  (valuesObj.startingValue = 0),
    (valuesObj.firstNum = 0),
    (valuesObj.secondNum = 0),
    (valuesObj.operator = ''),
    (isInputReset = false);
  displayBottom.textContent = valuesObj.startingValue;
  displayTop.textContent = '';
}
