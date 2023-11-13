const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose")
const crudmodel=require("./models/crudSchema")

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json())

app.use(cors()); // Enable CORS for all routes
 app.post("/crudpost",async(req,res)=>{
    const{name,email,phone} =req.body;
 
    try{
        const Record=new crudmodel({
            name,
            email,
            phone
        })
        await Record.save();
        res.status(201).json({ message: 'Data saved successfully' });
    }
    catch (err){
        console.log(err)
        res.status(400).json({ message: 'Data not saved ' });

    }}

 );
 app.get("/crud-show-data",async(req,res)=>{
    try{
         const showRecord= await crudmodel.find()
         res.status(202).json(showRecord)

    }
    catch (err){
        res.status(400).json({ message: 'no data found' })

    }
 })
 app.put("/crud-update-data/:id",async(req,res)=>{
    try{
        let data=await crudmodel.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
          }
       data.name=req.body.name;
       data.email=req.body.email;
       data.phone=req.body.phone;
       await data.save();
       const showRecord= await crudmodel.find()
       res.status(202).json(showRecord)
    }
    catch (err){
       res.status(400).json({message:`updation error${err}`})
    }
 })
 app.delete("/crud-delete-data/:id",async(req,res)=>{
    try{
        let data=await crudmodel.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
          }
        await crudmodel.deleteOne()
       res.status(202).json({message:"data deleted sucesfully"})
    }
    catch (err){
       res.status(400).json({message:`updation error${err}`})
    }
 })

app.listen(port, () => {
    console.log(`Server connected on port ${port}`);
});
mongoose.connect(process.env.DB,{
    usenewurlparser :true ,
    useunifiedtopology :true 
}).then(console.log("db connected"))
.catch("error in connecting db")

