import React from 'react';
import { formatRupiah } from '../util/format';
import {
    PlusCircleOutlined,
    MinusCircleOutlined
} from '@ant-design/icons';

const ListMenuCart = ({ namaMenu, harga, qty, subTotal, incrementClick, decrementClick }) => {
   
    return (
        <div className='grid grid-cols-2'>
            <h2 className=''>{namaMenu}</h2>
            <div className='grid grid-cols-3 items-center'>
                <h2 className=''>{formatRupiah(harga)}</h2>
                <div className='flex gap-2 justify-center'>
                    {/* <MinusCircleOutlined onClick={decrementClick} /> */}
                    <h2>{qty}</h2>
                    {/* <PlusCircleOutlined onClick={incrementClick} /> */}
                </div>
                <h2 className='font-semibold text-primary'>{formatRupiah(subTotal)}</h2>
            </div>
        </div>
    )
}

export default ListMenuCart;
