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

const HistorySchema = new mongoose.Schema({

    user_id : {
        type : String,
        require : true,
        unique : true,
    },

    question : {
        type : String,
        require : true,
        unique : false,
    },

    answer : {
        type : String,
        require : true,
        unique : false,
    },

    date_time : {
        type : Date,
        default : Date.now(),
        unique : false,
    },

});


const QA = mongoose.model('quest_ans', QuestionSchema);
const History = mongoose.model('history', HistorySchema);
export default { QA, History };