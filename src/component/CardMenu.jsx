import React from 'react';
import { Card, Typography } from 'antd';
const { Meta } = Card;
import ButtonBasic from './ButtonBasic';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/cart';
import { restoData } from '../../public/data/restoData';

const CardMenu = ({ id, name, description, imageUrl, price, idResto, namaResto }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addMenuItem({ idResto, namaResto, idMenu: id, namaMenu: name, harga: price, qty: 1 }));
  };

  const resto = restoData.find(r => r.menus.find(m => m.id === id));
  idResto = resto.id;
  namaResto = resto.title;

  return (
    <div className=''>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img className='h-[200px] object-cover' alt="card-image" src={imageUrl} />}
      >
        <div className='flex flex-col justify-between h-full'>
          <div>
            <Meta title={name} description={<div className="line-clamp-2">{description}</div>}  />
            <Typography.Title level={4} className='mt-5 font-bold text-end '>Rp. {price}</Typography.Title>
          </div>
          <ButtonBasic title={"add to cart"} onClick={addToCartHandler} />
        </div>
      </Card>
    </div>
  )
}

export default CardMenu;
