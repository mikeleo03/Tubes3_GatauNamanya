const Database = require("../Database");
const Regex = require("../../Regex");
const Calculate = require("./Calculate");

const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

async function action(text) {
    type = Regex.identify_statement_type(text);
    let q,a = "";
    switch (type) {
        case "date" :
            let split_date = text.split("/");
            let d = new Date(split_date[1] + "/" + split_date[0] + "/" + split_date[2]);
            return days[d.getDay()];
        case "calculator" :
            return Calculate.calculate(text);
        case "add" :
            text = text.replace(/(tambahkan|tambah) pertanyaan /i, "").replace(/dengan jawaban /i, ",").trim().split(",");
            q = text[0].toLowerCase().trim();
            a = text[1].trim();
            await Database.save_question(q,a);
            return "Pertanyaan " + q + " ditambahkan dengan jawaban " + a;
        case "delete" :
            text = text.replace(/hapus pertanyaan /i, "").trim();
            q = text.toLowerCase();
            a = await Database.delete_question(q);
            return a;
        default :
            a = await Database.get_answer(text.toLowerCase());
            return a;
    }
}

exports.action = action;