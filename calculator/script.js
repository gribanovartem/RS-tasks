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
let isNegativeNumber = false;
let isWrongEnter = false;

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

deleteBtn.addEventListener('click', () => {
   if(isWrongEnter) {
      clear();
      isWrongEnter = false;
      return;
   }
   if(currentNumber) {
      currentNumber = currentNumber.slice(0, currentNumber.length-1);
      currentOperand.innerText = currentNumber;
   }
})

resultBtn.addEventListener('click', () => {
   if(isWrongEnter) {
      clear();
      isWrongEnter = false;
      return;
   }
   isBtnResult = true;
   if(currentOperator) {
      previousOperator = currentOperator;
   }
   if(previousOperator) {
      compute();
   }
   currentOperator = null;
})
const addNumber = (number) => {
   if(isWrongEnter) {
      clear();
      isWrongEnter = false;
      return;
   }
   if(isNegativeNumber) {
      currentNumber = '-' + number;
      isNegativeNumber = false;
   } else {
      currentNumber = (currentNumber) ? currentNumber + number : number;
   }
   currentOperand.innerText = currentNumber;
}

const addOperator = (operator) => {
   if(isWrongEnter) {
      clear();
      isWrongEnter = false;
      return;
   }
   if((currentOperator && operator==='-') || (operator==='-' && !previousNumber && !currentNumber)) {
      isNegativeNumber = true;
      console.log('gggggggggggggggggg')
   } else {
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
         let index = previousNumber.indexOf(' ');
         previousNumber = previousNumber.slice(0, index) + previousOperator;
         previousOperand.innerText = previousNumber;
         
      }
   }
   
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
      case 'x²':
        computation = Math.pow(prev, current);
        console.log(computation)
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
   if(isWrongEnter) {
      clear();
      isWrongEnter = false;
      return;
   }
   isSquare = true;
   if(parseFloat(currentNumber)<0) {
      previousNumber = 'Введены неверные данные';
      currentNumber = '';
      currentOperand.innerText = currentNumber;
      previousOperand.innerText = previousNumber;
      isWrongEnter = true;
   } else if(!previousNumber && currentNumber) {
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