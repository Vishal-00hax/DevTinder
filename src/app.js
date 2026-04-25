const express = require("express");
const connectDB = require('./config/database');
const app = express();
const port = 7777;
const User = require('./models/user');

app.use(express.json());

app.post('/signup', async (req,res)=>{
console.log(req.body);
const user  =  new User(req.body);
try{
 await user.save();
res.send("User Created successfully ✅")
}
catch(err){
    res.status(400).send("User Creating failed ❌",err);
}
})

app.get('/feed', async (req,res)=>{
    const name = req.query.firstName;
try{
const user = await User.find({firstName:name});
res.send(user);
}
catch(err){
res.status(400).send("Error while fetching users",err);
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







