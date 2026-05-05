const express = require("express");
const connectDB = require('./config/database');
const app = express();
const port = 7777;
const User = require('./models/user');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestsRouter = require('./routes/requests');

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestsRouter);




connectDB()
.then(()=>{
app.listen(port, ()=>{
    console.log(`Servers is listen at ${port} port`)
})
})
.catch((err)=>{
       console.log("Database connection failed ❌",err);
})







