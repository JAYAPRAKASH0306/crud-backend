const mongoose = require('mongoose');

const crudSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        
    }

    })

    const crudmodel=mongoose.model("crud-collection",crudSchema)

    module.exports=crudmodel;
