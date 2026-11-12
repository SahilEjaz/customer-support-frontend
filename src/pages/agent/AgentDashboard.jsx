import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/Api"

function AgentDashboard({ view = "dashboard" }) {
  const navigate = useNavigate()

  const [tickets, setTickets] = useState([])
  const [stats, setStats] = useState(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [sortOrder, setSortOrder] = useState("newest")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setPage(1)
  }, [view])

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      setError("")

      try {
        const params = { page, limit: 5, sort: sortOrder }
        if (search) params.search = search
        if (statusFilter !== "All") params.status = statusFilter
        if (priorityFilter !== "All") params.priority = priorityFilter
        if (categoryFilter !== "All") params.category = categoryFilter
        if (view === "mine") params.assigned = "me"
        if (view === "unassigned") params.assigned = "none"

        const res = await api.get("/tickets", { params })
        setTickets(res.data.tickets)
        setTotalPages(res.data.totalPages || 1)
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load tickets.")
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [view, search, statusFilter, priorityFilter, categoryFilter, sortOrder, page])

  useEffect(() => {
    if (view !== "dashboard") return

    const fetchStats = async () => {
      try {
        const res = await api.get("/tickets/stats")
        setStats(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchStats()
  }, [view])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value)
    setPage(1)
  }

  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value)
    setPage(1)
  }

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value)
    setPage(1)
  }

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value)
  }

  let title = "Support Dashboard"
  if (view === "all") title = "All Tickets"
  if (view === "mine") title = "My Tickets"
  if (view === "unassigned") title = "Unassigned Tickets"

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900'>{title}</h1>
      </div>

      {view === "dashboard" && (
        <div className='grid grid-cols-4 gap-4 mb-8'>
          <div className='bg-white border border-slate-200 rounded-xl p-4'>
            <p className='text-sm text-slate-600'>Open Ticket</p>
            <p className='text-3xl font-bold text-slate-900'>{stats?.open || 0}</p>
          </div>
          <div className='bg-white border border-slate-200 rounded-xl p-4'>
            <p className='text-sm text-slate-600'>In Process</p>
            <p className='text-3xl font-bold text-slate-900'>{stats?.inProgress || 0}</p>
          </div>
          <div className='bg-white border border-slate-200 rounded-xl p-4'>
            <p className='text-sm text-slate-600'>Waiting for Customer</p>
            <p className='text-3xl font-bold text-slate-900'>{stats?.waiting || 0}</p>
          </div>
          <div className='bg-white border border-slate-200 rounded-xl p-4'>
            <p className='text-sm text-slate-600'>Resolved</p>
            <p className='text-3xl font-bold text-slate-900'>{stats?.resolved || 0}</p>
          </div>
        </div>
      )}

      <div className='flex flex-wrap gap-3 mb-6'>
        <input
          type='text'
          value={search}
          onChange={handleSearchChange}
          placeholder='Search Ticket or Customer'
          className='border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
        />

        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className='border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value="All">All Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="WAITING_FOR_CUSTOMER">Waiting for Customer</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={handlePriorityFilterChange}
          className='border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value="All">All Priority</option>
          <option value="URGENT">Urgent</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <select
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
          className='border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value="All">All Category</option>
          <option value="Technical Issue">Technical Issue</option>
          <option value="Billing">Billing</option>
          <option value="Account">Account</option>
          <option value="Feature Request">Feature Request</option>
          <option value="General">General</option>
        </select>

        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className='border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {error && <p className='text-red-600 mb-4'>{error}</p>}

      <div className='bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto'>
        {loading ? (
          <p className='text-center text-slate-600 py-12'>Loading...</p>
        ) : tickets.length === 0 ? (
          <p className='text-center text-slate-600 py-12'>Ticket Not Found</p>
        ) : (
          <table className='w-full text-left text-sm'>
            <thead className='border-b border-slate-200 text-slate-600'>
              <tr>
                <th className='p-4'>ID</th>
                <th className='p-4'>Title</th>
                <th className='p-4'>Customer</th>
                <th className='p-4'>Priority</th>
                <th className='p-4'>Status</th>
                <th className='p-4'>Assigned</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200'>
              {tickets.map((t) => (
                <tr
                  key={t._id}
                  onClick={() => navigate(`/AgentTicketDetail/${t._id}`)}
                  className='cursor-pointer hover:bg-slate-50'
                >
                  <td className='p-4'>#{t._id.slice(-6)}</td>
                  <td className='p-4 font-medium text-slate-900'>{t.title}</td>
                  <td className='p-4'>{t.customer?.name || "-"}</td>
                  <td className='p-4'>{t.priority}</td>
                  <td className='p-4'>{t.status}</td>
                  <td className='p-4'>{t.assignedAgent?.name || "Unassigned"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className='flex items-center justify-between mt-4'>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className='px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50'
        >
          Previous
        </button>

        <p className='text-sm text-slate-600'>
          Page {page} of {totalPages}
        </p>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className='px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AgentDashboard