const mongoose = require('mongoose');
const validator = require('validator');

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
          validate: {
        validator: function(value){
            return validator.isEmail(value);
        }, // custom validation funcation
        message: props => `${props.value} is not a vaild email`
    }
    },
    password:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        min: 3
    },
        phone:{
        type:String,
        min: 10,
        trim: true,
         validate: {
        validator: function(value){
            return validator.isMobilePhone(value); 
        }, // custom validation funcation
        message: props => `${props.value} is not a vaild phone`
    }
    },
    gender:{
        type:String,
        lowercase: true,
        validate: {
        validator: function(value){
            return ["male","female","other"].includes(value); 
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
