const express = require('express');
const { userAuth } = require("../config/middlewares/AuthMiddelware");
const requestsRouter = express.Router();


requestsRouter.post('/sendConectionRequest', userAuth , async (req,res)=>{
   try{
      const user = req.user;
   console.log("Send connection request API is called")
   res.send("Send connection request API is called" + user.firstName)
   }catch(err){
       res.status(400).send("Error: "+ err.message)
   }
})



module.exports = requestsRouter;