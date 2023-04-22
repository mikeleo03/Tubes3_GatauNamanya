import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({

    // query : {
    //     type : String,
    //     require : true,
    //     unique : false,
    // },

    // answer : {
    //     type : String,
    //     require : true,
    //     unique : false,
    // },

})


export default mongoose.model('queries', PostSchema) // sesuaikan nama model di dbnya [sementara namanya 'queries']