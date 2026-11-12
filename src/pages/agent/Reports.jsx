import React, { useState, useEffect } from 'react'
import api from "../../api/api"


function Reports() {

    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [reload, setReload] = useState(0)

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true)
            setError("")

            try {
                const res = await api.get("/tickets/stats")
                setStats(res.data)
            } catch (err) {
                setError(err.response?.data?.message || "Unable to load reports.")
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [reload])

    if (loading) {
        return <p className='text-center text-slate-600 py-12'>Loading reports...</p>
    }

    if (error) {
        return (
            <div className='text-center py-12'>
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

    return (
        <div className='max-w-6xl mx-auto'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-slate-900'>Reports</h1>
                <p className='text-slate-600 mt-1'>Total tickets: {stats.total}</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

                <div className='bg-white border border-slate-200 rounded-xl shadow-sm p-6'>
                    <h2 className='text-lg font-semibold text-slate-900 mb-4'>Tickets by Status</h2>
                    <div className='space-y-3'>
                        {Object.entries(stats.byStatus).map(([name, count]) => (
                            <div key={name} className='flex justify-between text-sm text-slate-700'>
                                <span>{name}</span>
                                <span className='font-semibold'>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='bg-white border border-slate-200 rounded-xl shadow-sm p-6'>
                    <h2 className='text-lg font-semibold text-slate-900 mb-4'>Tickets by Priority</h2>
                    <div className='space-y-3'>
                        {Object.entries(stats.byPriority).map(([name, count]) => (
                            <div key={name} className='flex justify-between text-sm text-slate-700'>
                                <span>{name}</span>
                                <span className='font-semibold'>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='bg-white border border-slate-200 rounded-xl shadow-sm p-6'>
                    <h2 className='text-lg font-semibold text-slate-900 mb-4'>Tickets by Category</h2>
                    <div className='space-y-3'>
                        {Object.entries(stats.byCategory).map(([name, count]) => (
                            <div key={name} className='flex justify-between text-sm text-slate-700'>
                                <span>{name}</span>
                                <span className='font-semibold'>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Reports
