 const jwt = require("jsonwebtoken");
 const User = require('../../models/user');
 
 const adminAuthMiddelware = (req,res,next)=>{
console.log("Admin auth middelware is called")
const token = req.headers.authorization;
const isAdmin = token === "Token fd08c5022bc44217974a4f2168bbff7047a7d61e"
if(!isAdmin){
    res.status(401).send("Unauthorized")
}
else{
    next();
}
 }

  const userAuth = async (req,res,next)=>{
    try{
    const {token} = req.cookies;
    if(!token){
        throw new Error ("token not found");
    }
    const decodedObj = await jwt.verify(token,"Dev@Tinder$790");
    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }
else{
        req.user = user;
        next();
}
}catch(err){
    res.status(401).send("ERROR: " + err.message)
}
 }

module.exports = {adminAuthMiddelware,userAuth};


