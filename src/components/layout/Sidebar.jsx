import React from 'react'
import {useNavigate, NavLink} from "react-router-dom"
import {  LayoutDashboard, Ticket, PlusCircle, User, LogOut, UserCheck, Inbox, BarChart3} from "lucide-react"

const Sidebar=({role= "customer"})=>{

    const navigate= useNavigate()

    const customerItems = [
        {
            name:"Dashboard",
            path:"/Dashboard",
            icon: LayoutDashboard,
        },{
            name:"Ticket",
            path:"/MyTicket",
            icon:Ticket,

        },{
            name:"CreateTicket",
            path:"/CreateTicket",
            icon:PlusCircle,
        },{
            name:"User",
            path:"/Profile",
            icon:User,
        },
        
    ]
    const agentItems = [
        { 
            name: "Dashboard", 
            path: "/AgentDashboard", 
            icon: LayoutDashboard 
        },
        { name: "All Tickets",
             path: "/AllTickets",
              icon: Ticket 
            },
        { name: "My Tickets",
             path: "/AgentMyTickets",
              icon: UserCheck 
            },
        { name: "Unassigned",
             path: "/Unassigned",
              icon: Inbox
             },
        { name: "Reports",
             path: "/Reports", 
             icon: BarChart3
             },
        { name: "Profile",
             path: "/Profile", 
             icon: User 
            },
    ]
    const navItems= role ==="agent"? agentItems:customerItems



    const handleLogout=()=>{
         localStorage.removeItem("token")
         localStorage.removeItem("user")
        navigate('/Login')
    }


    return(
        <aside className='w-64 min-h-screen bg-slate-900 text-white flex flex-col'>
            <div className='p-6 border-b border-slate-700'>
                <h1 className='text-xl font-bold'>
                    support portal
                </h1>
            </div>
            <nav>
                {navItems.map(
                    (item)=>{
                        const Icon = item.icon;
                        return(
                            <NavLink key={item.path} to={item.path} 
                            className={({isActive})=>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-300 hover:bg-slate-800"
                            }`
                            }
                            >
                                <Icon size={20}/>
                                <span>{item.name}</span>
                            </NavLink>
                            
                        )
                    }
                )}
                
            </nav>
            <div className='p-4 border-t border-slate-700'>
                <button
                onClick={handleLogout}
                className='flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg'>
                  <  LogOut size={20}/> 
                  <span> Logout </span>
                </button>
            </div>

        </aside>
    )
}

export default Sidebar;
