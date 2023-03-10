//Javascript
const number_display = document.querySelector('.current_number');
const operation_display = document.querySelector('.operation_display');
const number_buttons = document.querySelectorAll('.number');
const add_button = document.querySelector('.add')
const subtract_button = document.querySelector('.subtract')
const multiply_button = document.querySelector('.multiply')
const divide_button = document.querySelector('.divide')
const equals_button = document.querySelector('.equals')
const ac_button = document.querySelector('.all_clear')
const clear_button = document.querySelector('.clear')
const decimal_button = document.querySelector('.decimal')
const backspace_button = document.querySelector('.backspace')
const negate_button = document.querySelector('.negate')
const memory_recall_button = document.querySelector('.memory_recall')
const memory_add_button = document.querySelector('.memory_add')
const memory_subtract_button = document.querySelector('.memory_subtract')
const percentage_button = document.querySelector('.percentage')

//Stored values for calculations
let current_number = '0';
let num1 = 0;
let num2 = 0;
let memory_number = 0;

//List of valid operators
const OPERATORS = {
    add: '+',
    subtract: '-',
    multiply: 'x',
    divide: '÷',
    percentage: '%',
    none: 'none'
}

let current_operator = OPERATORS.none;

//Button types help the calculator know what button was last pressed and handle logic accordingly
const BUTTON_TYPES = {
    digit: 'digit',
    operator: 'operator',
    equals: 'equals',
    clear: 'clear',
    decimal: 'decimal',
    aclear: 'aclear',
    backspace: 'backspace',
    negate: 'negate',
    none: 'none'
}

let last_button_pressed_type = BUTTON_TYPES.none;

//Boolean value for testing if repeated operators and numbers are entered without pressing =
let repeating_operators = false;

/**
 * Formats number to short hand display version
 * @param {string} number_string 
 * @returns {string}
 */
const formatNumberDown = (number) => {
    if (number.length > 9)
        return number.toExponential(9)
    else
        return number
}

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
    number_display.textContent = current_number.length > 12
        ? parseFloat(current_number).toExponential(9).toString()
        : current_number;
    if (current_operator != 'none') {
        operation_display.textContent =
            `${num1.toString().length > 9 ? num1.toExponential(9) : num1} ${current_operator}`
    } else {
        operation_display.textContent = ''
    }
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
        case OPERATORS.percentage:
            if (current_operator === OPERATORS.multiply || current_operator === OPERATORS.divide) {
                return y / 100;
            } else if (current_operator === OPERATORS.add || current_operator === OPERATORS.subtract) {
                return (x * y) / 100;
            }
        default:
            return x;
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

    current_operator = operator_value;
    last_button_pressed_type = BUTTON_TYPES.operator;
    repeating_operators = true;
    console.log(current_operator);
    updateDisplay();
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
            //No operator pressed yet
            if (current_operator === OPERATORS.none) {
                result = current_number;
            }
            else {
                num2 = parseFloat(current_number);
                result = calculate(current_operator, num1, num2);
            }
            break;
        //Chaining equals operator
        case BUTTON_TYPES.operator:
            result = calculate(current_operator, num1, num2);
            break;
        case BUTTON_TYPES.equals:
            num1 = parseFloat(current_number);
            result = calculate(current_operator, num1, num2);
            break;
        case BUTTON_TYPES.clear:
        case BUTTON_TYPES.decimal:
        case BUTTON_TYPES.none:
            result = parseFloat(current_number);
            break;
    }
    if (last_button_pressed_type !== BUTTON_TYPES.equals)
        num2 = parseFloat(current_number);
    current_number = result.toString();
    console.log(`${num1} ${current_operator} ${num2} = ${result}`);
    updateDisplay();
    last_button_pressed_type = BUTTON_TYPES.equals;
    repeating_operators = false;
}

//handle decimal pressed
const handleDecimal = () => {
    if (!current_number.includes('.')) {
        current_number += '.';
    }
    //console.log('decimal');
    updateDisplay();
}

//Clears all current operations and stored numbers resetting the calculator
const handleAllClear = () => {
    current_number = '0';
    num1 = 0;
    num2 = 0;
    repeating_operators = false;
    current_operator = OPERATORS.none;
    console.log('all clear');
    updateDisplay();
}

//clears current working number only
const handleClear = () => {
    current_number = '0';
    console.log('clear');
    updateDisplay();
}

const handleNegate = () => {
    if (!current_number.includes('-')) {
        current_number = '-' + current_number;
        console.log('negative');
    } else {
        current_number = current_number.substring(1);
        console.log('positive');
    }
    updateDisplay();
}

