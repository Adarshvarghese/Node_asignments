const express= require('express');

const app= express();
app.use(express.json());


app.get('/test',(req,res)=>{

    res.send({message:"hellooo  endpoint 1"})
})
app.get('/test1',(req,res)=>{

    res.send({message:"hellooo endpoint 2"})
})
app.get('/test2',(req,res)=>{

    res.send({message:"hellooo endpoint 3"})
})

app.post("/create",(req,res)=>{
    res.send({"data":"hii everyone"});
     console.log(req.body)

})










app.listen(8000,()=>{
    console.log("server started")
        
    
})