import './index.css'
import {Navigate, Route, Routes }from "react-router-dom"
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Sidebar from './components/layout/Sidebar'
import DashboardLayout from'./components/layout/DashboardLayout'
import Dashboard from './pages/customer/Dashboard'
import CreateTicket from './pages/customer/CreateTicket'
import MyTicket from "./pages/customer/MyTicket"
import TicketDetail from "./pages/customer/TicketDetail"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import AgentDashboard from "./pages/agent/AgentDashboard"
import AgentTicketDetail from "./pages/agent/AgentTicketDetail"
import Reports from "./pages/agent/Reports"
import Profile from "./Profile"


function App() {
  return(
 
<Routes>
  <Route path='/' element={<Navigate to="/Login"/>}/>

  <Route
  path='/Login'
  element={<Login/>}
  />

  <Route
  path='/Register'
  element={<Register/>}
  />


  <Route
  element={<ProtectedRoute role="CUSTOMER" />}
  > <Route element={<DashboardLayout role="customer" />}>
        <Route path='/TicketDetail/:id' element={<TicketDetail/>}/>
        <Route path='/MyTicket' element={<MyTicket/>} />
         <Route path='/CreateTicket' element={<CreateTicket/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
    </Route>
    </Route>



      <Route
  element={<ProtectedRoute role="AGENT" />}
  > <Route element={<DashboardLayout role="agent" />}>
         <Route path="/AgentDashboard" element={<AgentDashboard />} />
    <Route path="/AgentTicketDetail/:id" element={<AgentTicketDetail />} />
    <Route path="/AllTickets" element={<AgentDashboard view="all" />} />
     <Route path="/AgentMyTickets" element={<AgentDashboard view="mine" />} />
     <Route path="/Unassigned" element={<AgentDashboard view="unassigned" />} />
    <Route path="/Reports" element={<Reports />} />
    <Route path="/Profile" element={<Profile />} />
    </Route>
    </Route>
</Routes>
  );

}

export default App
