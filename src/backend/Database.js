const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const BooyerMoore = require("./Booyer Moore");
const { get } = require('http');
const uri = "mongodb+srv://T5vh1Hihi:Pq0xnCW9Fnd59dGx@cluster0.jnraskc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect();

let db = client.db("simple_gpt");
let coll = db.collection("question");

console.log("Connect successful");

async function find_question(q, type) {
  const cursor = coll.find({});
  if (type == "BM") {
    for await (const doc of cursor) {
      if (BooyerMoore.booyer_moore(q, doc["question"]) != -1)  {
        return doc["_id"];
      }
    }
    return -1;
  }
}

async function delete_question(q, type="BM") {
  let id = await find_question(q, type);
  if (id != -1) {
    coll.deleteOne({ _id : id});
    return 0;
  } else {
    return -1;
  }
}

async function save_question(q,a,type="BM") {
  const QA = {
    question : q,
    answer : a
  }
  await delete_question(q, type);
  const result = await coll.insertOne(QA);
}

async function get_answer(q, type="BM") {
  let id = await find_question(q, type);
  if (id != -1) {
    let answer = await coll.findOne({_id : id});
    return answer["answer"];
  } else {
    return -1;
  }
}

exports.find_question = find_question;
exports.delete_question = delete_question;
exports.save_question = save_question;
exports.get_answer = get_answer;