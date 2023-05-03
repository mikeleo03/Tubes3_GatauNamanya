const precedence = {
    '+' : 0,
    '-' : 0,
    '*' : 1,
    '/' : 1,
    '^' : 2
}

let isPrevOp = false;
let isUnaryNeg = false;

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
                if (isUnaryNeg) {
                    operands.push(Number(curr_operand) * -1);
                } else {
                    operands.push(Number(curr_operand));
                }
                isUnaryNeg = false;
                curr_operand = "";
            }
            operators.push(c);
            isPrevOp = true;
        } 
        else if (c == ')') { // Jika ditemukan kurung tutup, proses sampai ditemukan kurung buka pasangannya
            isPrevOp = false;
            if (curr_operand != "") {
                if (isUnaryNeg) {
                    operands.push(Number(curr_operand) * -1);
                } else {
                    operands.push(Number(curr_operand));
                }
                isUnaryNeg = false;
                curr_operand = "";
            }
            while(operators[operators.length-1] != '(') {
                let success = process(operands,operators);
                if (success == -1) {
                    return "Sintaks persamaan tidak sesuai";
                }
            }
            operators.pop();
        }
        else if (c in precedence) { // Operator
            if (curr_operand != "") {
                if (isUnaryNeg) {
                    operands.push(Number(curr_operand) * -1);
                } else {
                    operands.push(Number(curr_operand));
                }
                isUnaryNeg = false;
                curr_operand = "";
            }
            if (isPrevOp || operands.length == 0) {
                if (c == '-') {
                    isUnaryNeg = !isUnaryNeg;
                } else {
                    operators.push(c);
                }
                continue;
            }
            else if (operators.length != 0 && operators[operators.length-1] != '(' && precedence[c] < precedence[operators[operators.length-1]]) { // Jika presendensi operator sekarang < operator sebelumnya
                let success = process(operands,operators);
                if (success == -1) {
                    return "Sintaks persamaan tidak sesuai";
                }
            } 
            operators.push(c);
            isPrevOp = true;
        }
        else if (/[0-9\.]/.test(c)) { // Operand
            curr_operand += c;
            isPrevOp = false;
        } else {
            return "Sintaks persamaan tidak sesuai";
        }
    }
    if (curr_operand != "") {
        if (isUnaryNeg) {
            operands.push(Number(curr_operand) * -1);
        } else {
            operands.push(Number(curr_operand));
        }
        isUnaryNeg = false;
        curr_operand = "";
    }
    while (operators.length > 0) {
        let success = process(operands,operators);
        if (success == -1) {
            return "Sintaks persamaan tidak sesuai";
        }
    }
    return operands[0];
}

export default calculate;