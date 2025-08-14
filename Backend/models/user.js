import mongoose from "mongoose";

const userSchema=new  mongoose.Schema({
emailOrPhone: {
    type: String,
    required: true,},
  password: {
    type: String,
    required: true
  }
})
const User=new mongoose.model("user",userSchema)
export default User