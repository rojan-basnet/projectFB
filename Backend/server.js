import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import User from './models/user.js'
import { fileURLToPath } from 'url'
import path from 'path';


dotenv.config()
const app=express()

const PORT=process.env.PORT||3000;

console.log(process.env.MONGO_URI)

app.use(cors());
app.use(express.json());

const __filename=fileURLToPath(import.meta.url);

const __dirname=path.dirname(__filename);


app.post('/create',async (req,res)=>{
    const { emailOrPhone, password }=req.body;

    if(!emailOrPhone || !password){
        return res.status(400).json({error:"all fields are required"})
    }

    try{
        const newUser = new User({emailOrPhone,password})
        await newUser.save();
        return res.status(201).json({data:newUser})
    }catch(error){
        console.error("failed to add user to DB ",error)
        return res.status(500).json({message:"no user to Db"})
    }
})
if (process.env.NODE_ENV === "production") {
    const staticPath = path.join(__dirname, '../Frontend/dist');
    console.log("Serving static files from:", staticPath);
    app.use(express.static(staticPath));

    app.use((req, res) => {
        const indexPath = path.resolve(__dirname, '../Frontend', 'dist', 'index.html');
        console.log("Serving index.html from:", indexPath);
        res.sendFile(indexPath);
    });
}

app.listen(PORT,()=>{
    connectDB()
    console.log("listening at PORT:",PORT)
})