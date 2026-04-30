const validator = require('validator');

const validateSignupData = (req)=>{
    const {firstName,lastName,emailId,password,age,gender} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name are invalid")
    }
    else if(firstName.length < 3 || lastName.length > 20){
        throw new Error("Name should be between 3 and 20 characters")
    }
        else if(!emailId || !validator.isEmail(emailId)){
        throw new Error("Email is invalid")
    }
          else if(!gender || !gender === ["male,female,other"] ){
        throw new Error("Email is invalid")
    }
    
}

module.exports = validateSignupData;