import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'



const ProtectedRoute = ({ role }) => {

    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user") || "null")

    
    if (!token || !user) {
        return <Navigate to="/" replace />
    }

    
    if (role && user.role !== role) {
        return <Navigate to={user.role === "AGENT" ? "/AgentDashboard" : "/Dashboard"} replace />
    }

    return <Outlet />
}

export default ProtectedRoute
