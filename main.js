//#region Initialization Stuff
const operations = {
    Add: '+',
    Divide: '/',
    Exponentiation: '^',
    Multiply: '*',
    Subtract: '-',
}
const operators = ['(', ')', '*', '/', '+', '-'];
//#endregion 
//#region Event Stuff
window.addEventListener('keydown', keyPress);
let eventRecord = [];
const textbox = document.getElementById('textbox');
const buttons = document.querySelectorAll('.full-page button');
for (const button of buttons) {
    //console.log(button);
    button.addEventListener('click', buttonPress);
    button.addEventListener('transitionend', tranisitionEnd);
}
function buttonPress(e) {
    //console.log(e);
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
        case 'exponentiation':
            operatorsPrint('^');
            break;
        case 'multiply':
            operatorsPrint('*');
            break;
        case 'divide':
            operatorsPrint('/');
            break;
        case 'add':
            operatorsPrint('+');
            break;
        case 'subtract':
            operatorsPrint('-');
            break;
        case 'e':
            operatorsPrint('e');
            break;
        case 'undo':
            undoTextbox();
            break;
        case 'clear':
            textbox.value = '';
            break;
        case 'period':
            operatorsPrint('.');
            break;
        case 'equals':
            //evaluate(textbox.value);
            calculate(textbox.value);
            break;
    }
    if (eventRecord[eventRecord.length - 1] != textbox.value) {
        eventRecord.push(textbox.value);
    }
    //console.log(eventRecord);

}
function keyPress(e) {
    //console.log(e);
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
        case 'e':
            button = document.getElementById('exponentiation');
            button.classList.add('button_press');
            operatorsPrint('e');

            break;
        case '^':
            button = document.getElementById('exponentiation');
            button.classList.add('button_press');
            operatorsPrint('^');

            break;
        case '*':
            button = document.getElementById('multiply');
            button.classList.add('button_press');
            operatorsPrint('*');
            break;
        case '/':
            button = document.getElementById('divide');
            button.classList.add('button_press');
            if (textbox.value[textbox.value.length - 1] != '/') {
                textbox.value += '/';
            }
            break;
        case '+':
            button = document.getElementById('add');
            button.classList.add('button_press');
            operatorsPrint('+');
            break;
        case '-':
            button = document.getElementById('subtract');
            button.classList.add('button_press');
            operatorsPrint('-');
            break;
        case 'Backspace':
            // textbox.value = Array.from(textbox.value).slice(0, textbox.value.length - 1).join('');
            textbox.value = textbox.value.slice(0, textbox.value.length - 1);
            break;
        case 'Delete':
            button = document.getElementById('clear');
            button.classList.add('button_press');
            textbox.value = '';
            break;
        case '.':
            button = document.getElementById('period');
            button.classList.add('button_press');
            operatorsPrint('.');
            break;
        case 'Enter':
            button = document.getElementById('equals');
            button.classList.add('button_press');
            //evaluate(textbox.value);
            calculate(textbox.value);
            break;
        case 'u':
            button = document.getElementById('undo');
            button.classList.add('button_press');
            undoTextbox();
    }
    if (eventRecord[eventRecord.length - 1] != textbox.value) {
        eventRecord.push(textbox.value);
    }
    console.log(eventRecord);
}
function tranisitionEnd(e) {
    //console.log(e.target.classList);
    e.target.classList.remove('button_press');
}
//#endregion
//#region Helper Fn
function operatorsPrint(operator) {
    if (operator == '.') {
        numbers = textbox.value.split(/[*\-+^/e()]/i);
        alert(numbers);
        if (!condition) {
            textbox.value += operator;
        }
    }
    else if (textbox.value[textbox.value.length - 1] != operator) {
        textbox.value += operator;
    }
}
function undoTextbox() {
    let nextIndex = eventRecord.length - 2;
    textbox.value = (nextIndex > 0) ? eventRecord[nextIndex] : eventRecord[0];
    eventRecord.pop(2);
}
function add(n1, n2) {
    return parseFloat(n1) + parseFloat(n2);
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
    if (n1 < 0 && (n2 > 0 && n2 < 1 || n2 < 0 && n2 > -1)) {
        return "Imaginary";
    }
    return Math.pow(n1, n2);
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
function formatStringToContinue(string) {
    string = string.replace(' ', '');
    string = string.replace(/([0-9])\(/i, '$1*\(');    //convert 9(n1-n2) to 9*(n1-n2)
    string = string.replace(/\+\-/i, '-');   //
    string = string.replace(/\-\+/i, '-');   //
    string = string.replace(/\+\+/i, '+');   //
    string = string.replace(/\-\-/i, '+');   //
    return string;
}
//#endregion
//#region Main Logic

function calculate(string) {
    //this evaluates the users input;  the function called directly.  
    //must not contain alpha chars
    let msg;
    const characterCounts = characterCount(string);
    string = formatStringToContinue(string);
    console.log(`\nCALCULATING -------------- : ${string}`);
    //alert(1);
    if (string.match(/[^0-9e\-+*^/()\.]/i)) {
        msg = `Illegal Character found`;
        textbox.value = msg;
        return msg;
    }
    if (characterCounts['('] === characterCounts[')']) {
        //console.log('parentheses match up');
        parenthesesHandled = evaluateParentheses(string);
        let result = evaluateParentheses(parenthesesHandled);
        textbox.value = result;
        return result;
    } else {
        //console.log('parentheses mismatch');
        msg = "Error.  Parentheses Mismatch";
        textbox.value = msg;
        return msg;
    }
}
function evaluateParentheses(string) {
    //evaluates the expressions in the parentheses and returns a string
    if (!string.includes('(') && !string.includes(')')) {
        return evaluate(string);
    }
    else {
        const subStr = getInnerMostExpression(string);
        const subStrExpr = subStr.slice(1, subStr.length - 1);
        console.log(`subStr: ${subStr} of string: ${string}, subStrExpr: ${subStrExpr}`);
        const nextExpr = string.replace(subStr, evaluate(subStrExpr));
        console.log(`nextExpr: ${nextExpr}`);
        //alert(5);
        if (nextExpr.includes('(')) {
            return evaluateParentheses(nextExpr);
        } else {
            return evaluate(nextExpr);
        }
    }
}
function evaluate(string) {
    //console.log(`STARTING WITH STRING: ${string}`);
    //alert('evaluating');
    if (string[0] == '+') {
        string = string.slice(1);
    }
    if (string.match(/^\s*\-*[0-9]\.[0-9]*e\-*\s*[0-9]*$/) || string.match(/Imaginary/i)) {
        console.log(`STOPPING HERE --- with ${string}`);
        return string;
    }
    else if (string.includes(operations.Exponentiation)) {
        return evaluate(getNextExpr(string, string.lastIndexOf(operations.Exponentiation), operations.Exponentiation));
    }
    else if (string.includes(operations.Multiply)) {
        return evaluate(getNextExpr(string, string.indexOf(operations.Multiply), operations.Multiply));
    }
    else if (string.includes(operations.Divide)) {
        return evaluate(getNextExpr(string, string.indexOf(operations.Divide), operations.Divide));
    }
    else if (string.includes(operations.Add)) {
        return evaluate(getNextExpr(string, string.indexOf(operations.Add), operations.Add));
    }
    else if (string[0] === '-' && string.indexOf(operations.Subtract) == string.lastIndexOf(operations.Subtract)) {
        console.log(`skipping start with - result: ${string.trim()}`);
        return string;
    }
    else if (string.includes(operations.Subtract)) {
        let indexOfOperator = string.indexOf(operations.Subtract);
        if (string.match(/-.+-/i)) {
            indexOfOperator = string.lastIndexOf(operations.Subtract);
        }
        return evaluate(getNextExpr(string, indexOfOperator, operations.Subtract));
    }
    else {
        console.log(`returning result: ${string.trim()}`);
        //alert(string);
        return string;
    }
}
function getInnerMostExpression(string) {
    let innerExpr = "";
    const subExprStart = string.indexOf('(');
    const subExprEnd = string.indexOf(')');
    if (string.slice(subExprStart, subExprEnd).includes('(')) {
        //console.log('need to find the innermost (');
        //(2.5-6*3.5/(5-2)^3)^-3-10
        console.log(`string: ${string}, string.length: ${string.length} - subExprEnd: ${subExprEnd}`)
        for (let i = 1; i <= string.length - subExprEnd + 2; i++) {
            const char = string[i];
            let subStr = string.slice(subExprStart + i, subExprEnd);
            console.log(`char: ${char} and subStr ${subStr}`)
            if (!subStr.includes('(')) {
                innerExpr = string.slice(subExprStart + i - 1, subExprEnd + 1);
                console.log(`RETURNING INNER EXPRESSION --- ${innerExpr}`);
                return innerExpr;
            }
        }
    }
    else {
        innerExpr = string.slice(subExprStart + i - 1, subExprEnd + 1);
        console.log(`RETURNING INNER EXPRESSION --- ${innerExpr}`);
        return innerExpr;
    }
    console.log(`RETURNING --- ${string}`);
    return string;
}
function getSubStrIndexes(indexOfOperator, string) {
    let startIndex = 0, endIndex = 0, i = 1, adjustment = 0, nextCharIndex = indexOfOperator;
    let matchFound = true;
    //console.log(`starting: string: ${string} and indexOfOperator: ${indexOfOperator}, i: ${i}, and string[nextCharIndex: ${string[nextCharIndex]}`)
    //!Left side of operator
    while (matchFound) {
        nextCharIndex = indexOfOperator - i;
        if (string[indexOfOperator] == '-') {
            matchFound = string[(nextCharIndex > 0) ? nextCharIndex : 0].match(/[0-9.\-e ]/i);

        }
        else {
            matchFound = string[(nextCharIndex > 0) ? nextCharIndex : 0].match(/[0-9.\-e ]/i);
        }
        //console.log(`left --- string: ${string} and indexOfOperator: ${indexOfOperator}, i: ${i}, and string[nextCharIndex]: ${string[nextCharIndex]}`)
        startIndex = nextCharIndex;
        i++;
        if (i > indexOfOperator || (string[startIndex] == '-' && string[(startIndex - 1 >= 0) ? startIndex - 1 : startIndex] != 'e') || startIndex == 0) {
            //console.log('breaking left');
            break;
        }
    }
    //!right side of operator
    i = 1;
    matchFound = true;
    let includeNegativeSign = true, negativeSignCount = 0;
    while (matchFound) {
        nextCharIndex = indexOfOperator + i;
        //console.log(`right --- string: ${string} and indexOfOperator: ${indexOfOperator}, i: ${i}, and string[nextCharIndex]: ${string[nextCharIndex]}`)
        if (string[indexOfOperator] == '^') {
            if (string[nextCharIndex] == '-') {
                negativeSignCount++;
                //console.log(`negCount: ${negativeSignCount}`);
                if (negativeSignCount > 1) {
                    break;
                }
            }
            if (string[indexOfOperator + 1] == '-') {
                matchFound = string[nextCharIndex].match(/[0-9.\- ]/i)
                //console.log(`i-1: ${i} and matchfound: ${matchFound}`);
            }
            else {
                matchFound = string[nextCharIndex].match(/[0-9. ]/i);
                //console.log(`i-2: ${i} and matchfound: ${matchFound}`);
            }
        }
        else if (string[indexOfOperator] == '*' || string[indexOfOperator] == '/') {
            console.log(`matched * or /`);
            if (string[indexOfOperator + 1] == '-') {
                matchFound = string[nextCharIndex].match(/[0-9.\- ]/i)
            }
            else {
                matchFound = string[nextCharIndex].match(/[0-9. ]/i)
            }
        }
        else {
            console.log(`matched - or + or e`);
            matchFound = string[nextCharIndex].match(/[0-9. ]/i)
        }

        if (matchFound && negativeSignCount <= 1) {
            //console.log(`matchfound: ${matchFound}`)
            endIndex = nextCharIndex;
        }
        i++;
        if (i > string.length - indexOfOperator - 1) {
            //console.log('breaking right');
            break;
        }
    }

    // this is a band-aid because I can't figure out how to get the left side of getSubStrIndexes while loop right.
    let firstSubStrExprChar = string.slice(startIndex, endIndex + 1)[0];
    console.log(`string: ${string}, startIndex: ${startIndex}, endIndex: ${startIndex}, and firstSubStrExprChar: ${firstSubStrExprChar}`);
    if (!firstSubStrExprChar.match(/[0-9\-]/i)) {
        startIndex += 1;
    }
    // alert(5);
    console.log(`GETTING INDEXES END --- startIndex: ${startIndex} endIndex: ${endIndex}, and indexOfOperator ${indexOfOperator}`)
    return [startIndex, endIndex];
}
function getNextExpr(string, indexOfOperator, operation) {
    const indexes = getSubStrIndexes(indexOfOperator, string);
    let subStrExpr = string.slice(indexes[0], indexes[1] + 1), subStrExprResult;

    //let , priorToSubStrExpr = (indexes[0] > 0) ? string.slice[0, indexes[0]] : "";
    const n1 = string.slice(indexes[0], indexOfOperator);
    const n2 = string.slice(indexOfOperator + 1, indexes[1] + 1);

    if (operation === operations.Exponentiation) {
        subStrExprResult = exponentiate(n1, n2);
    }
    else if (operation === operations.Multiply) {
        subStrExprResult = multiply(n1, n2);
    }
    else if (operation === operations.Divide) {
        subStrExprResult = divide(n1, n2);
    }
    else if (operation === operations.Add) {
        subStrExprResult = add(n1, n2);
    }
    else if (operation === operations.Subtract) {
        subStrExprResult = subtract(n1, n2);
    }
    //!adding a '+' to subexpressions that start with a negative sign but the result is positive
    let condition1 = operation == '+' || operation == "-", condition2 = parseFloat(subStrExpr) < 0 && parseFloat(subStrExprResult) > 0;
    if (condition1 && condition2) {
        console.log(`ADDING INITIAL '+' --- subStrExpr: ${subStrExpr} and subStrExprResult: ${subStrExprResult}`);
        subStrExprResult = '+' + subStrExprResult;
    }

    //alert(1);
    nextExpr = string.replace(subStrExpr, subStrExprResult);
    nextExpr.replace('^+', '^');

    //!removes initial '-' sign if it is at the beginning of the nextExpr and not part of another expression
    //console.log(`nextExpr: ${nextExpr}`)
    // if (nextExpr[0] == '-' && (nextExpr.slice(1).includes('-') || nextExpr.includes('+') || nextExpr.includes('*') || nextExpr.includes('/') || nextExpr.includes('^'))) {
    //     console.log(`REMOVING INITIAL '-' --- nextExpr: ${nextExpr}`)
    //     nextExpr = nextExpr.slice(1);
    // }
    console.log(`SENDING TO CALCULATE ---- string: ${string}, n1: ${n1} n2: ${n2}, and subStrExprResult ${subStrExprResult}`);
    console.log(`NEXT EXPRESSION ---- ${nextExpr}`);
    return nextExpr;
}
//#endregion 
//#region Testing
const tests = [
    "9-*4", "9+*4", "9/*4", "9^*4", "9-^4", "9-*4", "4--4",
    '5-6*2^3-5*6', "9(5-6)", "0*1", "0*-1", "0^-1", "0/-1", "0-1", "0+-1", "2^0", "-2^0",
    "(2.5-6*3.5/(5-2)^3)^-3-10", "3^2^3", "-2^-3^-4", "2^-3^-4", "(5-6*3)^4-10",
    "-9.313225746154785e-10-4", "-9.313225746154785e-10+4", "-9.313225746154785e-10*4", "-9.313225746154785e-10/4", "-9.313225746154785e-10^4", "-1.0e3/10",
    "4^(1/4)+10", "-4^(3/4)-10", "-4^-(1/4)-10", "4^-(3/4)+10",
    "4^15+10", "-4^15-10", "-4^-15-10", "-4^-15+10",
    '2^3', '-2^3', '2^-3', '-2^-3',
    '4+5', '7-5', '4*5', '4/2',
    '(5+4)/3', '(5+4)*3', '3*5+6-5/4+3', '3.5*5.6+6-5.1/4.4+3', '(3*5)+6-5/(7+3)', '(3-(4+6-5*2))+6-5.1/(4.2+3)', '(3-(4+(6.25-5^-3)*2))+6-5.1/(4.2+3)',
];
const expected = [
    "9-*4", "9+*4", "9/*4", "9^*4", "9-^4", "9-*4", "4--4",
    "-73", "-9", "0", "0", "Infinity", "0", "-1", "-1", "1", "1",
    "-9.804236178711692", "6561", "Imaginary", "1.008594091576999", "28551",
    `${subtract("-9.313225746154785e-10", "4")}`, `${add("-9.313225746154785e-10", "4")}`, `${multiply("-9.313225746154785e-10", "4")}`, `${divide("-9.313225746154785e-10", "4")}`, `${exponentiate("-9.313225746154785e-10", "4")}`, "-100",
    "11.414213562373096", "Imaginary-10", "Imaginary-10", "10.353553390593273",
    "1073741834", "-1073741834", "-10.000000000931323", "9.999999999068677",
    '8', '-8', '0.125', '-0.125',
    "9", "2", "20", "2",
    "3", "27", "22.75", "27.440909090909088", "20.5", "8.291666666666666", '-8.192333333333336',
];
let allPassed = true, pauseAtIteration = 5, stopPauseAtIteration = 9, i = 1;
for (let i = 0; i < tests.length; i++) {
    // if (i >= pauseAtIteration && i < stopPauseAtIteration) {
    //     alert(`Starting Test for: ${tests[i]}`);
    // }
    let actual = calculate(tests[i]);
    if (actual != expected[i]) {
        alert(`Expr: ${tests[i]}, expected: ${expected[i]}, and result: ${actual} \nPassed: ${actual == expected[i]}`);
        allPassed = false;
    }
}
if (allPassed) {
    alert(`All ${tests.length} tests passed!`);
}
//#endregion
// module.exports = evaluate, getSubStrIndexes, getNextExpr;
