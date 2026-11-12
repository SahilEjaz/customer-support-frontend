import React from 'react'
import { useState } from 'react';
import {useNavigate, Link} from "react-router-dom"
import api from "../../api/Api"


const Login=()=>{
 
const[formData, setFormData]=useState({
    email:"",
    password:""
}
)
const [error, setError]=useState("")

const navigate = useNavigate();

const handleSubmit= async(e)=> {
    e.preventDefault();
  setError("")
  try {
    const res = await api.post("/auth/login",{
        email: formData.email,
        password: formData.password,
    })
    const token=res.data.token
    const savedUser = res.data.User || res.data.user

    localStorage.setItem("token",token)
    localStorage.setItem("user",JSON.stringify(savedUser))

    if(savedUser.role === "AGENT"){
        navigate("/AgentDashboard")
    }
    else{
        navigate("/Dashboard")
    }
    
  } catch (err) {
    setError(err.response?.data?.message || "unable to login")
    
  }
   
};
const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value,
    });
};

    return(
        <div className='min-h-screen flex items-center justify-center px-4'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold'>
                        Support Portal 
                    </h1>
                    <p className='mt-2 text-slate-500'> 
                        Login to manage your tickert
                    </p>
            
                </div>
                <form onSubmit={handleSubmit} className='space-y-5' >
                    <div>
                     
                     <label className='block text-sm font-medium text-slate-700 mb-2 '>
                        Email </label>

                        <input
                        type='email'
                        name='email'
                        value={FormData.email}
                        onChange={handleChange}
                        placeholder='enter your email'
                        className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
                        required

                        />
                     
                      </div>

                    <div>
                    <label className='block text-sm text-slate-700 font-medium mb-2'>
                     
                         Password 
                        </label>
                        <input 
                        type="password"
                        name='password'
                        value={FormData.password}
                        onChange={handleChange}
                        placeholder='enter your password'
                        className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
                        required
                     />

                         

                    </div>
                    {error && <p className='text-red-600 text-sm'>{error}</p>}
                    <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition'>
                        Login
                    </button>

                </form>
                <p>
                    Don't have an account?
                    <Link to="/Register" className='text-blue-600 font-semibold hover:underline'
                    > 
                    Register
                    </Link>
                </p>
            </div>
        </div>


    );
}

export default  Login