//Removes one character from end of current_number
//When last character is removed, the current number is 0
const handleBackspace = () => {
    if (current_number.length > 1) {
        current_number = current_number.slice(0, -1);
    }
    else {
        current_number = '0';
    }
    console.log('backspace');

    updateDisplay();
}

/**
 * Adds a string value of the number pressed to the end of the working number
 * @param {string} string value of the number pressed
 */
const handleNumberPressed = (value) => {
    //console.log('clicked ' + value)
    //Reset the working number if last value input is finished
    if (last_button_pressed_type === BUTTON_TYPES.equals ||
        last_button_pressed_type === BUTTON_TYPES.operator) {
        current_number = '';
    } else if (current_number.length >= 12) {
        console.log('Input number length too long to increase.')
        return;
    }

    //Prevent trailing 0's
    if (current_number === '0') {
        current_number = value.toString();
    } else {
        current_number += value;
    }

    updateDisplay();
    last_button_pressed_type = BUTTON_TYPES.digit;
}

//Gets and sets current_number to memory_number
const handleMemoryRecallPressed = () => {
    current_number = memory_number.toString();
    console.log("Memory recall - Current Value: " + memory_number)
    updateDisplay();
};

//Adds current_number to memory_number
const handleMemoryAddPressed = () => {
    memory_number += parseFloat(current_number);
    console.log("Memory add - Current Value: " + memory_number)
};

//Subtracts current_number from memory_number
const handleMemorySubtractPressed = () => {
    memory_number -= parseFloat(current_number);
    console.log("Memory subtract - Current Value: " + memory_number)
};

//Changes current_number to the provided percentage value calculation
const handlePercentPressed = () => {
    let percent = current_number;
    let result = calculate(OPERATORS.percentage, num1, percent);

    last_button_pressed_type = BUTTON_TYPES.operator;
    current_number = result.toString();
    updateDisplay();
};

//Button event listeners
add_button.addEventListener('click', () => handleOperatorPressed(OPERATORS.add))
subtract_button.addEventListener('click', () => handleOperatorPressed(OPERATORS.subtract))
multiply_button.addEventListener('click', () => handleOperatorPressed(OPERATORS.multiply))
divide_button.addEventListener('click', () => handleOperatorPressed(OPERATORS.divide))
equals_button.addEventListener('click', handleEqualsPressed)
decimal_button.addEventListener('click', () => handleDecimal(BUTTON_TYPES.decimal))
ac_button.addEventListener('click', () => handleAllClear(BUTTON_TYPES.aclear))
clear_button.addEventListener('click', () => handleClear(BUTTON_TYPES.clear))
backspace_button.addEventListener('click', () => handleBackspace(BUTTON_TYPES.backspace))
negate_button.addEventListener('click', () => handleNegate(BUTTON_TYPES.negate))
memory_recall_button.addEventListener('click', handleMemoryRecallPressed)
memory_add_button.addEventListener('click', handleMemoryAddPressed)
memory_subtract_button.addEventListener('click', handleMemorySubtractPressed)
percentage_button.addEventListener('click', handlePercentPressed)

//Add event listeners for each number button
number_buttons.forEach((button, index) => {
    button.addEventListener('click', () => handleNumberPressed((index + 1) % 10));
})

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case '1':
            handleNumberPressed(1)
            break;
        case '2':
            handleNumberPressed(2)
            break;
        case '3':
            handleNumberPressed(3)
            break;
        case '4':
            handleNumberPressed(4)
            break;
        case '5':
            handleNumberPressed(5)
            break;
        case '6':
            handleNumberPressed(6)
            break;
        case '7':
            handleNumberPressed(7)
            break;
        case '8':
            handleNumberPressed(8)
            break;
        case '9':
            handleNumberPressed(9)
            break;
        case '/':
            handleOperatorPressed(OPERATORS.divide);
            break;
        case '*':
            handleOperatorPressed(OPERATORS.multiply);
            break;
        case '-':
            handleOperatorPressed(OPERATORS.subtract);
            break;
        case '+':
            handleOperatorPressed(OPERATORS.add);
            break;
        case '.':
            handleDecimal()
            break;
        case '+/-':
            handleNegate();
            break;
        case '0':
            handleNumberPressed(0)
            break;
        case '=':
        case 'Enter':

            handleEqualsPressed()
            break;
        case "Backspace":
            handleBackspace();
            break;
    }
});