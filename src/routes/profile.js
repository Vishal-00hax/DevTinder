const express = require('express');
const { userAuth } = require("../config/middlewares/AuthMiddelware");
const profileRouter = express.Router();


profileRouter.get('/profile',userAuth, async (req,res)=>{
   try{
   const user = req.user;
    res.send(user);
   }catch(err){
      return res.status(400).send("ERROR:" + err.message)
   }
})


module.exports = profileRouter;