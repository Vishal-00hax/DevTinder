const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required: true,
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }, 
    timeStamp: {
        type: Date
    }

})

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;
