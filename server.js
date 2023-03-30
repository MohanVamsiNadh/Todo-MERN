const express =require('express');
const mongoose =require('mongoose');
const TaskSchema =require('./model');
const cors =require('cors');

const app=express();
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Mohan:mohanvamsinadh@cluster0.f7d3ojw.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(
    () =>console.log('DB Connected')
)

app.use(express.json())
app.use(cors({
    origin : '*'
}))

app.post('/addtask',async(req,res) =>{
    const {todo} = req.body;
    
    try{
        const newDate =new TaskSchema({
            todo : todo
        });
        await newDate.save();
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})

app.get('/gettask',async(req,res) =>{
    try{
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err)
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id)
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})

app.listen(5000,()=> console.log("server running ....."));