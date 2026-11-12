import  { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../../api/Api"

function MyTicket() {
    const navigate = useNavigate()

    const [tickets, setTickets] = useState([])
    const [search, setSearch]=useState()
    const[statusFilter, setStatusFilter]=useState("All")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [reload, setReload] = useState(0)



    useEffect(() => {
    const fetchTickets = async ()=>{
        setLoading(true)
        setError("")

        try {
            const params = {page, limit: 5}
            if(search) params.search = search
            if(statusFilter !== "All") params.status = statusFilter

            const res = await api.get("/tickets",{params})
            setTickets(res.data.tickets)
            setTotalPages(res.data.totalPages || 1)
            
        } catch (error) {
            setError(error.response?.data?.message || "unable to load ticket")
            
        }finally{
            setLoading(false)
        }
    }
     fetchTickets()


  
}, [search, statusFilter, page, reload])


    const handleSearchChange=(e)=>{
        setSearch(e.target.value)
        setPage(1)

    };

    const handleStatusChange=(e)=>{
        setStatusFilter(e.target.value)
        setPage(1)

    };

 

  return (
    <div>
        <div className=''>
            <h1 className=''>My Ticket</h1>
            <button 
            onClick={()=> navigate('/CreateTicket')}
            className=''
            >Create Ticket</button>
        </div>
        <div>
            <input 
            type="text"
            value={search}
            onChange={handleSearchChange} 
            placeholder='Serch Your Ticket Here'
            className='border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
            />
            <select 
            value={statusFilter}
            onChange={handleStatusChange}
            className='border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
            >

                <option value="All">All</option>
                <option value="OPEN">OPEN</option>
                <option value="IN_PROCESS">In_Process</option>
                <option value="WAIT FOR CUSTOMER">WAIT FOR CUSTOMER</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSE">CLOSE</option>
            </select>
        </div>
        <div>
            {tickets.length === 0 ? (
                <div>
                    <p>No ticket Found</p>
                    <button 
                    onClick={()=> navigate('/CreateTicket')}
                    className='px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg'>
                        Create Your First Ticket
                    </button>
                </div>
            ):(
                tickets.map((t)=>(
                    <div
                     key={t.id}
                    onClick={()=> navigate(`/TicketDetail/${t.id}`)}
                    className='flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50'
                    >
                        <div>
                            <p className='text-sm text-slate-400'>{t.id}</p>
                            <p  className='font-medium text-slate-900'>{t.title}</p>
                        </div>
                        <div className='flex gap-3 text-sm text-slate-700'>
                            <span>{t.priority}</span>
                            <span>{t.status}</span>
                        </div>
                    </div>
                ))

            )}
            
        </div>
    </div>
  )
}

export default MyTicket