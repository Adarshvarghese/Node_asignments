const express= require('express');
const mongoose= require('mongoose');


const app= express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/pokemon_api",{useNewUrlParser :true},()=>{
    console.log("connected to database");
})

//schema
 const pokeschema = new mongoose.Schema({
     name:String,
    type:String,
    imageurl:String
})
//create model to connect to schema
const pokemodel= new mongoose.model('pokemons',pokeschema);

// endpoints for crud operations



app.get("/pokemons", async(req,res)=>{
    let data= await pokemodel.find()
    res.send(data)
    
})
//to add new pokemon

app.post('/pokemon',(req,res)=>{
    console.log(req.body)
    insertdata =req.body;
    modelobj= new pokemodel(insertdata);
    modelobj.save((err,data)=>{
        res.send({message:"created"})
    })

  
})
// delete data
app.delete("/pokemon/:id",(req,res)=>{
   let  id=req.params.id;
    console.log(id)
    pokemodel.deleteOne({_id:id})
    
    
})

//fetch one pokemon using id
app.get("/pokemon/:id",  async(req,res)=>{
    let id=req.params.id;
    let data= await pokemodel.find({_id:id});
     res.send(data);
    console.log(data)
})

//update pokemon
app.put("/pokemon/:id",(req,res)=>{
    let id=req.params.id;
    let data=req.body;
    pokemodel.updateOne({_id:id},data,(err,data)=>{
        if(err===null){
            res.send({mesage:"updated"})
        }
    })
})
//fetch pokemon using type
app.get("/pokemon/type/:type",  async(req,res)=>{
    let usr_type=req.params.type;
    let data= await pokemodel.find({type:usr_type});
     res.send(data);
    console.log(data)
})

app.listen(8000,()=>{
    console.log("server started")
        
    
})

