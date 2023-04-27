import BooyerMoore from "../src/algorithms/Booyer Moore.js";
import KMP from "../src/algorithms/KMP.js";
import models from "../src/models/Query.js";
import dotenv from 'dotenv';
dotenv.config({ silent: true })

async function find_question(q, type) {
  if (type == "BM") {
    for await (const doc of models.QA.find()) {
      if (BooyerMoore(q, doc.question) != -1)  {
        return doc._id;
      }
    }
    return -1;
  }
}

async function delete_question(q, type="BM") {
  let id = await find_question(q, type);
  if (id != -1) {
    await models.QA.deleteOne({_id : id});
    return 0;
  } else {
    return -1;
  }
}

async function save_question(q,a,type="BM") {
  await delete_question(q, type);
  const newEntry = await models.QA.create({
    question : q,
    answer : a,
  });
}

async function get_answer(q, type="BM") {
  let id = await find_question(q, type);
  if (id != -1) {
    let answer = await models.QA.findOne({_id : id});
    return answer.answer;
  } else {
    return -1;
  }
}

export default { delete_question, save_question, get_answer };