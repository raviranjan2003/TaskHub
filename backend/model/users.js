const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        minLength : [3, "username should not be less than 3 words !"]
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        minLength : [6,"Please use a strong password !"]
    }
})

const User = new mongoose.model("User",userSchema);

module.exports = User;