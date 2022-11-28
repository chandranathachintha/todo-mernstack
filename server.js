const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require("./model");
const cors = require('cors');
const app = express();
mongoose.connect("mongodb+srv://todoapp:todoapp@cluster0.qmoecg2.mongodb.net/?retryWrites=true&w=majority").then(
    ()=>console.log("Db Connected...")
)
    app.use(express.json())
    app.use(cors({
        origin : '*'
    }))
    app.post("/addTodo",async(req,res)=>{
    const {todo} = req.body;
   try {
        const newTodo = new TaskSchema({
        todo : todo
        })
        await newTodo.save();
        return res.json(await TaskSchema.find())
   } 
   catch (error) {
    console.log(error);
   }
})

app.get("/getTodos",async(req,res)=>{
    try {
        return res.json(await TaskSchema.find())
    } catch (error) {
        console.log(error);
    }
})
app.get("/getTodos/:id",async(req,res)=>{
    try {
        const data = await TaskSchema.findById(req.params.id)
        return res.json(data)
    } catch (error) {
        console.log(error.message);
    }
})
app.delete("/deleteTodo/:id" , async(req,res)=>{
    await TaskSchema.findByIdAndDelete(req.params.id)
    
    return res.json(await TaskSchema.find())
})


app.listen(5000,()=>console.log("Server is Running..."))