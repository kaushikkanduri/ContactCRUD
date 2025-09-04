const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Provide username"]
    },
    email:{
        type:String,
        required:[true,"Provide email-address"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Provide password"]
    }
},{
    timestamps : true
})

module.exports = mongoose.model('User',userSchema);