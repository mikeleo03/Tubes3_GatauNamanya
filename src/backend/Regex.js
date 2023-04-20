const statement_types = {
    date : /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/,
    calculator : /(\(*[0-9]+[-+*/%^][0-9]+\)*)+/,
    add : /[(tambahkan)(tambah)] pertanyaan \S+ dengan jawaban \S+/i,
    delete : /hapus pertanyaan \S+/i
}

const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

function identify_statement_type(text) {
    for (type in statement_types) {
        if (statement_types[type].test(text)) {
            return type;
        }
    }
    return "question";
}

function action(text) {
    type = identify_statement_type(text);
    switch (type) {
        case "date" :
            let split_date = text.split("/");
            let d = new Date(split_date[1] + "/" + split_date[0] + "/" + split_date[2]);
            console.log(days[d.getDay()])
            return days[d.getDay()];
        case "calculator" :
            console.log("calc");
            break;
        case "add" :
            console.log("add");
            break;
        case "delete" :
            console.log("delete");
            break;
        default :
            console.log("pertanyaan");
            break;
    }
}

action("20/04/2023");