import Database from "../Database.js";
import Regex from "./Regex.js";
import Calculate from "./Calculate.js";

const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

async function getAnswer(text, algorithm) {
    let split_text = text.split(";");
    let responses = [];
    for (let i = 0; i < split_text.length; i++) {
        let t = split_text[i].trim();
        let type = Regex(t);
        let q,a = "";
        switch (type) {
            case "date" :
                let split_date = t.replace(/Hari/i, "").replace(/apa/i, "").replace("?","").split("/");
                let d = new Date(split_date[1].trim() + "/" + split_date[0].trim() + "/" + split_date[2].trim());
                if (d.getDate().toString() != Number(split_date[0].trim()) || 
                (d.getMonth()+1).toString() != Number(split_date[1].trim()) || 
                d.getFullYear().toString() != Number(split_date[2].trim()) || days[d.getDay()] == undefined) {
                    a = "Tanggal tidak valid";
                    break;
                }
                a = "Hari " + days[d.getDay()];
                break;
            case "calculator" :
                let idx = t.indexOf("=");
                if (idx == -1) {
                    idx = t.indexOf("?");
                }
                if (idx != -1) {
                    for (let i = idx+1; i < t.length; i++) {
                        if (t[i] != " ") {
                            a = "Sintaks persamaan tidak sesuai";
                            break;
                        }
                    }
                }
                if (a == "") {
                    t = t.replace("=", "").replace("?","");
                    a = String(Calculate(t));
                }
                break;
            case "add" :
                t = t.replace(/(tambahkan|tambah) pertanyaan /i, "").replace(/dengan jawaban /i, ",").trim().split(",");
                q = t[0].trim();
                a = t[1].trim();
                let res = await Database.save_question(q,a,algorithm);
                a = res;
                break;
            case "delete" :
                t = t.replace(/hapus pertanyaan /i, "").trim();
                q = t;
                a = await Database.delete_question(q,algorithm);
                break;
            default :
                if (t.trim() === "") {
                    a = "Pertanyaan kosong";
                    break;
                }
                a = await Database.get_answer(t,algorithm);
                break;
        }
        if (i < split_text.length) {
            a += "\n";
        }
        responses.push(a);
    }
    return responses;
}

export default getAnswer;