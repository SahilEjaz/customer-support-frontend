import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../api/Api"



const Register= ()=>{

  const[formData, setFormData]=useState({
    name:"",
    email:"",
    password:"",
    confirm_Password: ""
  }
  );
  const [error, setError]=useState("")

  const navigate= useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("")

    if(formData.password != formData.confirm_Password){
      setError("password dont match")
      return;
    }
    if (formData.password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

    try {
      const res=await api.post("/auth/register",{
        name: formData.name,
        email: formData.email,
        password:formData.password,

      })
         const token=res.data.token
         const savedUser = res.data.User || res.data.user

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(savedUser))
       
      navigate("/Dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "unable to register")
      
    }

  };

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  };

  return(
    <div className='min-h-screen  flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-slate-900'>
           Create Account
          </h1>
          <p className='text-slate-700 mt-2'>
            join the support portal
          </p>
          {error && <p className="text-red-600 text-center mb-3">{error}</p>}
      
          <form className='space-y-5'onSubmit={handleSubmit}>
            <div>
              <label  className="text-blue-600 font-semibold hover:underline">Name</label>
              <input
              type='Text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='enter your name'
              required
              className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
              />

            </div>
            <div>
              <label  className="text-blue-600 font-semibold hover:underline">Email</label>
              <input
              type='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='enter your Email'
              required
              className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label  className="text-blue-600 font-semibold hover:underline"> Password </label>
            <input
              type='Password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='enter your password'
              required
              className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label  className="text-blue-600 font-semibold hover:underline"> Confirm_Password </label>
            <input
              type='Password'
              name='confirm_Password'
              value={formData.confirm_Password}
              onChange={handleChange}
              placeholder='Confirm your password'
              required
              className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition '>
              Register 
            </button>
          </form>
          <p>
            Already have an account
            <Link to='/Login'  className="text-blue-600 font-semibold hover:underline">
            login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default  Register
 
  
