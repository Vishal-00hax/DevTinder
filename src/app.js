const express = require("express");
const connectDB = require('./config/database');
const app = express();
const port = 7777;
const User = require('./models/user');

app.use(express.json());

app.post('/signup', async (req,res)=>{
console.log(req.body);
 const user  =  new User(req.body);
 await user.save();
res.send("User Created successfully ✅")


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







