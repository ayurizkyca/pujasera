import React from 'react'

const CardDashboard = ({ title, value, icon }) => {

    return (
        <div className='border p-5 rounded-md items-center'>
            <div className='flex items-center gap-3'>
                <div>
                    {icon}
                </div>
                <h3 className='text-sm'>{title}</h3>
            </div>
            <h1 className='text-2xl font-bold'>{value}</h1>
        </div>
    )
}
export default CardDashboard