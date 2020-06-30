window.addEventListener('keydown', keyPress);
const buttons = document.querySelectorAll('.full-page button');
for (const button of buttons) {
    console.log(button);
    button.addEventListener('click', buttonPress);
    button.addEventListener('transitionend', tranisitionEnd);
}

function buttonPress(e) {
    console.log(e);
    const textbox = document.getElementById('textbox');
    switch (e.srcElement.id) {
        case 'left_parenthesis':
            textbox.value += '(';
            break;
        case 'right_parenthesis':
            textbox.value += ')';
            break;
        case 'nine':
            textbox.value += '9';
            break;
        case 'eight':
            textbox.value += '8';
            break;
        case 'seven':
            textbox.value += '7';
            break;
        case 'six':
            textbox.value += '6';
            break;
        case 'five':
            textbox.value += '5';
            break;
        case 'four':
            textbox.value += '4';
            break;
        case 'three':
            textbox.value += '3';
            break;
        case 'two':
            textbox.value += '2';
            break;
        case 'one':
            textbox.value += '1';
            break;
        case 'zero':
            textbox.value += '0';
            break;
        case 'multiply':
            textbox.value += '*';
            break;
        case 'divide':
            textbox.value += '/';
            break;
        case 'add':
            textbox.value += '+';
            break;
        case 'subtract':
            textbox.value += '-';
            break;
        case 'undo':
            textbox.value = Array.from(textbox.value).slice(0, textbox.value.length - 1).join('');
            break;
        case 'clear':
            textbox.value = '';
            break;
        case 'period':
            //todo need to verify only one dot per number
            textbox.value += '.';
            break;
        case 'equals':

            break;
    }
}
//! don't need keypress if having textbox be modifyable
function keyPress(e) {
    console.log(e);
    const textbox = document.getElementById('textbox');
    let button;
    switch (e.key) {
        case '(':
            button = document.getElementById('left_parenthesis');
            button.classList.add('button_press');
            console.log(button.classList);
            textbox.value += '(';
            break;
        case ')':
            button = document.getElementById('right_parenthesis');
            button.classList.add('button_press');
            textbox.value += ')';
            break;
        case '9':
            button = document.getElementById('nine');
            button.classList.add('button_press');
            textbox.value += '9';
            break;
        case '8':
            button = document.getElementById('eight');
            button.classList.add('button_press');
            textbox.value += '8';
            break;
        case '7':
            button = document.getElementById('seven');
            button.classList.add('button_press');
            textbox.value += '7';
            break;
        case '6':
            button = document.getElementById('six');
            button.classList.add('button_press');
            textbox.value += '6';
            break;
        case '5':
            button = document.getElementById('five');
            button.classList.add('button_press');
            textbox.value += '5';
            break;
        case '4':
            button = document.getElementById('four');
            button.classList.add('button_press');
            textbox.value += '4';
            break;
        case '3':button = document.getElementById('three');
        button.classList.add('button_press');
            textbox.value += '3';
            break;
        case '2':
            button = document.getElementById('two');
            button.classList.add('button_press');
            textbox.value += '2';
            break;
        case '1':
            button = document.getElementById('one');
            button.classList.add('button_press');
            textbox.value += '1';
            break;
        case '0':
            button = document.getElementById('zero');
            button.classList.add('button_press');
            textbox.value += '0';
            break;
        case '*':
            button = document.getElementById('multiply');
            button.classList.add('button_press');
            textbox.value += '*';
            break;
        case '/':
            button = document.getElementById('divide');
            button.classList.add('button_press');
            textbox.value += '/';
            break;
        case '+':
            button = document.getElementById('add');
            button.classList.add('button_press');
            textbox.value += '+';
            break;
        case '-':
            button = document.getElementById('subtract');
            button.classList.add('button_press');
            textbox.value += '-';
            break;
        case 'Backspace':
            button = document.getElementById('undo');
            button.classList.add('button_press');
            textbox.value = Array.from(textbox.value).slice(0, textbox.value.length - 1).join('');
            break;
        case 'Delete':
            button = document.getElementById('clear');
            button.classList.add('button_press');
            textbox.value = '';
            break;
        case '.':
            button = document.getElementById('period');
            button.classList.add('button_press');
            //todo need to verify only one dot per number
            textbox.value += '.';
            break;
        case 'Enter':
            button = document.getElementById('equals');
            button.classList.add('button_press');
            break;
    }
}
function tranisitionEnd(e) {
    console.log(e.target.classList);
    e.target.classList.remove('button_press');
}

