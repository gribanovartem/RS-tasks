const buttons = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operation]');
const resultBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

let currentNumber, previousNumber, previousOperator, currentOperator;
let isBtnResult = false;

buttons.forEach((item) => {
   item.addEventListener('click', (e) => {
      addNumber(e.target.textContent);
   })
});

operators.forEach((item) => {
   item.addEventListener('click', (e) => {
      addOperator(e.target.textContent);
   })
});

clearBtn.addEventListener('click', () => {
   clear();
})

resultBtn.addEventListener('click', () => {
   isBtnResult = true;
   if(currentOperator) {
      previousOperator = currentOperator;
   }
   if(previousOperator) {
      compute();
   }
})
const addNumber = (number) => {
   currentNumber = (currentNumber) ? currentNumber + number : number;
   currentOperand.innerText = currentNumber;
}

const addOperator = (operator) => {
   if(currentOperator) {
      previousOperator = currentOperator;
   }
   currentOperator = operator;
   if(isBtnResult) {
      previousNumber = previousNumber + ' ' + previousOperator
      previousOperand.innerText = previousNumber;
      isBtnResult = false;
   } else if(previousOperator) {
      compute();
   } else {
      previousNumber = currentNumber + ' ' + currentOperator;
      currentNumber = '';
      currentOperand.innerText = currentNumber;
      previousOperand.innerText = previousNumber;
   }
   if(previousOperator && previousOperator!== operator) {
      previousOperator = operator;
      previousNumber = previousNumber.slice(0, previousNumber.length-1) + previousOperator;
      previousOperand.innerText = previousNumber;
   }
}

const compute = () => {
   let computation;
   let isDecimalNum = false;
   let indexToFixed = null;
   if(previousNumber.indexOf('.', 0)!== -1) {
      isDecimalNum = true;
   }
   if(currentNumber.indexOf('.', 0)!== -1) {
      isDecimalNum = true;
   }
   if(isDecimalNum) {
      let prev = previousNumber;
      let current = currentNumber;
      if(previousNumber.indexOf(' ', 0)!== -1) {
         prev = prev.substr(previousNumber.indexOf(' ', 0), 2);
      }
      if(currentNumber.indexOf(' ', 0)!== -1) {
         current = current.substr(currentNumber.indexOf(' ', 0), 2);
      }
      let prevDecimalIndex = prev.indexOf('.', 0) + 1;
      let curDecimalIndex = current.indexOf('.', 0) + 1;
      if(prevDecimalIndex > curDecimalIndex) {
         indexToFixed = prev.length - prevDecimalIndex;
      } else if(prevDecimalIndex < curDecimalIndex) {
         indexToFixed = current.length - curDecimalIndex;
      } else {
         indexToFixed = prev.length - prevDecimalIndex;
         console.log(indexToFixed, previousNumber, prevDecimalIndex)
      }
   }
   const prev = parseFloat(previousNumber);
   const current = parseFloat(currentNumber);
   switch (previousOperator) {
      case '+':
        computation = prev + current;
        break
      case '-':
        computation = prev - current;
        break
      case '*':
        computation = prev * current;
        break
      case '÷':
        computation = prev / current;
        break
      default:
        return;
   }
   if(isDecimalNum) {
      computation = computation.toFixed(indexToFixed);
   }
   currentNumber = '';
   currentOperand.innerText = currentNumber;
   previousNumber = isBtnResult ? computation : computation + ' ' + previousOperator;
   previousOperand.innerText = previousNumber;
}

const clear = () => {
   currentNumber = '';
   previousNumber = '';
   previousOperator = '';
   currentOperator = '';
   isBtnResult = false;
   previousOperand.innerText = previousNumber;
   currentOperand.innerText = currentNumber;
}