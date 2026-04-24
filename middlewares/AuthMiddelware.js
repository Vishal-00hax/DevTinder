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

  const userAuth = (req,res,next)=>{
console.log("User auth middelware is called")
const token = "xyz"
const isUser = token === "xyz"
if(!isUser){
    res.status(401).send("Unauthorized")
}
else{
    next();
}
 }

module.exports = {adminAuthMiddelware,userAuth};


