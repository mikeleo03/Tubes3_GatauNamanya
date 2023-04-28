import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({

    question : {
        type : String,
        require : true,
        unique : true,
    },

    answer : {
        type : String,
        require : true,
        unique : false,
    },

});

const QA = mongoose.model('quest_ans', QuestionSchema);

export default QA;