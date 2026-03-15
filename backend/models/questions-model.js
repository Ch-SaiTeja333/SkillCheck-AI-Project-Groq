//! generate a SCHEMA
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
        index:true
    },
    //Topic
    topic:{
        type:String,
        required:true
    },
    //Difficulty level
    difficultyLevel:{
        type:String,
        required:true
    },
    //Number Questions
    numberQuestions:{
        type:Number,
        required:true
    },
    //Questions array AI prompt
    questions:[],
    // options
    options:{ 
        // 1 user selected[]
        userOptions:[],
        // 2 corerct answer[] AI prompt
        correctOptions:[],
        // 3 options for user to select AI prompt
        availableOptions:[]
    },
    //score
    score:{
        type:Number,
        default:0
    },
    //percentage
    percentage:{
        type:Number,
        default:0,
        set: v => parseFloat(v.toFixed(2))
    },
    //feedback
    feedback:{
        type:String,
        
    }
},{timestamps:true})

//! Generate a collection for that SCHEMA
export const questionsModel =  mongoose.model('question',questionSchema);