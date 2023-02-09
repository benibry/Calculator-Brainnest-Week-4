//Javascript
  const number_displanum2 = document.querySelector('h1');

let current_number = '0';

let num1 = 0;
let num2 = 0;

//List of valid operators
const OPERATORS = {
    add: 'add',
    subtract: 'subtract',
    multiply: 'multiply',
    divide: 'divide',
    none: 'none'
}

let current_operator = OPERATORS.none;

//Button types help the calculator know what button was last pressed and handle logic accordingly
const BUTTON_TYPES = {
    digit: 'digit',
    operator: 'operator',
    equals: 'equals',
    clear: 'clear',
    none: 'none'
}

let last_button_pressed_type = BUTTON_TYPES.none;

//Boolean value for testing if repeated operators and numbers are entered without pressing =
let repeating_operators = false;

/**
 * 
 * @param {number} x first value
 * @param {number} y second value
 * @returns {number} x added to y
 */
const add = (x, y) => x + y;

/**
 * 
 * @param {number} x first value
 * @param {number} y second value
 * @returns {number} x subtracted by y
 */
const subtract = (x, y) => x - y;

/**
 * 
 * @param {number} x first value
 * @param {number} y second value
 * @returns {number} x multiplied by y
 */
const multiply = (x, y) => x * y;

/**
 * 
 * @param {number} x first value
 * @param {number} y second value
 * @returns {number} x divided by y
 */
const divide = (x, y) => y != 0 ? x / y : Infinity;


const updateDisplay = () => {
    number_display.textContent = current_number;
}

const calculate = (operator, x, y) => {
    switch (operator) {
        case OPERATORS.add:
            return add(x, y);
        case OPERATORS.subtract:
            return subtract(x, y);
        case OPERATORS.multiply:
            return multiply(x, y);
        case OPERATORS.divide:
            return divide(x, y);
    }
}

const handleOperatorPressed = (operator_value) => {
    if(last_button_pressed_type !== BUTTON_TYPES.operator){
        if(repeating_operators){
            num2 = parseFloat(current_number)
            num1 = calculate(current_operator, num1, num2);
            current_number = num1.toString()
            
        }else
        num1 = parseFloat(current_number);
    }

    updateDisplay();
    current_operator = operator_value;
    last_button_pressed_type = BUTTON_TYPES.operator;

    repeating_operators = true;
    console.log(current_operator);
}

const handleEqualsPressed = () => {
    let result = 0;
    switch (last_button_pressed_type) {
        case BUTTON_TYPES.none:
            result = 0;
            break;
        case BUTTON_TYPES.digit:
            if (current_operator === OPERATORS.none) {
                result = current_number;
            }
            else {
                num2 = parseFloat(current_number);
                result = calculate(current_operator, num1, num2);
            }
            break;
        case BUTTON_TYPES.operator:
            num1 = parseFloat(current_number);
            num2 = parseFloat(current_number);
            result = calculate(current_operator, num1, num2);
            break;
        case BUTTON_TYPES.equals:
            num1 = parseFloat(current_number);
            result = calculate(current_operator, num1, num2);
            break;
        case BUTTON_TYPES.clear:
        case BUTTON_TYPES.none:
            result = parseFloat(current_number);
            break;
    }
    num2 = parseFloat(current_number);
    //result = calculate(current_operator, num1, num2);
    current_number = result.toString();
    console.log(`${num1} ${current_operator} ${num2} = ${result}`);
    updateDisplay();
    last_button_pressed_type = BUTTON_TYPES.equals;
    repeating_operators = false;
}

//handle decimal pressed

//handle clear button pressed
//clears current working number

//handle all clear button
//Clears num1and num2and current working number

//handle backspace pressed
//removes one character from end of current_number

//After equals clicked keep the result as current working number
//After equals clicked and starting to type a new number it should start working with a brand new number

//What if divided bnum20


const handleNumberPressed = (value) => {
    if (last_button_pressed_type === BUTTON_TYPES.equals ||
        last_button_pressed_type === BUTTON_TYPES.operator) {
        current_number = '';
    }

    //Remove trailing 0's
    console.log('clicked ' + value)

    current_number += value;

    updateDisplay();
    last_button_pressed_type = BUTTON_TYPES.digit;
}

document.querySelector('.add').addEventListener('click', () => handleOperatorPressed(OPERATORS.add))
document.querySelector('.subtract').addEventListener('click', () => handleOperatorPressed(OPERATORS.subtract))
document.querySelector('.multiply').addEventListener('click', () => handleOperatorPressed(OPERATORS.multiply))
document.querySelector('.divide').addEventListener('click', () => handleOperatorPressed(OPERATORS.divide))
document.querySelector('.equals').addEventListener('click', handleEqualsPressed)

const number_buttons = document.querySelectorAll('.number_button');
number_buttons.forEach((button, index) => {
    button.addEventListener('click', () => handleNumberPressed(index));

})