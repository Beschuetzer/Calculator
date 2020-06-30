//#region Event Stuff
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
        case '3': button = document.getElementById('three');
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
//#endregion

const operations = {
    Add: '+',
    Divide: '/',
    Exponentiation: '^',
    Multiply: '*',
    Subtract: '-',
}
const operators = ['(', ')', '*', '/', '+', '-'];

function calculate(string) {
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
const expr_test = "(3-(4+(6-5)*2))+6-5.1/(4.2+3)";
function evaluateParentheses(string) {
    //evaluates the expressions in the parentheses and returns a string
    if (!string.includes('(') && !string.includes(')')) {
        alert(`string: ${string} doesn't contain ( or ).`)
        return string;
    }
    else {
        const subStr = getInnerMostExpression(string);
        const subStrExpr = subStr.slice(1, subStr.length - 1);
        console.log(`subExpr: ${subStr} of string: ${string}`);
        const nextExpr = string.substring(subStr, evaluate(subStrExpr));
        console.log(`nextExpr: ${nextExpr}`);
        //evaluateParentheses(nextExpr);
    }
}

function getInnerMostExpression(string) {
    const subExprStart = string.indexOf('(');
    const subExprEnd = string.indexOf(')');
    if (string.slice(subExprStart, subExprEnd).includes('(')) {
        console.log('need to find the innermost (');
        for (let i = 1; i <= string.length - subExprEnd; i++) {
            const char = string[i];
            let subStr = string.slice(subExprStart + i, subExprEnd);
            //console.log(`char: ${char} and subStr ${subStr}`)
            if (!subStr.includes('(')) {
                //console.log(`this is the innermost expression: ${subStr}`);
                return string.slice(subExprStart + i - 1, subExprEnd + 1);
            }
        }
    }
    else {
        console.log(`index: ${subExprStart} is the inner most (`);
    }
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

function getSubStrIndexes(indexOfOperator, string) {
    let startIndex, endIndex, i = 1;
    while (string[indexOfOperator - i].match(/[0-9. ]/i)) {
        startIndex = indexOfOperator - i;
        i--;
    }
    i = 1;
    while (string[indexOfOperator + i].match(/[0-9. ]/i)) {
        endIndex = indexOfOperator + i;
        i++;
    }
    return [startIndex, endIndex];
}

function getNextExpr(string, indexOfOperator) {
    indexes = getSubStrIndexes(indexOfOperator, string);
    subStrExpr = string.slice(indexes[0], indexes[1]+1);
    n1 = string.slice(indexes[0], indexOfOperator);
    n2 = string.slice(indexOfOperator + 1, indexes[1] + 1);
    subStrExprResult = add(n1, n2);
    console.log(`subStrExpr: ${subStrExpr} of string: ${string}, n1: ${n1} n2: ${n2}, and subStrExprResult ${subStrExprResult}`);
    return string.replace(subStrExpr, subStrExprResult);
    
}

function evaluate(string) {
    let n1, n2, subStrExprResult, subStr, subStrExpr, nextExpr, indexes;
    if (string.includes(operations.Exponentiation)) {
        
    }
    else if (string.includes(operations.Multiply)) {

    }
    else if (string.includes(operations.Divide)) {
    }
    else if (string.includes(operations.Add)) {
        indexOfOperator = string.indexOf(operations.Add);
        evaluate(getNextExpr(string, indexOfOperator));
    }
    else if (string.includes(operations.Subtract)) {
        indexOfOperator = string.indexOf(operations.Subtract);
        evaluate(getNextExpr(string, indexOfOperator));
    }
    else {
        return string;
    }
}

// function parseOperations(string){
//     //!assumes that all the parenthesis have been removed prior
//     //returns a (operation, n1, n2) tuple
//     if (!string.includes('(')) {
//         let operation, n1, n2, operatorPresent;
//         let operators = ['+', '-', '*', '/', '^'];
//         if (string.matches(/[*-+/^]/i)) {
//             console.log(`string (${string} contains an operator`);
//             if (string.includes('*')) {
//                 operatorPresent = "*";
//             }


//                 operation = string.indexOf(operatorPresent)

//             return [operation, n1 ,n2];

//         } 
//         else {
//             return string;
//         }
//     } else {
//         alert('This should not contain parenthesis')
//     }
// }

function add(n1, n2) {
    return parseInt(n1) + parseInt(n2);
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

function exponentiate(n1, n2) {
    return n1 ** n2;
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


const expr = "3+4-6";
const expr2 = "3*5+6-5/4+3";
// console.table(characterCount('3*5+6-5/4+3'));
//console.log(calculate(expr));
//lert(`includes: ${"1{3(4".indexOf('(')}`);
const expr3 = "3.2+44-511+0.4-1.05";
//?why doesn't this text work?  Expr is undefined??
//evaluateParentheses(expr_test);
alert(evaluate(expr));

// module.exports = calculate