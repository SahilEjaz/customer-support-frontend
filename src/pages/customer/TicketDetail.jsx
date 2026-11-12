import { useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import { useEffect } from 'react';
import api from "../../api/Api"

function TicketDetail() {

    const navigate= useNavigate()

    const [ticket, setTicket] = useState(null)
       const [comment, setComment] = useState([])
       const [reply, setReply] = useState("")
       const [loading, setLoading] = useState(true)
       const [error, setError] = useState("")
       const [replyError, setReplyError] = useState("")
       const [sending, setSending] = useState(false)
       const [reload, setReload] = useState(0)

    const  {id} =useParams()
     


  useEffect(()=>{
    const fetchData = async()=>{
        setLoading(true)
        setError("")


        try {
            const ticketRes= await api.get(`/tickets/${id}`)
            const commentRes = await api.get(`/comment/${id}`)

            setTicket(ticketRes.data)
            setComment(commentRes.data)
            
        } catch (err) {
            setError(err.response?.data?.message || "unable to load ticket")
            
        }finally{
            setLoading(false)
        }
    }
    fetchData()
  },[id,reload])
  
  
  
  
     const handleReplyChange=(e)=>(
        setReply(e.target.value)
    );

     const handleSendReply = async () => {
            if (reply.trim() == "") return
    
            setSending(true)
            setReplyError("")
    
            try {
                const res = await api.post(`/comment/${id}`, { message: reply })
    
                setComment([...comment, res.data])
                setReply("")
    
            } catch (err) {
                setReplyError(err.response?.data?.message || "Unable to send reply")
    
            } finally {
                setSending(false)
            }
        }
          if (loading) {
        return <p className='text-center text-slate-600 py-12'>Loading ticket...</p>
    }

    if (error) {
        return (
            <div className='max-w-4xl mx-auto text-center py-12'>
                <p className='text-slate-600 mb-4'>{error}</p>
                <button
                    onClick={() => setReload(reload + 1)}
                    className='px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg'
                >
                    Try Again
                </button>
            </div>
        )
    }
   if(!ticket){
    return(
        <div className='max-w-4xl mx-auto text-center py-12'>
            <p className='text-slate-600 mb-4'>Ticket Not Found</p> 
            <button 
            onClick={()=>navigate(-1)}
             className='px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg'
             >
                 Go Back
                 </button>
        </div>
    )
   }
  
  
    return (
    <div className='max-w-4xl mx-auto'>
        <div className='mb-8'> 
            <h1 className='text-3xl font-bold text-slate-900'>
                Ticket #{ticket._id.slice(-6)}
            </h1>
            <p className='text-slate-600 mt-1'>
                {ticket.title}
            </p>
        </div>
        <div className='bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-6 space-y-2'>
           <p className='text-sm text-slate-700'> <span className='font-medium'> Status</span> {ticket.staus} </p>
           <p><span>Priority</span>{ticket.priority}</p>
           <p><span>Category</span>{ticket.category}</p>
           
           <p><span>Created</span>{ticket.Created}</p>
           <p><span>Assigned</span>{ticket.Assigned}</p>
        </div>

        <div className='bg-white border border-slate-200 rounded-xl shadow-sm p-6'>
            <h2 className='text-lg font-semibold text-slate-900 mb-4'>Conversation</h2>
            <div className='space-y-4 mb-6'>
                {comment.map((c)=>(
                    <div key={c._id} className='border border-slate-200 rounded-lg p-3'>
                        <p className='text-sm font-medium text-slate-900'>
                            {c.user.name} {c.user.role==="agent"?"support agent":""} 
                            </p>
                        <p className='text-sm font-medium mt-1 text-slate-700'>
                            {c.message}
                            </p>
                    </div>
                ))}
            </div>
        </div>
        <div>
            <label className=''>Write a Reply</label>
            <textarea 
            name="Write a Reply"
             value={reply}
             onChange={handleReplyChange}
             rows="4"
             className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
             >
            </textarea>

        </div>

       <button
                onClick={handleSendReply}
                disabled={sending}
                className='mt-3 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50'
            >
                {sending ? "Sending..." : "Send Reply"}
            </button>
    </div>


  )
}

export default TicketDetail