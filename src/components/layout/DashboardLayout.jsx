import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'


const DashboardLayout= ({role})=>{

    return(
        <div className='min-h-screen bg-slate-100 flex'>
            <Sidebar role={role}/>

            <main className='flex-1 p-6'>
                <Outlet/>
            </main>
        </div>
    )

}

export default DashboardLayout;