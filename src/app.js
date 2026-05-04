const express = require("express");
const connectDB = require('./config/database');
const app = express();
const port = 7777;
const User = require('./models/user');
const bcrypt = require('bcrypt')
const validateSignupData  = require('./models/utils/validations');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require("./config/middlewares/AuthMiddelware");

app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req,res)=>{
// console.log(req.body);
try{
    validateSignupData(req); // api level validation
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    req.body.password = passwordHash;
     const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
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

app.post('/login', async (req,res)=>{
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

app.get('/profile',userAuth, async (req,res)=>{
   try{
   const user = req.user;
    res.send(user);
   }catch(err){
      return res.status(400).send("ERROR:" + err.message)
   }
})

app.post('/sendConectionRequest', userAuth , async (req,res)=>{
   try{
      const user = req.user;
   console.log("Send connection request API is called")
   res.send("Send connection request API is called" + user.firstName)
   }catch(err){
       res.status(400).send("Error: "+ err.message)
   }
})

connectDB()
.then(()=>{
app.listen(port, ()=>{
    console.log(`Servers is listen at ${port} port`)
})
})
.catch((err)=>{
       console.log("Database connection failed ❌",err);
})







