import mongoose from 'mongoose'

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

const History = mongoose.model('history', HistorySchema);

export default History;