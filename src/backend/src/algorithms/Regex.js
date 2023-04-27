const type_regex = {
    date : /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/,
    calculator : /(\s*\(*\s*[0-9]+(\.[0-9]+)?\s*[-+*/%^]\s*[0-9]+(\.[0-9]+)?\s*\)*\s*)+/,
    add : /(tambahkan|tambah) pertanyaan .+ dengan jawaban .+/i,
    delete : /hapus pertanyaan \S+/i
}

function identify_statement_type(text) {
    for (let type in type_regex) {
        if (type_regex[type].test(text)) {
            return type;
        }
    }
    return "question";
}

export default identify_statement_type;