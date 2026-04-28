const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type:String,
        required: true,
        maxlength: 50,
        minlength: 2,
        trim: true //remove extra sapces
    },
    lastName:{
        type:String,
        trim: true
    },
    emailId:{
        type:String,
        required: true,
        unique: true, // use for prevent duplicates
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'] // Basic Regex validation
    },
    password:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        min: 18
    },
    gender:{
        type:String,
        lowercase: true,
        validate: {
        validator: function(v){
            return ["male","female","other"].includes(v); 
        }, // custom validation funcation
        message: props => `${props.value} is not a vaild gender`
    }},
    timeStamp: {
        type: Date,
        default: Date.now // for getting the time of user creation
    }
})

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;
