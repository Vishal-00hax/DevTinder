const express = require('express');
const validateSignupData  = require('../models/utils/validations');
const User = require('../models/user');
const bcrypt = require('bcrypt')



const authRouter = express.Router();

authRouter.post('/signup', async (req,res)=>{
// console.log(req.body);
try{
    validateSignupData(req); // api level validation
    const { firstName, lastName, emailId, password, photoUrl , age, gender } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    req.body.password = passwordHash;
     const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        photoUrl,
        age,
        gender
     });
    await user.save();
res.send("User Created successfully ✅")
}
catch(err){
 
   return res.status(400).send("User Creating failed " + err.message);
}
})

authRouter.post('/login', async (req,res)=>{
   try{
      const {emailId, password} = req.body;
      const user = await User.findOne({emailId});
      if(!user){
        return res.status(400).send("User not found")}
        const validPassword = await user.isValidPassword(password);
     if(validPassword){
      const token = await user.getJWT();
      res.cookie("token", token , 
      {expires: new Date(Date.now() + 48 * 3600000)}
   );
     res.send("Login Successfull")
     }
     else{
      return res.status(400).send("Invalid password")
     }
   }
   catch(err){
      return res.status(400).send("Error during login" + err.message)
   }
})


module.exports = authRouter;