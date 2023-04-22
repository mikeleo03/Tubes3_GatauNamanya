const precedence = {
    '+' : 0,
    '-' : 0,
    '*' : 1,
    '/' : 1,
    '^' : 2
}

function process(operands,operators) {
    if (operands.length <= 1 || operators.length == 0) {
        return -1;
    }
    let b = operands.pop();
    let a = operands.pop();
    let op = operators.pop();
    switch (op) {
        case '+' :
            operands.push(a+b);
            break;
        case '-' :
            operands.push(a-b);
            break;
        case '*' :
            operands.push(a*b);
            break;
        case '/' :
            operands.push(a/b);
            break;
        case '^' :
            operands.push(Math.pow(a,b));
            break;
    }
    return 0;
}

function calculate(equation) {
    let operands = [];
    let operators = [];

    let curr_operand = "";
    
    for (let c of equation) {
        if (c == ' ') {
            continue;
        }
        if (c == '(') {
            if (curr_operand != "") {
                operands.push(Number(curr_operand));
                curr_operand = "";
            }
            operators.push(c);
        } 
        else if (c == ')') { // Jika ditemukan kurung tutup, proses sampai ditemukan kurung buka pasangannya
            if (curr_operand != "") {
                operands.push(Number(curr_operand));
                curr_operand = "";
            }
            do {
                let success = process(operands,operators);
                if (success == -1) {
                    return "Not valid";
                }
            } while(operators[operators.length-1] != '(');
            operators.pop();
        }
        else if (c in precedence) { // Operator
            if (curr_operand != "") {
                operands.push(Number(curr_operand));
                curr_operand = "";
            }
            if (operators.length != 0 && operators[operators.length-1] != '(' && precedence[c] < precedence[operators[operators.length-1]]) { // Jika presendensi operator sekarang < operator sebelumnya
                let success = process(operands,operators);
                if (success == -1) {
                    return "Not valid";
                }
            } 
            operators.push(c);
        }
        else { // Operand
            curr_operand += c;
        }
    }
    if (curr_operand != "") {
        operands.push(Number(curr_operand));
        curr_operand = "";
    }
    while (operators.length > 0) {
        let success = process(operands,operators);
        if (success == -1) {
            return "Not valid";
        }
    }
    return operands[0];
}

exports.calculate = calculate;