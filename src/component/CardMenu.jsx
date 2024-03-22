import React, { useState } from 'react';
import { Card, Typography, Tooltip, Button, Modal } from 'antd';
const { Meta } = Card;
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import ButtonBasic from './ButtonBasic';
import { formatRupiah } from '../util/format';
import { useDispatch, useSelector } from 'react-redux';
import { menuActions } from '../redux/menu';

const CardMenu = ({ id, idResto, name, description, imageUrl, price, stock, addCart, deleteMenu, editMenu }) => {

  return (
    <div className=''>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={
          <img className='h-[200px] object-cover'
            alt={name}
            src={imageUrl}
            onError={(e) => {
              e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemdrplmJ3RHsLCcP-3Wwgxs34KcEPIQR5h8T0l65ZXw&s';
            }}
          />
        }
      >
        <div className='flex flex-col justify-between h-full'>
          <div className='space-y-[2vh]'>
            <Meta
              title={
                <div className='flex justify-between'>
                  <Tooltip title={name}>
                    <h1 className='truncate'>{name}</h1>
                  </Tooltip>
                  <div>
                    <EditOutlined className=' text-black hover:text-red-700 bg-white p-1 hover:bg-secondary' onClick={() => editMenu({ id, idResto, name, description, imageUrl, price, stock })} />
                    <DeleteOutlined className='text-black hover:text-red-700 bg-white p-1 hover:bg-secondary' onClick={() => deleteMenu({ id, idResto })} />
                  </div>
                </div>
              }
              description={
                <Tooltip title={description}>
                  <div className="line-clamp-2">{description}</div>
                </Tooltip>
              }
            />
            <div className='flex justify-between items-end'>
              <h1 className='font-bold'>Stok : {stock}</h1>
              <h1 className='font-bold text-sm text-primary'>{formatRupiah(price)}</h1>
            </div>
            <ButtonBasic title={"add to cart"} onClick={addCart} textColor={'primary'} color={'secondary'} />
            {/* <Button className="bg-secondary text-primary w-full font-bold border-none hover:bg-primary">add to chart</Button> */}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CardMenu;
