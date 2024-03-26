import React from 'react';
import { formatRupiah } from '../util/format';
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const ListMenuCart = ({ namaMenu, harga, qty, subTotal, incrementClick, decrementClick, deleteItemClick }) => {
  return (
    <div className='grid grid-cols-2'>
      <h2 className=''>{namaMenu}</h2>
      <div className='grid grid-cols-4 items-center'>
        <h2 className=''>{formatRupiah(harga)}</h2>
        <div className='flex gap-2'>
          <MinusCircleOutlined onClick={decrementClick} />
          <h2>{qty}</h2>
          <PlusCircleOutlined onClick={incrementClick} />
        </div>
        <h2 className='font-semibold'>{formatRupiah(subTotal)}</h2>
        <div className='flex justify-end'>
          <DeleteOutlined onClick={deleteItemClick} />
        </div>
      </div>
    </div>
  )
}

export default ListMenuCart;
