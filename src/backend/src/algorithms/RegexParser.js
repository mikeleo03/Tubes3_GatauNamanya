import Database from "../Database.js";
import Regex from "./Regex.js";
import Calculate from "./Calculate.js";

const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

async function getAnswer(text, algorithm) {
    let split_text = text.split(";");
    let responses = [];
    for (let t of split_text) {
        t = t.trim();
        let type = Regex(t);
        let q,a = "";
        switch (type) {
            case "date" :
                let split_date = t.replace(/\s*((hari)?\s*(apa)?)?\s*/i, "").split("/");
                split_date[2] = split_date[2].substring(0,4);
                let d = new Date(split_date[1] + "/" + split_date[0] + "/" + split_date[2]);
                responses.push("Hari " + days[d.getDay()]);
                break;
            case "calculator" :
                t = t.replace("=", "");
                responses.push(Calculate(t));
                break;
            case "add" :
                t = t.replace(/(tambahkan|tambah) pertanyaan /i, "").replace(/dengan jawaban /i, ",").trim().split(",");
                q = t[0].toLowerCase().trim();
                a = t[1].trim();
                let res = await Database.save_question(q,a,algorithm);
                responses.push(res);
                break;
            case "delete" :
                t = t.replace(/hapus pertanyaan /i, "").trim();
                q = t.toLowerCase();
                a = await Database.delete_question(q,algorithm);
                responses.push(a);
                break;
            default :
                a = await Database.get_answer(t.toLowerCase(),algorithm);
                responses.push(a);
                break;
        }
    }
    return responses;
}

export default getAnswer;