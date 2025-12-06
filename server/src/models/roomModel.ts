import mongoose from "mongoose";
const roomSchema=new mongoose.Schema({
    roomId:{
        type:String,
        required:true,
        unique:true,
        maxLength:8,
    },
    featured:{
        type:String,
        enum:["yes","no"], 
        required:true,
    },
    createdBy:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true,
    },
    listeners:{
        type:Number,
        default:0,

    }
},{timestamps:true});
export const Room=mongoose.model("Room",roomSchema);