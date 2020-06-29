function evaluate(string) {
    //this evaluates the users input.  
    //must not contain alpha chars
    let calculation = "";   
    const operators = ['(',')','*','/','+','-'];
    for (let index = 0; index < string.length; index++) {
        const char = string[index];
        const isOperator = operators.includes(char);
        alert(`operator: ${char} and isOperator: ${isOperator}`);
        alert()
    }
    return calculation;
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
//alert(divide(5,0));
alert(evaluate('(3*5)+6-5/(4+3)'))