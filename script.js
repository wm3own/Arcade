const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const historyList = document.getElementById('history-list');

let currentInput = '0';
let previousInput = null;
let operator = null;
let isResultDisplayed = false;
let history = [];

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(number) {
  if (isResultDisplayed) {
    currentInput = number;
    isResultDisplayed = false;
  } else if (currentInput === '0') {
    currentInput = number;
  } else {
    currentInput += number;
  }
}

function appendDecimal() {
  if (isResultDisplayed) {
    currentInput = '0.';
    isResultDisplayed = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
}

function clearAll() {
  currentInput = '0';
  previousInput = null;
  operator = null;
  isResultDisplayed = false;
}

function backspace() {
  if (isResultDisplayed) {
    clearAll();
    updateDisplay();
    return;
  }
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
}

function chooseOperator(op) {
  if (operator && !isResultDisplayed) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  isResultDisplayed = true;
}

function calculate() {
  if (operator === null || previousInput === null) return;

  let a = parseFloat(previousInput);
  let b = parseFloat(currentInput);
  let result;

  switch (operator) {
    case 'add':
      result = a + b;
      break;
    case 'subtract':
      result = a - b;
      break;
    case 'multiply':
      result = a * b;
      break;
    case 'divide':
      if (b === 0) {
        alert("Erro: Divisão por zero");
        clearAll();
        updateDisplay();
        return;
      }
      result = a / b;
      break;
  }

  result = Math.round(result * 100000) / 100000; // limitar a 5 casas decimais
  currentInput = result.toString();

  // adiciona no histórico
  history.unshift(`${previousInput} ${operatorSymbol(operator)} ${b} = ${result}`);
  updateHistory();

  operator = null;
  previousInput = null;
  isResultDisplayed = true;
  updateDisplay();
}

function operatorSymbol(op) {
  switch (op) {
    case 'add': return '+';
    case 'subtract': return '−';
    case 'multiply': return '×';
    case 'divide': return '÷';
  }
}

function percent() {
  let num = parseFloat(currentInput);
  num = num / 100;
  currentInput = num.toString();
  updateDisplay();
}

function updateHistory() {
  historyList.innerHTML = '';
  for (let item of history) {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.number !== undefined) {
      appendNumber(button.dataset.number);
      updateDisplay();
    } else {
      const action = button.dataset.action;
      switch (action) {
        case 'clear':
          clearAll();
          updateDisplay();
          break;
        case 'backspace':
          backspace();
          updateDisplay();
          break;
        case 'percent':
          percent();
          break;
        case 'decimal':
          appendDecimal();
          updateDisplay();
          break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
          chooseOperator(action);
          break;
        case 'equals':
          calculate();
          break;
      }
    }
  });
});

// Suporte ao teclado do computador
window.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    appendNumber(e.key);
    updateDisplay();
  } else if (e.key === '.') {
    appendDecimal();
    updateDisplay();
  } else if (e.key === '+' || e.key === '-') {
    chooseOperator(e.key === '+' ? 'add' : 'subtract');
  } else if (e.key === '*' || e.key === 'x' || e.key === 'X') {
    chooseOperator('multiply');
  } else if (e.key === '/') {
    chooseOperator('divide');
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Backspace') {
    backspace();
    updateDisplay();
  } else if (e.key.toLowerCase() === 'c') {
    clearAll();
    updateDisplay();
  }
});
