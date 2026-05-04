const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

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

userSchema.methods.getJWT = async function (){ // Dont use arrow fun here
    user = this;
    const token = await jwt.sign({_id: user._id},"Dev@Tinder$790", {expiresIn: "2d"});
};
userSchema.methods.isValidPassword = async function (userInputPassword){
    user = this;
    const passwordHash = user.password;
    const validPassword = await bycrypt.compare(userInputPassword , passwordHash);
   return validPassword
}
const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;
