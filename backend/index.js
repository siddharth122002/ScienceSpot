const express = require('express')
const app =express();
const cors = require('cors');
const router = require('./routes/app')
const mongoose =require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv =require('dotenv');

dotenv.config({
    path: './.env'
});


app.use(cors({
    credentials:true,
    origin:'https://science-spot.vercel.app/',
}));

app.use(express.json())
app.use(cookieParser());


const fn=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db connected successfully")
    }catch(err){
        console.log("ERRORR:",err);
    }
}
fn();


app.use('/',router);

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("listening");
})