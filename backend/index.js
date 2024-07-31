import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import { userRouter } from "./Routes/authRouter.js";

const app = express();
dotenv.config({

});
const Port = 4000
const dburl = process.env.DBURL;

app.use(cors());
app.use(express.json());
app.use("/api",userRouter);



app.listen(Port,()=>{
    console.log("the server started succesfully in port 5000")
    mongoose.connect(dburl,{useNewUrlParser: true})
})
