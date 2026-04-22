const express = require("express");
const res = require("express/lib/response");
const fs = require('fs')
const {adminAuthMiddelware,userAuth} = require("../middlewares/AuthMiddelware");
const app = express();
const port = 7777;

app.use('/admin', adminAuthMiddelware,userAuth);

app.get('/admin/getAllData',(req,res,next)=>{ 

        res.send("All data is here")

 })

 app.delete('/admin/deleteData',(req,res,next)=>{ 
 
        res.send("Data deleted successfully")
  
 })

app.listen(port, ()=>{
    console.log(`Servers is listen at ${port} port`)
})




