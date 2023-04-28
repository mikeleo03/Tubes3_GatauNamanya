import Database from "../Database.js";
import Regex from "./Regex.js";
import Calculate from "./Calculate.js";

const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

async function getAnswer(text, algorithm) {
    let type = Regex(text);
    let q,a = "";
    switch (type) {
        case "date" :
            let split_date = text.replace(/\s*((hari)?\s*(apa)?)?\s*/i, "").split("/");
            split_date[2] = split_date[2].substring(0,4);
            let d = new Date(split_date[1] + "/" + split_date[0] + "/" + split_date[2]);
            return "Hari " + days[d.getDay()];

        case "calculator" :
            return Calculate(text);

        case "add" :
            text = text.replace(/(tambahkan|tambah) pertanyaan /i, "").replace(/dengan jawaban /i, ",").trim().split(",");
            q = text[0].toLowerCase().trim();
            a = text[1].trim();
            let res = await Database.save_question(q,a,algorithm);
            return res;

        case "delete" :
            text = text.replace(/hapus pertanyaan /i, "").trim();
            q = text.toLowerCase();
            a = await Database.delete_question(q,algorithm);
            return a;

        default :
            a = await Database.get_answer(text.toLowerCase(),algorithm);
            return a;
    }
}

export default getAnswer;