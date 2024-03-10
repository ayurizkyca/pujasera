import React from 'react';
import {
    ShoppingOutlined,
} from '@ant-design/icons';

const CardCart = ({ namaResto, children }) => {
    return (
        <div>
            <div className='border rounded-md px-5 py-2 m-5 space-y-3'>
                <div className='flex gap-2'>
                    <ShoppingOutlined />
                    <h1 className='font-medium'>{namaResto}</h1>
                </div>
                <div className='flex flex-col'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CardCart;
