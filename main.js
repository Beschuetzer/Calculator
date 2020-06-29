const operations = {
    Add: '+',
    Divide: '/',
    Multiply: '*',
    Subtract: '-',
}
const operators = ['(',')','*','/','+','-'];

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

function evaluateParentheses(string) {
    //evaluates the expressions in the parentheses and returns a string
    if(!string.includes('(') && !string.includes(')')){
        alert(`string: ${string} doesn't contain ( or ).`)
        return string;
    }
    else {
        const startIndex = -1, endIndex = string.length - 1, charCounts;
        tempStr = string;
        //Adjust the while condition to stop when string no longer contains '('?
        while (!tempStr.substring(startIndex+1,endIndex).includes(')')) {
            //Getting the potential substring (first '(' and ')' with everything in between)
            const startIndex = string.indexOf('(');
            const endIndex = string.indexOf(')');
            tempStr = string.substring(startIndex+1, endIndex);

            charCounts = characterCount(tempStr)
            if (charCounts['('] === charCounts[')']) {
                //we got a valid expression
                const n1, n2, operator;
                operatorIndex = 
                n1 = 
                evaluate()

            } else {
                //we need to expand the search to the next () by changing the start index
            }
        }
    }
}

function evaluateMultiplyAndDivide(string) {
    //evaluates the * and / and returns a string

}

function evaluateSubtractionAndAddition(string) {
    //evaluates the + and - and returns a string

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

function add(n1,n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2){
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
    },{});   
}
//#endregion
const expr = "(3*5)+6-5/(4+3)";
const expr2 = "3*5+6-5/4+3";
// console.table(characterCount('3*5+6-5/4+3'));
console.log(evaluate(expr));
//lert(`includes: ${"1{3(4".indexOf('(')}`);