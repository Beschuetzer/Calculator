// import Big from '../big.js/big.js';// big = new Big();
// x = new Big(2);
// y = new Big(3);
// z = x.div(y)                       // "0.6666666667"
// z2 = z.sqrt()                           // "0.8164965809"
// z3 = z.pow(-3)                          // "3.3749999995"
// z4 = z.times(z)                         // "0.44444444448888888889"
// z5 = z.times(z).round(10)               // "0.4444444445"
// alert(`${z}, ${z2}, ${z3}, ${z4}, ${z5}`);
// alert(getIndexForSubtract("-4.52e-5/3e-5.4-10"))
// alert(getIndexForSubtract("-4.52e-5-10/3e-5.4-4.52e-5/3e-5.4"))
//alert(`exponentiate: ${exponentiate("452", "3e-5.4")} `);
// alert(`multiply: ${ multiply("452", "3e-5.4") } `);
// alert(`divide: ${ divide("452", "3e-5.4") } `);
// alert(`add: ${ add("452", "3e-5.4") } `);
// alert(`subtract: ${ subtract("452", "3e-5.4") } `);//#endregion 
//todo fix bug 2 inputs one key press by focus change event listener on textbox and global variable?
//todo bug that trigger undo when pressing 'enter'
//todo change when clicking button it expands like keypress
//todo add fn in evaluate of calculate to see if expr has 'e-' and then return the proper indexOfOperator value

