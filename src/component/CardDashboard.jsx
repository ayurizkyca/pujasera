import React from 'react'
import {
    ShoppingOutlined,
} from '@ant-design/icons';

const CardDashboard = ({ title, value, icon }) => {

    return (
        <div className='border p-5 rounded-md'>
            <div className='flex items-center gap-3'>
                <div>
                    {icon}
                </div>
                <h3 className='text-xl'>{title}</h3>
            </div>
            <h1 className='text-4xl font-bold'>{value}</h1>
        </div>
    )
}
export default CardDashboard