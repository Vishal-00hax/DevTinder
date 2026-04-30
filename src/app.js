const express = require("express");
const connectDB = require('./config/database');
const app = express();
const port = 7777;
const User = require('./models/user');
const bycrypt = require('bcrypt')
const validateSignupData  = require('./models/utils/validations');

app.use(express.json());

app.post('/signup', async (req,res)=>{
// console.log(req.body);
try{
    validateSignupData(req); // api level validation
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    const passwordHash = await bycrypt.hash(password, 10);
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
         res.status(400).send("User not fount")
      }
     const validPassword = await bycrypt.compare(password, user.password);
     if(!validPassword){
      return res.status(400).send("Invalid password")
     }
     return res.send("Login sucessfull")
   }
   catch(err){
      return res.status(400).send("Error during login" + err.massage)
   }
})

app.get('/feed', async (req,res)=>{
    const fname = req.query.firstName;
    const lname = req.query.lastName;
try{
const user = await User.find({firstName:fname , lastName:lname});
  res.send(user);
}
catch(err){
 res.status(400).send("Error while fetching users",err);
}
})

app.patch('/user/:user_id', async (req,res)=>{
    const userid = req.params.user_id;
    const update = req.body;
    try{
         const allowedUpdates = ["firstName", "lastName", "age", "gender"];
         const updateKeys = Object.keys(req.body);
         const isValidOpration = updateKeys.every((key)=> allowedUpdates.includes(key));
         if(!isValidOpration){
           return res.status(400).send("Invalid updates! Only firstName, lastName, age , and geder can be updated.")
         }
      const user = await User.findByIdAndUpdate(userid, update,{
        runValidators: true,
        returnDocument: "after"
      });
        if (!user){
          return  res.send("User not Found")
        }
        else{
           return res.send("User updated sucessfuly")
        }
    }
    catch(err){
       return res.status(400).send("Error during user update" + err.message)
    }
})

app.delete("/user/:user_id", async (req,res)=>{

const userid = req.params.user_id;
try{
    const deleteUser = await User.findByIdAndDelete(userid);
    if(!deleteUser){
       return res.send("User not found for deletion")
    }
    else{
       return res.send("User deleted sucessfully")
    }
}
catch(err){
res.status(400).send("Error during deletion", err)
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