//#region Initialization Stuff
let iterations = 0;
const maxIterations = 425;

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
let eUsageCount = 0, eMsg = "Note:'e' is a shortcut for '*10^'\nIt DOES NOT mean 2.718281828";
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
            if (eUsageCount <= 0) {
                alert(`${eMsg}`);
            }
            eUsageCount++;
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
    console.log(`sourceID: ${e.srcElement.id}`);
    button = document.getElementById(e.srcElement.id);
    button.classList.add('button_press');
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
            if (eUsageCount <= 0) {
                alert(`${eMsg}`);
            }
            eUsageCount++;
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
    e.target.classList.remove('button_press');
}
//#endregion
//#region Helper Fn
function operatorsPrint(operator) {

    if (operator == '.') {
        numbers = textbox.value.split(/[*\-+^/e()]/i);
        if (!numbers[numbers.length - 1].includes('.')) {
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
        if (!(c in obj)) {
            obj[c] = 0;
        }
        obj[c]++;
        return obj;
    }, {});
}
function stopExecution(msg) {
    textbox.value = msg;
    //throw new Error(msg);
}
function inputHandling(string) {
    //! Changing Input to Workable Form

    let msg = `Illegal Operator Found`, shouldContinue = false;
    if (string.match(/[\-\+*\/\^e]{3,}/)) {     //three operators in a row (don't even try to figure out)
        stopExecution("Three Operators in a Row Found");
        return ["", shouldContinue];
    }
    string = string.replace(' ', '');
    string = string.replace(/([0-9])\(/i, '$1*\(');    //convert 9(n1-n2) to 9*(n1-n2)
    string = string.replace(/\)([0-9])/i, '\)*$1');    //convert (n1-n2)9 to (n1-n2)*9
    string = string.replace(/\+\-/i, '-');   //
    string = string.replace(/\-\+/i, '-');   //
    string = string.replace(/\+\+/i, '+');   //
    string = string.replace(/\-\-/i, '+');   //
    string = string.replace(/\/\//i, '/');   //

    let plusSignMatch = string.match(/[\^\/*\-\+][\+]/);
    if (plusSignMatch) {
        //console.log(`replacing: ${plusSignMatch}`);
        //alert(`replacing: ${plusSignMatch} with ${plusSignMatch[0][0]}`);
        string = string.replace(plusSignMatch, plusSignMatch[0][0]);
    }

    console.log(`string after replaces: ${string}`);
    //! Handling Unusable Input
    if (string.match(/[^0-9e\-+*^\/\(\)\.]/i)) {       //catches invalid chars
        stopExecution(msg);
        //alert(1);
    }
    else if (string.match(/[+*]{2,}/i)) {               //'++', '+*', '*+', and '**'
        if (string.includes('**')) {
            msg = "Use '^' for exponentiation not '**'.";
        }
        stopExecution(msg);
        //alert(2);
    }
    else if (string.match(/[\^\-\+\/][^0-9\(\)\-]/i)) {      //'-
        stopExecution(msg);
        //alert(3);
    }
    else if (string.match(/[*][^\-\+0-9\()]/i)) {
        stopExecution(msg);
        //alert(4);
    }
    else {
        shouldContinue = true;
        //alert(`Continuing`);
    }
    return [string, shouldContinue];
}
function handleE(n1, n2, n1Replace, n2Replace) {
    let tempn1, tempn2;
    if (n1Replace) {
        tempn1 = n1.replace('e', '*10^');
        n1 = calculate(tempn1);
    }
    if (n2Replace) {
        tempn2 = n2.replace('e', '*10^');
        n2 = calculate(tempn2);
    }
    console.log(`tempn1: ${tempn1} and new n1: ${n1}\ntempn2: ${tempn2} and new n2: ${n2}`);
    return [n1, n2];
}
//#endregion
//#region Main Logic
function calculate(string) {
    //this evaluates the users input;  the function called directly.  
    //must not contain alpha chars
    //alert(`CALCULATING -------------- : ${string}`);
    let msg, shouldContinue;
    const characterCounts = characterCount(string);
    console.log(`\nCALCULATING -------------- : ${string}`);
    const results = inputHandling(string);
    string = results[0], shouldContinue = results[1];
    console.log(`shouldContinue: ${shouldContinue} and NEW STRING: ${string}`);
    if (shouldContinue) {
        if (characterCounts['('] === characterCounts[')']) {
            parenthesesHandled = evaluateParentheses(string);
            let result = evaluateParentheses(parenthesesHandled);
            textbox.value = result;
            console.log(`Iterations needed: ${iterations}`);
            return result;
        } else {
            msg = "Error.  Parentheses Mismatch";
            textbox.value = msg;
            return msg;
        }
    }
    else {
        return "Stopped";
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
        const nextExpr = string.replace(subStr, evaluate(subStrExpr));
        console.log(`NEXTEXPR in EVALUATE PARAENTHESES: ${nextExpr}`);
        if (nextExpr.includes('(')) {
            return evaluateParentheses(nextExpr);
        } else {
            return evaluate(nextExpr);
        }
    }
}
function evaluate(string) {
    //alert('evaluating');
    let minusMatches = string.match(/\-/ig);
    let minusCount = minusMatches != null ? minusMatches.length : 0;
    iterations++;
    if (iterations > maxIterations) {
        throw new Error('Too many Iterations');
    }

    if (string[0] == '+') {
        string = string.slice(1);
    }
    if (string.match(/^\s*\-*[0-9]\.*[0-9]*e[\-+]*\s*[0-9]*$/) || string.match(/Imaginary/i)) {
        console.log(`STOPPING HERE-- - with ${string} `);
        let msg = "Imaginary";
        textbox.value = string;
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
    //todo need to modify to consider case of more than two -
    else if (minusCount <= 2 && string[0] === '-' && (string.indexOf(operations.Subtract) == string.lastIndexOf(operations.Subtract) || (string.indexOf('e') != -1) ? string[string.indexOf('e') + 1] == '-' : false)) {
        console.log(`FINISHED CALCULATING DUE TO E-- - : ${string.trim()} `);
        return string;
    }
    else if (string.includes(operations.Subtract)) {
        let indexOfOperator = getIndexForSubtract(string);
        return evaluate(getNextExpr(string, indexOfOperator, operations.Subtract));
    }
    else {
        console.log(`FINISHED CALCULATING-- -: ${string.trim()} `);
        return string;
    }
}
function getIndexForSubtract(string) {
    let indexOfOperator = string.indexOf(operations.Subtract);
    if (string.includes('e') && string.indexOf(operations.Subtract) != string.lastIndexOf(operations.Subtract)) {
        let possibleIndexes = new Set();
        let invalidIndexes = new Set();
        invalidIndexes.add(0);
        //!Populating possibleIndexes
        const regex = /\-/ig;
        while ((result = regex.exec(string))) {
            possibleIndexes.add(result.index);
        }

        //!Populating invalidIndexes
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            if (char == 'e' & string[i + 1] == '-') {
                invalidIndexes.add(i + 1);
            }
        }
        //todo get the difference between the two arrays...
        let intersect = new Set([...possibleIndexes].filter(i => !invalidIndexes.has(i)));
        const intersectValues = intersect.values();
        indexOfOperator = intersectValues.next().value;
        //alert(`index: ${ indexOfOperator }, possible: ${ possibleIndexes } and invalid: ${ invalidIndexes } \ndifference: ${ intersect } `);
    }
    else if (string.match(/\-.+\-/i)) {
        indexOfOperator = string.lastIndexOf(operations.Subtract);
    }
    return indexOfOperator;
}
function getInnerMostExpression(string) {
    let innerExpr = "";
    const subExprStart = string.indexOf('(');
    const subExprEnd = string.indexOf(')');
    if (string.slice(subExprStart, subExprEnd).includes('(')) {
        console.log(`starting index: ${subExprStart}, string: ${string}, string.length: ${string.length}, and subExprEnd: ${subExprEnd} `)
        for (let i = 1; i <= subExprEnd - subExprStart - 1; i++) {
            const char = string[i];
            let subStr = string.slice(subExprStart + i, subExprEnd);
            console.log(`char: ${char} and subStr ${subStr} `)
            if (!subStr.includes('(')) {
                innerExpr = string.slice(subExprStart + i - 1, subExprEnd + 1);
                console.log(`RETURNING INNER EXPRESSION-- - ${innerExpr} `);
                return innerExpr;
            }
            console.log(`i: ${i} and end condition: ${string.length - subExprEnd + 2}`);
        }
    }
    else {
        innerExpr = string.slice(subExprStart + i - 1, subExprEnd + 1);
        console.log(`RETURNING INNER EXPRESSION-- - ${innerExpr} `);
        return innerExpr;
    }
    console.log(`RETURNING-- - ${string} `);
    return string;
}
function getSubStrIndexes(indexOfOperator, string) {    
    let startIndex = 0, endIndex = 0, i = 1, adjustment = 0, nextCharIndex = indexOfOperator;
    let matchFound = true, operator = string[indexOfOperator];
    //!Left side of operator
    while (matchFound) {
        nextCharIndex = indexOfOperator - i;
        if (i == 1) {
            matchFound = string[(nextCharIndex > 0) ? nextCharIndex : 0].match(/[0-9\) ]/i);
        }
        else {
            matchFound = string[(nextCharIndex > 0) ? nextCharIndex : 0].match(/[0-9\.\-e ]/i);
        }
        // }
        if (matchFound) {
            startIndex = nextCharIndex;
        }
        //console.log(`left-- - STARTINDEX: ${ startIndex }, string: ${ string } and indexOfOperator: ${ indexOfOperator }, i: ${ i }, and string[nextCharIndex]: ${ string[nextCharIndex] } `)
        i++;
        if (i > indexOfOperator || (string[startIndex] == '-' && string[(startIndex - 1 >= 0) ? startIndex - 1 : startIndex] != 'e') || startIndex == 0) {
            //console.log('breaking left');
            break;
        }
    }
    //!right side of operator
    i = 1;
    matchFound = true;
    let includeNegativeSign = false, negativeSignCount = 0;
    while (matchFound) {
        nextCharIndex = indexOfOperator + i;
        //console.log(`right-- - string: ${ string } and indexOfOperator: ${ indexOfOperator }, i: ${ i }, and string[nextCharIndex]: ${ string[nextCharIndex] } `)
        if (operator == '^') {
            if (string[nextCharIndex] == '-') {
                negativeSignCount++;
                includeNegativeSign = true;
                //console.log(`negCount: ${ negativeSignCount } `);
            }
            //452^3e-5-10   and 
            if (includeNegativeSign) {
                if (string[nextCharIndex + 1].match(/[0-9]/i) && string[indexOfOperator + 1] != '-' && string[nextCharIndex - 1] != 'e') {
                    //console.log(`breaking for negative`);
                    break;
                }
                matchFound = string[nextCharIndex].match(/[0-9.\-\( ]/i);
                includeNegativeSign = false;
                //console.log(`i - 1: ${i} and matchfound: ${matchFound} `);

            }
            else if (string[nextCharIndex] == 'e') {
                includeNegativeSign = true;
                matchFound = string[nextCharIndex].match(/[0-9.e\( ]/i);
                //console.log(`i - 2: ${i} and matchfound: ${matchFound} `);

            }
            else {
                matchFound = string[nextCharIndex].match(/[0-9.\( ]/i);
                //console.log(`i - 3: ${i} and matchfound: ${matchFound} `);
            }
        }
        else if (operator == '*' || operator == '/') {
            //console.log(`matched * or / `);
            if (string[nextCharIndex] == 'e' && string[nextCharIndex + 1] == '-') {
                includeNegativeSign = true;
            }

            if (string[indexOfOperator + 1] == '-') {
                //console.log(`branch 1`);
                if (true) {
                    //todo have to exclude - if e isn't present to the right
                }
                matchFound = string[nextCharIndex].match(/[0-9.e\- ]/i);
            }

            else {
                //console.log(`branch: 2`);
                if (includeNegativeSign) {
                    //todo figure out how to inclue '...1e-5' case and exclude ...1-5
                    matchFound = string[nextCharIndex].match(/[0-9.e\- ]/i);
                    if (string[nextCharIndex] == '-') {
                        includeNegativeSign = false;
                    }
                    //console.log(`branch: 2 - 1\nstring[nextCharIndex]: ${string[nextCharIndex]} \n matchFound: ${matchFound} `);
                    //alert(`branch: 2 - 1\nstring[nextCharIndex]: ${ string[nextCharIndex] } \n matchFound: ${ matchFound } `);
                }
                else {
                    matchFound = string[nextCharIndex].match(/[0-9.e ]/i);
                }
            }
        }
        else if (operator == '+' || operator == '-') {
            //console.log(`matched - or + or e`);
            if (includeNegativeSign) {
                matchFound = string[nextCharIndex].match(/[0-9.\-\(\ ]/i);
                includeNegativeSign = false;
            }
            else if (string[nextCharIndex] == 'e') {
                includeNegativeSign = true;
            }
            else {
                matchFound = string[nextCharIndex].match(/[0-9.e\( ]/i);
            }

        }

        if (matchFound && negativeSignCount <= 1) {
            endIndex = nextCharIndex;
            //console.log(`SAVING ENDINDEX --- matchfound: ${matchFound} and endIndex: ${endIndex} `)
        }

        i++;
        if (i > string.length - indexOfOperator - 1 || negativeSignCount > 1) {
            //console.log('breaking right');
            break;
        }
    }
    return [startIndex, endIndex];
}
function getNextExpr(string, indexOfOperator, operation) {
    const indexes = getSubStrIndexes(indexOfOperator, string);
    let subStrExpr = string.slice(indexes[0], indexes[1] + 1), subStrExprResult;
    let n1 = string.slice(indexes[0], indexOfOperator);
    let n2 = string.slice(indexOfOperator + 1, indexes[1] + 1);
    let n1Replace = n1.includes('e');
    let n2Replace = n2.includes('e');
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
        console.log(`ADDING INITIAL '+' -- - subStrExpr: ${subStrExpr} and subStrExprResult: ${subStrExprResult} `);
        subStrExprResult = '+' + subStrExprResult;
    }
    nextExpr = string.replace(subStrExpr, subStrExprResult);
    nextExpr.replace('^+', '^');
    console.log(`SENDING TO CALCULATE----string: ${string}, operation: ${operation}, n1: ${n1} n2: ${n2}, and subStrExprResult ${subStrExprResult} \nNEXT EXPRESSION----${nextExpr} `);
    return nextExpr;
}
//#endregion
//#region Testing
const tests = [
    "10e5", "1.4e-5", "5^32",
    "-9.313225746154785e-10-4", "-9.313225746154785e-10+4", "(-9.313225746154785e-10)*4", "-9.313225746154785e-10/4", "-9.313225746154785e-10^4", "-1.0e3/10",
    "9*&#2", "9*+-2", "9/+-2", "9-+*2", "9^+-2", "9e+-2",
    "9*^4", "9*/4", "9**4", "9*e4", "9*+4", "9*-4",
    "9/^4", "9/*4", "9//4", "9/e4", "9/+4", "9/-4",
    "9^*4", "9^/4", "9^e4", "9^^4", "9^+4", "9^-4",
    "9+*4", "9+/4", "9+^4", "9+e4", "9.5+-4", "(2.5+3.5)*2++4",
    "9-*4", "9-/4", "9-+4", "9-e4", "9-^4", "(2.5-3.5)*-2--4",
    '5-6*2^3-5*6', "9(5-6)", "0*1", "0*-1", "0^-1", "0/-1", "0-1", "0+-1", "2^0", "-2^0",
    "(2.5-6*3.5/(5-2)^3)^-3-10", "3^2^3", "-2^-3^-4", "2^-3^-4", "(5-6*3)^4-10",
    "4^(1/4)+10", "-4^(3/4)-10", "-4^-(1/4)-10", "4^-(3/4)+10",
    "4^15+10", "-4^15-10", "-4^-15-10", "-4^-15+10",
    '2^3', '-2^3', '2^-3', '-2^-3',
    '4+5', '7-5', '4*5', '4/2',
    '(5+4)/3', '(5+4)*3',"(5+4)3","3(5+4)", '3*5+6-5/4+3', '3.5*5.6+6-5.1/4.4+3', '(3*5)+6-5/(7+3)', '(3-(4+6-5*2))+6-5.1/(4.2+3)', '(3-(4+(6.25-5^-3)*2))+6-5.1/(4.2+3)', 
    "452-(3e-5)", "43-66-22.2--452^(3e-5)", "452-3*10^-5", "43-66-22.2--452e-4^(3e-5)",
    "452*3e-5-8", ".013560000000000001-8", "6.89e-5+8.744e-8*(3.5e6+9.33)/(2^3-(6/3+((4/2^3+3.5)*6/(3^2-3)-5e-10+(1/5e10))))",
    // "4.52e-5/3e-5.4", "452/3e-5.4-2.1-6.3",
];
const expected = [
    "10e5", "1.4e-5", "2.3283064365386964e+22",
    `${subtract("-9.313225746154785e-10", "4")}`, `${add("-9.313225746154785e-10", "4")}`, `${multiply("-9.313225746154785e-10", "4")}`, `${divide("-9.313225746154785e-10", "4")}`, `${exponentiate("-9.313225746154785e-10", "4")}`, "-100",
    "Stopped", "Stopped", "Stopped", "Stopped", "Stopped", "Stopped",
    "Stopped", "Stopped", "Stopped", "Stopped", "36", "-36",
    "Stopped", "Stopped", "2.25", "Stopped", "2.25", "-2.25",
    "Stopped", "Stopped", "Stopped", "Stopped", "6561", "0.00015241579027587258",
    "Stopped", "Stopped", "Stopped", "Stopped", "5.5", "16",
    "Stopped", "Stopped", "5", "Stopped", "Stopped", "6",
    "-73", "-9", "0", "0", "Infinity", "0", "-1", "-1", "1", "1",
    "-9.804236178711692", "6561", "Imaginary", "1.008594091576999", "28551",
    "11.414213562373096", "Imaginary-10", "Imaginary-10", "10.353553390593273",
    "1073741834", "-1073741834", "-10.000000000931323", "9.999999999068677",
    '8', '-8', '0.125', '-0.125',
    "9", "2", "20", "2",
    "3", "27", "27","27", "22.75", "27.440909090909088", "20.5", "8.291666666666666", '-8.192333333333336',
    "451.99997", "-44.19981657271387", "451.99997", "-44.200092895430714",
    "-7.98644", "-7.98644", "0.1530893078708751",
    // "3.784575557", "37845747.16807771",
];
let runTests = 1;
let allPassed = true, pauseAtIteration = 5, stopPauseAtIteration = 9, i = 1, expectedLength = expected.length, testsLength = tests.length;
if (runTests) {
    if (expectedLength != testsLength) {
        alert(`Expected size differs from tests\testsLength: ${testsLength} and expectedLength: ${expectedLength} `)
    }
    for (let i = 0; i < tests.length; i++) {
        // if (i >= pauseAtIteration && i < stopPauseAtIteration) {
        //     alert(`Starting Test for: ${ tests[i] } `);
        // }
        let actual = calculate(tests[i]);
        if (actual != expected[i]) {
            alert(`Expr: ${tests[i]}, expected: ${expected[i]}, and result: ${actual} \nPassed: ${actual == expected[i]} \ntestsLength: ${testsLength} at test: ${i} `);
            allPassed = false;
        }
    }
    if (allPassed) {
        alert(`All ${tests.length} tests passed!`);
    }
}
//#endregion
// module.exports = evaluate, getSubStrIndexes, getNextExpr;
