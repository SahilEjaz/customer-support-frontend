import React, { useState, useEffect } from 'react'
import { CheckCircle, Clock, Loader, Ticket } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import api from "../../api/Api"


function Dashboard() {
    const navigate = useNavigate()

  
   let user = null;
try {
  user = JSON.parse(localStorage.getItem("user"));
} catch {
  user = null;
}

    const [data, setData] = useState(null)
    const [recentTicket, setRecentTicket] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [reload, setReload] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError("")

            try {
                const statsRes = await api.get("/tickets/stats")
                const ticketRes = await api.get("/tickets", { params: { limit: 3 } })

                setData(statsRes.data)
                setRecentTicket(ticketRes.data.tickets)
            } catch (err) {
                setError(err.response?.data?.message || "Unable to load dashboard.")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [reload])


    const stats = [
        {
            title: "Total Ticket",
            value: data ? data.total : "-",
            icon: Ticket,
        }, {
            title: "Open",
            value: data ? data.byStatus.OPEN : "-",
            icon: Clock,
        }, {
            title: "In process",
            value: data ? data.byStatus.IN_PROGRESS : "-",
            icon: Loader,
        }, {
            title: "Resolved",
            value: data ? data.byStatus.RESOLVED : "-",
            icon: CheckCircle,
        }
    ];


    return (
        <div>

            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-slate-900'>Welcome, {user ? user.name : "customer"}</h1>

                <p className="text-slate-500 mt-1">
                    Here's what's happening with your support tickets.
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'>
                {stats.map((stat) => {
                    const Icon = stat.icon

                    return (
                        <div key={stat.title} className='bg-white rounded-xl p-5 shadow-sm border border-slate-200'>

                            <div className='flex items-center justify-between'>

                                <div>
                                    <p className='text-sm text-slate-500'>
                                        {stat.title}
                                    </p>
                                    <h2 className='text-3xl font-bold text-slate-900 mt-2'>
                                        {stat.value}
                                    </h2>
                                </div>

                                <div className='bg-blue-100 text-blue-600 p-3 rounded-lg'>
                                    <Icon size={24} />
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
            <div className='bg-white rounded-xl border border-slate-200 shadow-sm'>
                <div className='p-6 border-b border-slate-200 flex items-center justify-between'>
                    <div>
                        <h2 className='text-xl font-semibold text-slate-900'>
                            My Recent ticket
                        </h2>

                        <p className='text-sm text-slate-500 mt-1'>
                            Your latest support requests
                        </p>
                    </div>
                    <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg' onClick={() => navigate('/CreateTicket')} >
                        Create Ticket
                    </button>
                </div>

                <div className='divide-y divide-slate-200'>
                    {loading ? (
                        <p className='text-center text-slate-500 py-12'>Loading tickets...</p>
                    ) : error ? (
                        <div className='text-center py-12'>
                            <p className='text-slate-500 mb-4'>{error}</p>
                            <button
                                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'
                                onClick={() => setReload(reload + 1)}
                            >
                                Try Again
                            </button>
                        </div>
                    ) : recentTicket.length === 0 ? (
                        <div className='text-center py-12'>
                            <p className='text-slate-500 mb-4'>You don't have any tickets yet.</p>
                            <button
                                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'
                                onClick={() => navigate('/CreateTicket')}
                            >
                                Create Your First Ticket
                            </button>
                        </div>
                    ) : (
                        recentTicket.map((ticket) => (
                            <div
                                className='p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-slate-50 cursor-pointer'
                                key={ticket._id}
                                onClick={() => navigate(`/TicketDetail/${ticket._id}`)}
                            >
                                <div>
                                    <p className='text-sm text-slate-500'>
                                        #{ticket._id.slice(-6)}
                                    </p>
                                    <h3 className='font-semibold text-slate-900 mt-1'>
                                        {ticket.title}
                                    </h3>
                                </div>

                                <div className='flex items-center gap-3'>
                                    <span className='px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700'>
                                        {ticket.priority}
                                    </span>

                                    <span className='px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700'>
                                        {ticket.status}
                                    </span>

                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
