import mongoose from 'mongoose'

const HistorySchema = new mongoose.Schema({

    user_id : {
        type : String,
        require : true,
        unique : true,
    },

    pages : [{
        convo : [{
            question : String,
            answer : {
                type: Array,
                default: []
            },
            answered : Boolean
        }],
        name : {
            type : String,
            require : true,
            unique: false
        }
    }],
    
});

const History = mongoose.model('history', HistorySchema);

export default History;