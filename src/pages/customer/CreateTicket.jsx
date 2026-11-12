import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import api from '../../api/Api'



function CreateTicket() {

    const[error,setError]=useState("")
    const[loading, setLoading]=useState(false)

    const[formData, setFormData]=useState({
         name:"",
         Title:"",
         Category:"",
         Priority:"",
         Description:"",
         Attachment:"null"
    });

    const navigate= useNavigate()


    const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
        const res = await api.post("/tickets", {
            title: formData.Title,
            description: formData.Description,
            category: formData.Category,
            priority: formData.Priority,
        })

        navigate(`/TicketDetail/${res.data._id}`)
    } catch (err) {
        setError(err.response?.data?.message || "Unable to create ticket")
    } finally {
        setLoading(false)
    }
}
  return (
    <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
            <h1 className='text-3xl font-bold text-slate-900'> 
                Create New Ticket
                 </h1>
        </div>
        <div>
            <form className='bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6'
            onSubmit={handleSubmit}
            >
             <div>
                 <label className='text-slate-700 font-medium block text-sm mb-2' > Title</label>
                 <input 
                 type="text"
                 name='Title'
                 value={formData.Title}
                 onChange={handleChange}
                 placeholder='Enter your issue Title'
                 className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
                 required
                 />
             </div>
             <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'> Category</label>
                <select 
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
                required
                 >
                   <option value="">Select Category</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Billing">Billing</option>
                    <option value="Account">Account </option>
                    <option value="Feature Request"> Feature request</option>
                    <option value="General">General</option>

                </select>
             </div>
             <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>Priority</label>
                <select 
                name='Priority'
                value={formData.Priority}
                onChange={handleChange}
                className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
                required
                >
                    <option value="">Select Option </option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                    <option value="URGENT">URGENT</option>

                </select>
             </div>
             <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'> Description</label>

                <textarea 
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                rows="6"
                className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
                required
                >
                </textarea>
             </div>
             <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'> Attachment</label>

                <input 
                type="File"
                name='Attachment'

                onChange={handleChange}
                className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
                 />
             </div>
             <div>
                <button className='px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg' type='Submit'> Create Ticket</button>
             </div>


            </form>
        </div>
    </div>
  )
}

export default CreateTicket