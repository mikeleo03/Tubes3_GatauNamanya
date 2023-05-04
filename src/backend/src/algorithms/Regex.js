const type_regex = {
    date : /^((\s*(hari)\s*(apa)?)|\s*)\s*\d{2}[\/-]\d{2}[\/-]\d{4}\s*((hari\s*(apa)?\s*\??)|\??|[^\w\d])$/i,
    calculator : /[\s\(]*\-?\d+(\.\d+)*([-+*/^]+-?\d+(\.\d+)*[\s\)]*)*[\s\)]*(=|\?)?$/,
    add : /(tambahkan|tambah) pertanyaan .+ dengan jawaban .+/i,
    delete : /hapus pertanyaan \S+/i
}

function identify_statement_type(text) {
    for (let type in type_regex) {
        if (type_regex[type].test(text)) {
            if (type == "calculator") {
                if (/[^(\d|\.|+|\-|*|/|\^|\s|\(|\)|=|\?)]/.test(text)) {
                    continue
                }
            }
            return type;
        }
    }
    return "question";
}

export default identify_statement_type;