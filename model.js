const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    todo : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
}) 
module.exports = mongoose.model("TaskSchema",TaskSchema);
