//Javascript
const number_display = document.querySelector('.calculator__display');
const number_buttons = document.querySelectorAll('.number');

console.log()
const add_button = document.querySelector('.add')
const subtract_button = document.querySelector('.subtract')
const multiply_button = document.querySelector('.multiply')

const divide_button = document.querySelector('.divide')
const equals_button = document.querySelector('.equals')


//Stored values for calculations
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

/**
 * Updates the number display text value
 */
const updateDisplay = () => {
    number_display.textContent = current_number;
}

/**
 * 
 * @param {string} operator operator to be used in the caldulation, use OPERATORS values
 * @param {number} x first number of the calculation
 * @param {number} y second number of the calculation
 * @returns {number} Returns the result from the calculation
 */
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

/**
 * Function fired by the on click event method to store the operator name that is currently being used
 * When chaining operators before pressing equals, this method calculates and updates the current number 
 * each time and operator is pressed after typing a number
 * Changes between operators if operator buttons are repeated
 * @param {string} operator_value operator name that was pressed. Use OPERATORS object values
 */
const handleOperatorPressed = (operator_value) => {
    if (last_button_pressed_type !== BUTTON_TYPES.operator) {
        if (repeating_operators) {
            num2 = parseFloat(current_number)
            num1 = calculate(current_operator, num1, num2);
            current_number = num1.toString()

        } else
            num1 = parseFloat(current_number);
    }

    updateDisplay();
    current_operator = operator_value;
    last_button_pressed_type = BUTTON_TYPES.operator;

    repeating_operators = true;
    console.log(current_operator);
}

/**
 * Calculates the result of the operation on the 2 stored numbers
 * When no numbers are stored, updates to 0
 * WHen no operator is pressed after typing a number, updates to the typed in number
 * When equals is pressed before the second number is entered, the calculation will use the first number for both values
 * When equals is repeated the current displayed result wil be used as the first number and the second number will be reused
 * 
 */
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

/**
 * Adds a string value of the number pressed to the end of the working number
 * @param {string} string value of the number pressed
 */
const handleNumberPressed = (value) => {
    //Reset the working number if last value input is finished
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

//Button event listeners
add_button.addEventListener('click', () => handleOperatorPressed(OPERATORS.add))
subtract_button.addEventListener('click', () => handleOperatorPressed(OPERATORS.subtract))
multiply_button.addEventListener('click', () => handleOperatorPressed(OPERATORS.multiply))
divide_button.addEventListener('click', () => handleOperatorPressed(OPERATORS.divide))
equals_button.addEventListener('click', handleEqualsPressed)

//Add event listeners for each number button
number_buttons.forEach((button, index) => {
first-script
    button.addEventListener('click', () => handleNumberPressed((index + 1)%10));

})
