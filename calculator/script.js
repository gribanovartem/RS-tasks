const buttons = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operation]');
const resultBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');
const exponentBtn = document.querySelector('[data-exponent]');
const squareBtn = document.querySelector('[data-square]');

let currentNumber, previousNumber, previousOperator, currentOperator;
let isBtnResult = false;
let isSquare = false;

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

squareBtn.addEventListener('click', () => {
   square();
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
      console.log('dfhgdfghdfghdfhgdfhdfh')
   } else if(currentNumber) {
      previousNumber = currentNumber + ' ' + currentOperator;
      currentNumber = '';
      currentOperand.innerText = currentNumber;
      previousOperand.innerText = previousNumber;
      
   } else {
      previousNumber = previousNumber + ' ' + currentOperator;
      currentNumber = '';
      currentOperand.innerText = currentNumber;
      previousOperand.innerText = previousNumber;
      
   }
   if(previousOperator && previousOperator!== operator) {
      previousOperator = operator;
      previousNumber = previousNumber.slice(0, previousNumber.length-1) + previousOperator;
      previousOperand.innerText = previousNumber;
      
   }
   console.log(previousNumber)
}

const compute = () => {
   
   let computation;
   let isDecimalNum = false;
   let indexToFixed = null;
   if(previousNumber) {
      let prev = previousNumber.toString()
      if(prev.indexOf('.', 0)!== -1) {
         isDecimalNum = true;
      }
      
   }
   if(currentNumber && currentNumber.indexOf('.', 0)!== -1) {
      isDecimalNum = true;
   }
   if(isDecimalNum) {
      let prev = previousNumber;
      let current = currentNumber;
      if(previousNumber.indexOf(' ', 0)!== -1) {
         prev = prev.substr(0, previousNumber.indexOf(' ', 0));
      }
      if(currentNumber.indexOf(' ', 0)!== -1) {
         current = current.substr(0, currentNumber.indexOf(' ', 0));
      }
      let prevDecimalIndex = prev.length - prev.indexOf('.', 0) - 1;
      let curDecimalIndex = current.length - current.indexOf('.', 0) - 1;
      if(prevDecimalIndex > curDecimalIndex) {
         indexToFixed = prevDecimalIndex;
      } else if(prevDecimalIndex < curDecimalIndex) {
         indexToFixed = curDecimalIndex;
      } else {
         indexToFixed = prevDecimalIndex;
      }
   }
   if(!previousOperator) {
      previousOperator = currentOperator;
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
         break;
   }
   if(isDecimalNum) {
      computation = computation.toFixed(indexToFixed);
   }
   currentNumber = '';
   currentOperand.innerText = currentNumber;
   previousNumber = isBtnResult || isSquare ? computation : computation + ' ' + previousOperator;
   previousOperand.innerText = previousNumber;
   console.log('prevnum - ' + previousNumber)
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

const square = () => {
   isSquare = true;
   if(!previousNumber && currentNumber) {
      previousNumber = Math.sqrt(parseFloat(currentNumber));
      currentNumber = '';
      currentOperand.innerText = currentNumber;
      previousOperand.innerText = previousNumber;
   } else if (previousNumber && !currentNumber) {
      previousNumber = Math.sqrt(parseFloat(previousNumber));
      currentNumber = '';
      currentOperand.innerText = currentNumber;
      previousOperand.innerText = previousNumber;
   } else if(previousNumber && currentNumber) {
      compute();
      currentNumber = null;
      square();
   }
   isSquare = false;
   previousOperator = null;
   currentOperator = null;
}