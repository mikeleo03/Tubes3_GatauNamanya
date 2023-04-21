const Database = require("./Database");

const type_regex = {
    date : /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/,
    calculator : /(\(*[0-9]+(\.[0-9]+)?[-+*/%^][0-9]+(\.[0-9]+)?\)*)+/,
    add : /(tambahkan|tambah) pertanyaan \S+ dengan jawaban \S+/i,
    delete : /hapus pertanyaan \S+/i
}

const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

const precedence = {
    '+' : 0,
    '-' : 0,
    '*' : 1,
    '/' : 1,
    '^' : 2
}

function process(operands,operators) {
    if (operands.length <= 1 || operators.length == 0) {
        return 1;
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
        default :
            break;
    }
    return 0;
}

function calculate(equation) {
    let operands = [];
    let operators = [];

    let curr_operand = "";
    
    for (let c of equation) {
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
                if (success == 1) {
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
            if (operators.length == 0 || operators[operators.length-1] == '(' || precedence[c] > precedence[operators[operators.length-1]]) { // Jika presendensi operator sekarang > operator sebelumnya atau daftar operator masih kosong
                operators.push(c);
            } else {
                let success = process(operands,operators);
                if (success == 1) {
                    return "Not valid";
                }
            }
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
        if (success == 1) {
            return "Not valid";
        }
    }
    return operands[0];
}

function identify_statement_type(text) {
    for (type in type_regex) {
        if (type_regex[type].test(text)) {
            return type;
        }
    }
    return "question";
}

async function action(text) {
    type = identify_statement_type(text);
    let q,a = "";
    switch (type) {
        case "date" :
            let split_date = text.split("/");
            let d = new Date(split_date[1] + "/" + split_date[0] + "/" + split_date[2]);
            return days[d.getDay()];
        case "calculator" :
            return calculate(text);
        case "add" :
            text = text.replace(/(tambahkan|tambah) pertanyaan /i, "").replace(/dengan jawaban /i, "").trim().split(" ");
            q = text[0];
            a = text[1];
            await Database.save_question(q,a);
            return "Pertanyaan " + q + " ditambahkan dengan jawaban " + a;
        case "delete" :
            text = text.replace(/hapus pertanyaan /i, "").trim();
            q = text;
            a = await Database.delete_question(q);
            return a;
        default :
            a = await Database.get_answer(text);
            return a;
    }
}

exports.action = action;