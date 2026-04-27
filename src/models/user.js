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
        type:String,
        lowercase: true,
        validate: {
        validator: function(v){
            return ["male","female","other"].includes(v);
        },
        message: props => `${props.value} is not a vaild gender`
    }},
    timeStamp: {
        type: Date,
        default: Date.now
    }

})

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;