const operations = {
    Add: '+',
    Divide: '/',
    Multiply: '*',
    Subtract: '-',
}
const operators = ['(', ')', '*', '/', '+', '-'];

function evaluate(string) {
    //this evaluates the users input;  the function called directly.  
    //must not contain alpha chars
    const characterCounts = characterCount(string);
    if (characterCounts['('] === characterCounts[')']) {
        console.log('parentheses match up');
        parenthesesHandled = evaluateParentheses(string);
        multiplyAndDivideHandled = evaluateMultiplyAndDivide(parenthesesHandled);
        return evaluateSubtractionAndAddition(multiplyAndDivideHandled);
    } else {
        console.log('parentheses mismatch');
        return "Error.  Parentheses Mismatch";
    }
}
// todo this part needs work
function evaluateParentheses(string) {
    //evaluates the expressions in the parentheses and returns a string
    // if (!string.includes('(') && !string.includes(')')) {
    //     alert(`string: ${string} doesn't contain ( or ).`)
    //     return string;
    // }
    // else {
    //     const startIndex = -1, endIndex = string.length - 1, charCounts;
    //     tempStr = string;
    //     //Adjust the while condition to stop when string no longer contains '('?
    //     while (!tempStr.substring(startIndex + 1, endIndex).includes(')')) {
    //         //Getting the potential substring (first '(' and ')' with everything in between)
    //         const startIndex = string.indexOf('(');
    //         const endIndex = string.indexOf(')');
    //         tempStr = string.substring(startIndex + 1, endIndex);

    //         charCounts = characterCount(tempStr)
    //         if (charCounts['('] === charCounts[')']) {
    //             //we got a valid expression
    //             const n1, n2, operator;


    //         } else {
    //             //we need to expand the search to the next () by changing the start index
    //         }
    //     }
    // }
}

function evaluateMultiplyAndDivide(string) {
    //evaluates the * and / and returns a string

}

function evaluateSubtractionAndAddition(str) {
    //evaluates the + and - and returns a string
    // alert(str);
    const stringReduced = str.reduce((obj, char) => {
        if (!(char in obj)) {
            obj[char] = [];
        }
        obj[char].push(i);
        obj['i']++;
        return obj;
    }, { i: 0 });
    console.log(stringReduced);
}


//#region Finished
function operate(operation, n1, n2) {
    if (operation === operations.add) {
        return add(n1, n2);
    }
    else if (operation === operations.Divide) {
        return divide(n1, n2);
    }
    else if (operation === operations.Multiply) {
        return multiply(n1, n2);
    }
    else if (operation === operations.Subtract) {
        return subtract(n1, n2);
    }
}

function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    if (n2 === 0) {
        alert(`Dividing by zero is against the rules!`);
        return null;
    }
    return n1 / n2;
}

function characterCount(string) {
    return Array.from(string).reduce((obj, c) => {
        //console.log(`obj: ${obj} and c: ${c} and obj[c]: ${obj[c]}`);
        if (!(c in obj)) {
            //console.log(`adding: ${c}: 0`)
            obj[c] = 0;
        }
        obj[c]++;
        return obj;
    }, {});
}
//#endregion
const expr = "(3*5)+6-5/(4+3)";
const expr2 = "3*5+6-5/4+3";
// console.table(characterCount('3*5+6-5/4+3'));
console.log(evaluate(expr));
//lert(`includes: ${"1{3(4".indexOf('(')}`);
const expr3 = "3.2+44-511+0.4-1.05";
//?why doesn't this text work?  Expr is undefined??
evaluateSubtractionAndAddition(expr);
