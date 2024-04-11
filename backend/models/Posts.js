const mongoose = require('mongoose');
const postsSchema =new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    summary:{
        type:String,
        required:true,
    },
    article:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }

},{
    timestamps:true,
});

const Posts = mongoose.model('Posts',postsSchema);
module.exports = Posts;