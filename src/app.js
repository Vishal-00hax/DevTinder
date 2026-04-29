const express = require("express");
const connectDB = require('./config/database');
const app = express();
const port = 7777;
const User = require('./models/user');
const bycrypt = require('bcrypt')

app.use(express.json());

app.post('/signup', async (req,res)=>{
// console.log(req.body);
try{
    const hashedPassword = await bycrypt.hash(req.body.password,10) // password hasing 

    const user  =  new User({ ...req.body, password: hashedPassword});
    await user.save();
res.send("User Created successfully ✅")
}
catch(err){
    if(err.code === 11000){
       return res.status(400).send("Eamil already exists")
    }
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map((val)=> val.message);
        return res.status(400).send(message);
    }
   return res.status(400).send("User Creating failed " + err.massage);
}
})

app.post('/login', async (req,res)=>{
    try{
        const { emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            return res.status(400).send("User not found for this email")
        }
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if(isPasswordValid){
            return res.send("Login seccessfull")
        }
        else{
            return res.status(400).send("Invalid credentials")
        }
    }
    catch(err){
 return res.status(400).send("Invalid credentials" + err.massage)
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







