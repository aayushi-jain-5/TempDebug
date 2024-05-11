import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/frontend_assets/assets'
import  {StoreContext} from '../../context/StoreContest.jsx'
import axios from "axios"

const  LoginPopup = ({setShowLogin}) => {
    const {url,setTokken}  = useContext(StoreContext);

    const[currentState,setCurrentState] = useState("Login")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value;
    setData(data => ({...data,[name]:value}))

}

const onLogin = async (event) =>{
    event.preventDefault()
    let newUrl = url;

    if(currentState === "Login"){
      newUrl += '/api/user/login'
    }

    else{
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl,data);

    if(response.data.success){
       setTokken(response.data.tokken);
      localStorage.setItem("tokken",response.data.tokken);
      setShowLogin(false); 
    }
    else{
      alert(response.data.message)
    }

    
}



  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title"> 
            <h2>{currentState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className='login-popup-inputs'>
            {currentState === "Login"? <></> 
            : <input type='text' name="name" onChange={onChangeHandler} value={data.name} placeholder='Your name' required />
            }       

            <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Password' required />

        </div>
        <button type='submit'  > {currentState ==="Sign up" ? "Sign up" : "Login"} </button>    
        <div className='login-popup-condition'>
            <input type='checkbox' required />
            <p>By checking, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login"
            ? <p>Create a new account? <span onClick={()=> setCurrentState("Sign up")}>Click here</span></p>
            : <p>Already have an account? <span onClick={()=> setCurrentState("Login")}>Click here</span></p>

        }
       
      </form>
    </div>
  )
}

export default LoginPopup
