const express = require("express");
const app = express();
const port = 3000;

const requestTime = function (req,res,next){
    req.requestTime = Date.now()
    next();
};

app.use(requestTime)

app.use('/',(req,res)=>{
let requestText = 'Hello World <br>'
requestText += `<small>${req.requestTime} ${req.ip} ${req.method}</small>`
res.send(requestText);
})

app.listen(port, ()=>{
    console.log(`Servers is listen at ${port} port`)
})
