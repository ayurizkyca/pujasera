import React from 'react';
import {
    PlusCircleOutlined,
    MinusCircleOutlined
} from '@ant-design/icons';

const ListMenuCart = ({ namaMenu, harga, qty, subTotal }) => {
    return (
        <div className='grid grid-cols-2'>
            <h2 className=''>{namaMenu}</h2>
            <div className='grid grid-cols-3 items-center'>
                <h2 className=''>Rp. {harga}</h2>
                <div className='flex gap-2 justify-center'>
                    <MinusCircleOutlined />
                    <h2>{qty}</h2>
                    <PlusCircleOutlined />
                </div>
                <h2 className='font-semibold text-primary'>Rp. {subTotal}</h2>
            </div>
        </div>
    )
}

export default ListMenuCart;
