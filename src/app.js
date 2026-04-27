const express = require("express");
const connectDB = require('./config/database');
const app = express();
const port = 7777;
const User = require('./models/user');

app.use(express.json());

app.post('/signup', async (req,res)=>{
// console.log(req.body);
const user  =  new User(req.body);
try{
 await user.save();
res.send("User Created successfully ✅")
}
catch(err){
    if(err.code === 11000){
        res.status(400).send("Eamil already exists")
    }
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map((val)=> val.message);
        res.status(400).send(message);
    }
    res.status(400).send("User Creating failed ",err);
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
      const user = await User.findByIdAndUpdate(userid, update);
        if (!user){
            res.send("User not Found")
        }
        else{
            res.send("User updated sucessfuly")
        }
    }
    catch(err){
        res.status(400).send("Error during user update", err)
    }
})

app.delete("/user/:user_id", async (req,res)=>{

const userid = req.params.user_id;
try{
    const deleteUser = await User.findByIdAndDelete(userid);
    if(!deleteUser){
        res.send("User not found for deletion")
    }
    else{
        res.send("User deleted sucessfully")
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







