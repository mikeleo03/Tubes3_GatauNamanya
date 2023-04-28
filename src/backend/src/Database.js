import BooyerMoore from "../src/algorithms/Booyer Moore.js";
import KMP from "../src/algorithms/KMP.js";
import LCS from "../src/algorithms/LCS.js";
import models from "../src/models/Query.js";
import dotenv from 'dotenv';
dotenv.config({ silent: true })

async function find_question(q, algorithm) {
  let qa_database = models.QA.find();
  if (algorithm == "BM") {
    for await (const doc of qa_database) {
      if (BooyerMoore(q, doc.question) != -1)  {
        return doc._id;
      }
    }
  } else {
    for await (const doc of qa_database) {
      if (KMP(q, doc.question) != -1)  {
        return doc._id;
      }
    }
  }
  for await (const doc of qa_database) {
    if (LCS(q, doc.question) >= doc.question.length * 0.9)  {
      return doc._id;
    }
  }
  return -1;
}

async function delete_question(q, algorithm) {
  let id = await find_question(q, algorithm);
  if (id != -1) {
    await models.QA.deleteOne({_id : id});
    return "Pertanyaan " + q + " telah dihapus";
  } else {
    return "Tidak ada pertanyaan " + q + " pada database";
  }
}

async function save_question(q,a,algorithm) {
  let found = await delete_question(q, algorithm);
  const newEntry = await models.QA.create({
    question : q,
    answer : a,
  });
  if (found === "Pertanyaan " + q + " telah dihapus")
    return "Pertanyaan " + q + " sudah ada. Jawaban diupdate ke " + a;
  else 
    return "Pertanyaan " + q + " telah ditambah";
}

async function get_answer(q, algorithm) {
  let id = await find_question(q, algorithm);
  if (id != -1) {
    let answer = await models.QA.findOne({_id : id});
    return answer.answer;
  } else {
    return false;
  }
}

export default { delete_question, save_question, get_answer };