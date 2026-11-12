import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from "../../api/Api"

function AgentTicketDetail() {

  const {id} = useParams()
  const navigate = useNavigate()

  

      const [ticket, setTicket] = useState(null)
      const [comments, setComments] = useState([])
      const [agents, setAgents] = useState([])
      const [reply, setResponse] = useState("")
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState("")
      const [actionError, setActionError] = useState("")
      const [sending, setSending] = useState(false)
      const [reload, setReload] = useState(0)
      const [status, setStatus]=useState()
      const[priority,setPriority]=useState()
      const [category,setCategory]=useState()
   

      useEffect(() => {
          const fetchData = async () => {
              setLoading(true)
              setError("")
  
              try {
                  const ticketRes = await api.get(`/tickets/${id}`)
                  const commentRes = await api.get(`/tickets/${id}/comments`)
                  const agentRes = await api.get("/users/agents")
  
                  setTicket(ticketRes.data)
                  setComments(commentRes.data)
                  setAgents(agentRes.data)
              } catch (err) {
                  setError(err.response?.data?.message || "Unable to load ticket.")
              } finally {
                  setLoading(false)
              }
          }
  
          fetchData()
      }, [id, reload])
  


  const handlePriorityChange=(e)=>{
    setPriority(e.target.value)
  }

  const handleStatusChange=(e)=>{
    setStatus(e.target.value)
  }

  const handleAssignedAgentChange=(e)=>{
    setAssignAgent(e.target.value)
  }


  const handleResponseChange=(e)=>{
    setResponse(e.target.value)
  }

  const handleSendResponse=async()=>{
    if(response.trim() === "") return

   setSending(true)
   setActionError("")
    try {
                const res = await api.post(`/tickets/${id}/comments`, { message: reply })
    
                setComments([...comments, res.data])
                setResponse("")
            } catch (err) {
                setActionError(err.response?.data?.message || "Unable to send reply.")
            } finally {
                setSending(false)
            }
  }



  const handleResolve=()=>{
    setStatus("Resolved")
  }
 
  if(!ticket){
    return (
      <div className='max-w-4xl mx-auto text-center py-12'>
        <p className='text-slate-600 mb-4'> Ticket not Found</p>
          <button
          onClick={()=>navigate(-1)}
          className='white font-semibold ropx-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-unded-lg'
          >
            Go Back
          </button>
        
      </div>
    )
  }



  return (
    <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
            <h1 className='text-3xl font-bold text-slate-900'>{ticket._id}</h1>
            <p className='text-slate-600 mt-1w'>{ticket.title}</p>
        </div>
        <div className='bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-6 space-y-4'>
          <p className='text-sm text-slate-700'> <span>customer</span> {ticket.customer}</p>
          <p className='text-sm text-slate-700'><span>categoire</span>{ticket.categorie}</p>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2' >Priority</label>
            <select 
            value={priority}
            onChange={handlePriorityChange}
            className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500' 
            >
              <option value="Urgent ">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Status</label>
            <select 
            value={status}
            onChange={handleStatusChange}
            className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
            >
             <option value="Open">Open</option>
                        <option value="In_Process">In_Process</option>
                        <option value="Wait For Customer">Wait for Customer</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Close">Close</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2' > Assigned Agent</label>
            <select 
            value={assignedAgent}
            onChange={handleAssignedAgentChange}
            className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Unassigned</option>
                        <option value="John">John</option>
                        <option value="Aleen">Aleen</option>
                        <option value="Sahil">Sahil</option>
            </select>
            <button
            onClick={()=>setAssignAgent(currentAgent)}
            className='mt-2 text-sm text-blue-600 hover:underline'

            >
              Assign Agent
            </button>
          </div>

          <button 
          onChange={handleResolve}
          className='mt-2 text-sm text-blue-600 hover:underline'
          >
            Resolve Ticket
          </button>

        </div>
        <div className='bg-white border border-slate-200 rounded-xl shadow-sm p-6'>
          <h2 className='text-lg font-semibold text-slate-900 mb-4'>conversation</h2>

           <div className='space-y-4 mb-6'>
           {comment.map((c)=>(
            <div
            key={c._id}
            className='border border-slate-200 rounded-lg p-3'

            >
              <p className='text-sm font-medium text-slate-900'>{c.author}{c.role === "Agnet"? "support Agent":""}</p>
              <p className='text-sm text-slate-700 mt-1'>{c.message}</p>
            </div>
          ))}
          </div>

          <label className='block text-sm font-medium text-slate-700 mb-2'>Add Response</label>
          <textarea 
          value={response}
          onChange={handleResponseChange}
          rows="4"
          className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
          ></textarea>

          <button
          onClick={handleSendResponse}
          className='mt-3 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg'
          >
            Send
          </button>
        </div>
        
    </div>
  )
}


export default AgentTicketDetail