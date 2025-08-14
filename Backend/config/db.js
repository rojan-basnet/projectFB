import mongoose from "mongoose";

 async function connnectDB(){
    try{
    const conn=await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database")
    }catch(error){
        console.error(error)
        process.exit(1);
    }
}
export default connnectDB
