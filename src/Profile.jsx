import React from 'react'


function Profile() {

   
    const user = JSON.parse(localStorage.getItem("user") || "null")

    if (!user) {
        return <p className='text-center text-slate-600 py-12'>No user found. Please log in again.</p>
    }

    return (
        <div className='max-w-4xl mx-auto'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-slate-900'>Profile</h1>
            </div>

            <div className='bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4'>
                <div>
                    <p className='text-sm text-slate-600'>Name</p>
                    <p className='font-medium text-slate-900'>{user.name}</p>
                </div>
                <div>
                    <p className='text-sm text-slate-600'>Email</p>
                    <p className='font-medium text-slate-900'>{user.email}</p>
                </div>
                <div>
                    <p className='text-sm text-slate-600'>Role</p>
                    <p className='font-medium text-slate-900'>{user.role === "AGENT" ? "Support Agent" : "Customer"}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
